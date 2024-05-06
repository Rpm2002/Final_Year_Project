import React from 'react';

function ExpertCard({ firstName, lastName, profession, imgUrl }) {
  return (
    <>
      <div className='ml-2 mb-2 mr-2 w-[410px] h-[329px] flex flex-col flex-wrap cursor-pointer hover:scale-95 transition-all duration-150 ease-in-out'>
        <div>
          <img src={imgUrl} className='w-[410px] h-[266px]' alt={name} />
        </div>
        <div className='mt-2'>
          <p className='font-bold'>{firstName} {lastName}</p>
          <p className='leading-tight text-sm text-[#6D6D6D]'>{profession}</p>
        </div>
      </div>
    </>
  );
}

export default ExpertCard;
