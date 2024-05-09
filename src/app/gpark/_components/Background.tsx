'use client';
import { DRAGON_CDN_URL } from '@/constants';
import React from 'react';

const Background = () => {
  return (
    <div>
      <video autoPlay playsInline loop muted className={'absolute -top-[18vw] left-0 -z-10 w-full'}>
        <source src={`${DRAGON_CDN_URL}/bg.webm`} type="video/webm" />;
        <source src={`${DRAGON_CDN_URL}/bg.mp4`} type="video/mp4" />
      </video>
      <img
        src="/img/gpark/dragonverse.png"
        alt="dragonverse"
        className="absolute left-1/2 top-5 w-[386px] -translate-x-1/2 transform"
      />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-black/0 to-black/60"></div>
    </div>
  );
};

export default Background;
