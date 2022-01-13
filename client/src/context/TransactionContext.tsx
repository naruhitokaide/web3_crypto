import { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext({
  connectWallet: () => {},
  currentAccount: '',
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => {},
});

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
};

interface TransactionContextProps {
  children: React.ReactNode;
}

export const TransactionsProvider = ({ children }: TransactionContextProps) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
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

  const sendTransactions = async (amount: number, to: string) => {
    try {
      if (!ethereum) {
        return alert('Please install metamask!');
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, handleChange }}>
      {children}
    </TransactionContext.Provider>
  );
};
