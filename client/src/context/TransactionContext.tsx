import { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

interface TransactionContextProps {
  children: React.ReactNode;
}

type AppContextState = { addressTo: string; amount: string; keyword: string; message: string };

const initialState = {
  connectWallet: () => {},
  currentAccount: '',
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => {},
  formData: { addressTo: '', amount: '', keyword: '', message: '' },
  setFormData: (state: AppContextState) => {},
  sendTransactions: () => {},
  transactions: [],
  isLoading: false,
  transactionCount: 0,
};

export const TransactionContext = createContext(initialState);

const { ethereum }: any = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log('web3 ', {
    provider,
    signer,
    transactionsContract,
  });

  return transactionsContract;
};

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }: TransactionContextProps) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState<number>(
    Number(localStorage.getItem('transactionCount')) || 0
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.from,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

        console.log('structuredTransactions: ', structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log('Ethereum is not present');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem('transactionCount', transactionCount);
    } catch (error) {
      console.log(error);
      throw new Error('No eth object!');
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) {
        return alert('Please install metamask!');
      }

      const accounts: any[] = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // get all transactions
        getAllTransactions();
      } else {
        console.log('No accounts found!');
      }
    } catch (error) {
      console.log('error ', error);
    }
  };

  const connectWallet = async () => {
    console.log('click');
    try {
      if (!ethereum) {
        return alert('Please install metamask!');
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log('error: ', e);
      throw new Error('No eth object!');
    }
  };

  const sendTransactions = async () => {
    try {
      if (!ethereum) {
        return alert('Please install metamask!');
      }
      const { addressTo, amount, message, keyword } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', // 21000
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);

      console.log(`Loading - ${transactionHash.hash}`);

      await transactionHash.wait();

      setIsLoading(false);

      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    checkIfTransactionExist();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransactions,
        transactions,
        isLoading,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
