import React, { useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import useFetch from '../../hooks/useFetch';
import dummyData from '../../utils/dummyData';
import { shortenAddress } from '../../utils/shortenAddress';

interface TransactionCardProps {
  addressTo: string;
  addressFrom: string;
  amount: string;
  message: string;
  url: React.ImgHTMLAttributes<HTMLImageElement>['src'];
  timestamp: string;
  keyword?: string;
}

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
  url,
  keyword,
}: TransactionCardProps) => {
  const gifUrl = useFetch({ keyword } as any);
  console.log('keyword: ', keyword);
  return (
    <div
      className='bg-[#181918] m-4 flex flex-1 
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270]
    sm:max-w-[300px]
    flex-col p-3 rounded-md hover:shadow-xl
    '>
      <div className='flex flex-col items-center w-full mt-3'>
        <div className='w-full p-2 mb-6 '>
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target='_blank'
            rel='noopener noreferer'>
            <p className='text-base text-white '> From: {shortenAddress(addressFrom)}</p>
          </a>

          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target='_blank'
            rel='noopener noreferer'>
            <p className='text-base text-white '> To: {shortenAddress(addressTo)}</p>
          </a>

          <p className='text-base text-white '> Amount: {amount} ETH</p>

          {message && (
            <>
              <br />
              <p className='text-base text-white'>Message: {message}</p>
            </>
          )}
        </div>
        {gifUrl ||
          (url && (
            <img
              src={gifUrl || url}
              alt=''
              className='object-cover w-full h-64 rounded-md shadow-lg 3x:h-96'
            />
          ))}

        <div className='p-3 px-5 bg-black shadow-2xl w-max rounded-3xl'>
          <p className='text-[#37c7da] font-bold'>{timestamp} </p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { formData, currentAccount } = useContext(TransactionContext);
  return (
    <div className='flex items-center justify-center w-full 2xl:px-20 gradient-bg-transactions'>
      <div className='flex flex-col px-4 py-12 md:p-12'>
        {currentAccount ? (
          <h3 className='my-2 text-3xl text-center text-white'>Latest Transactions</h3>
        ) : (
          <h3 className='my-2 text-3xl text-center text-white'>
            Connect your account to see the last changes
          </h3>
        )}

        {/* Connect your account to see last transactions */}
        <div className='flex flex-wrap items-center justify-center mt-10'>
          {dummyData.reverse().map((transaction, index) => {
            return <TransactionCard key={index} {...transaction} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
