import { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext({
  connectWallet: () => {},
  currentAccount: '',
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

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) {
        return alert('please install metamask!');
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
        return alert('please install metamask!');
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log('error: ', e);
      throw new Error('No eth object!');
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
      {children}
    </TransactionContext.Provider>
  );
};
