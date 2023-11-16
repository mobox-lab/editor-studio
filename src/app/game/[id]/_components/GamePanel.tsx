'use client';
import Image from 'next/image';
import { clsx } from 'clsx';
import Tag from '@/components/ui/tag';
import { useMemo, useState } from 'react';
import Like from '@/../public/svg/like.svg?component';
import StyledButton from '@/components/ui/button/StyledButton';

export default function GamePanel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const imageList = useMemo(
    () => [
      'https://qn-mw-game.gpark.io/GameRelease/P_d8af1de90e6e0e4349f08afbf92c4e3dff909d56/1.0.0/78696/0cbba4f805d2e86b333fb1fc2535da0e1c1d7644',
      'https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9',
      'https://qn-mw-game.gpark.io/GameRelease/P_fdd24ea16c85354b088aa6ee92271bb8b6dc69e4/1.0.0/69802/9f87fb051a12d5711bbd56428183f2ad8a1dfabb',
      'https://qn-mw-game.gpark.io/GameRelease/P_d8af1de90e6e0e4349f08afbf92c4e3dff909d56/1.0.0/78696/0cbba4f805d2e86b333fb1fc2535da0e1c1d7644',
      'https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9',
    ],
    [],
  );
  return (
    <div className="bg-gray-550/10 grid grid-cols-2 border border-gray-500">
      <div>
        <div className="relative h-[338px]">
          <Image src={imageList[selectedIndex]} style={{ objectFit: 'cover' }} alt="game-image" fill />
        </div>
        <div className="flex gap-2 p-2">
          {imageList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={clsx('w-27.5 relative h-16 cursor-pointer', { 'boeder-white border': selectedIndex === index })}
            >
              <Image src={item} style={{ objectFit: 'cover' }} alt="game-image" fill />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="relative h-[338px] px-6 pt-6">
          <h1 className="text-3xl font-semibold">DEATH STRANDING</h1>
          <div className="mt-3 flex gap-1.5">
            <Tag>Mobox</Tag>
            <Tag>Vista</Tag>
          </div>
          <div className="mt-6 line-clamp-[8] text-xs/5">
            It is a video game developed by Kojima Productions and directed by Hideo Kojima, who is well-known in the gaming
            industry for his work on the Metal Gear series. Death Stranding was released in 2019 for the PlayStation 4 and later
            for Microsoft Windows in 2020. It is a video game developed by Kojima Productions and directed by Hideo Kojima, who
            is well-known in the gaming industry for his work on the Metal Gear series. Death Stranding was released in 2019 for
            the PlayStation 4 and later for Microsoft Windows in 2020.
          </div>
          <div className="absolute bottom-0 flex h-11 items-center gap-2">
            <div className="w-10.5 h-10.5 relative overflow-hidden rounded-full">
              <Image
                fill
                style={{ objectFit: 'cover' }}
                src="https://qn-mw-game.gpark.io/GameRelease/P_d8af1de90e6e0e4349f08afbf92c4e3dff909d56/1.0.0/78696/0cbba4f805d2e86b333fb1fc2535da0e1c1d7644"
                alt="avatar"
              />
            </div>
            <div className="">
              <div className="text-base/5">
                <span className="font-medium">0x28...F53f</span>&nbsp;
                <span className="text-link">@tomori</span>
              </div>
              <div className="mt-0.5 text-xs/5">“Folding was never an option. - Cayde-6”</div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex gap-3 px-6 py-2">
          <StyledButton variant="gradient-play" className="flex-1 text-base/5 font-bold text-black">
            Play Now
          </StyledButton>
          <StyledButton variant="gradient" className="flex w-36 gap-1.5 font-bold">
            <Like />
            302
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
