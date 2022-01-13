import React from 'react';
import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

interface ServiceCardProps {
  color: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const ServiceCard = ({ color, title, icon, subtitle }: ServiceCardProps) => {
  return (
    <div className='flex flex-row items-center justify-start p-3 m-2 cursor-pointer white-glassmorphism hover:shadow-xl'>
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
        {icon}
      </div>
      <div className='flex flex-col flex-1 ml-5'>
        <h3 className='mt-2 text-lg text-white'>{title}</h3>
        <p className='mt-2 text-sm text-white md:w-9/12'>{subtitle}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:flex-row gradient-bg-services'>
      <div className='flex flex-col items-center justify-between px-4 py-12 mf:flex-row md:p-20'>
        <div className='flex flex-col items-start justify-start flex-1'>
          <h1 className='py-2 text-3xl text-white sm:text-5xl text-gradient'>
            Services that we
            <br /> continue to improve
          </h1>
        </div>
      </div>

      <div className='flex flex-col items-center justify-start flex-1'>
        <ServiceCard
          color='bg-[#2952E3]'
          title='Security gurantee'
          icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
          subtitle='Security is guranteed. We always maintain privacy and maintain the quality of our products'
        />
        <ServiceCard
          color='bg-[#8945F8]'
          title='Best exchange rates'
          icon={<BiSearchAlt fontSize={21} className='text-white' />}
          subtitle='Security is guranteed. We always maintain privacy and maintain the quality of our products'
        />
        <ServiceCard
          color='bg-[#F84550]'
          title='Fastest transactions'
          icon={<RiHeart2Fill fontSize={21} className='text-white' />}
          subtitle='Security is guranteed. We always maintain privacy and maintain the quality of our products'
        />
      </div>
    </div>
  );
};

export default Services;
