import React, { useContext } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { Loader } from '..';
import { TransactionContext } from '../../context/TransactionContext';

const commonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

interface InputProps {
  placeholder: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  value?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, name, type, handleChange, value }) => (
  <input
    placeholder={placeholder}
    name={name}
    type={type}
    onChange={(e) => handleChange(e, name)}
    step='0.0001'
    value={value}
    className='w-full p-2 my-2 text-sm text-white bg-transparent border-none rounded-sm outline-none white-glassmorphism'
  />
);

const Welcome = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  const handleSubmit = () => {};

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='flex flex-col items-start justify-between px-4 py-12 mf:flex-row md:p-20'>
        <div className='flex flex-col justify-start flex-1 mf:mr-10 '>
          <h1 className='text-3xl text-white sm:text-5xl text-gradient'>
            Send Crypto <br /> across world
          </h1>
          <p className='w-11/12 mt-5 text-base font-light text-left text-white md:w-9/12 '>
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
          </p>
          {!currentAccount && (
            <button
              type='button'
              onClick={connectWallet}
              className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'>
              <p className='text-base font-semibold text-white'>Connect Wallet</p>
            </button>
          )}

          <div className='grid w-full grid-cols-2 mt-10 sm:grid-cols-3'>
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={commonStyles}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-start flex-1 w-full mt-10 mf:mt-0'>
          <div className='flex-col items-start justify-end w-full h-40 p-3 my-5 rounded-xl sm:w-72 eth-card white-glassmorphism'>
            <div className='flex flex-col justify-between w-full h-full'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center justify-center w-10 h-10 border-2 border-white rounded-full'>
                  <SiEthereum fontSize={21} color='#fff' />
                </div>
                <BsInfoCircle fontSize={17} color='#fff' />
              </div>
              <div>
                <p className='text-sm font-light text-white'>Address</p>
                <p className='mt-1 text-lg font-semibold text-white'>Ethereum</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-start w-full p-5 sm:w-96 blue-glassmorphism'>
            <Input placeholder='Address To' name='addressTo' type='text' handleChange={() => {}} />
            <Input placeholder='Amount (ETH)' name='amount' type='number' handleChange={() => {}} />
            <Input placeholder='Keyword (GIF)' name='keyword' type='text' handleChange={() => {}} />
            <Input placeholder='Enter message' name='message' type='text' handleChange={() => {}} />
            <div className='h-[1px] w-full bg-gray-400 my-2' />
            {false ? (
              <Loader />
            ) : (
              <button
                type='button'
                onClick={handleSubmit}
                className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'>
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
