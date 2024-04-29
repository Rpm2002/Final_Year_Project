import React from 'react';

function ExpertCard({ firstName, lastName, profession, imgUrl }) {
  return (
    <>
      <div className='m-3 flex flex-col flex-wrap cursor-pointer hover:scale-95 transition-all duration-150 ease-in-out'>
        <div>
          <img src={imgUrl} className='w-56 h-64' alt={name} />
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
