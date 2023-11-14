'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useInterval } from 'react-use';

export default function Selection() {
  const [lists, setLists] = useState([
    {
      icon: 'https://qn-mw-game.gpark.io/GameRelease/P_d8af1de90e6e0e4349f08afbf92c4e3dff909d56/1.0.0/78696/0cbba4f805d2e86b333fb1fc2535da0e1c1d7644',
      image:
        'https://qn-mw-game.gpark.io/GameRelease/P_d8af1de90e6e0e4349f08afbf92c4e3dff909d56/1.0.0/78696/0cbba4f805d2e86b333fb1fc2535da0e1c1d7644',
      name: 'Cyber FNAF',
      desc: "In collaboration, Five Nights at Freddy's and MOBOX have joined forces to create a captivating gaming experience. Beware of formidable adversaries, safeguard your digital assets, and strive to survive in this exciting hybrid gaming universe!",
      user: 'cryptoff.cyber',
    },
    {
      icon: 'https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9',
      image:
        'https://qn-mw-game.gpark.io/GameRelease/P_6f38f7b5a0bf56f3ecc21232ee73a1c512f8a09f/1.0.0/87945/661dd5ff2d33714897122be1522cb6870e22d2e9',
      name: 'BarbieLand',
      desc: 'We hope you enjoy the BarbieLand location! Our profile: http://link3.to/procent_crypto',
      user: 'PROCENT',
    },
    {
      icon: 'https://qn-mw-game.gpark.io/GameRelease/P_fdd24ea16c85354b088aa6ee92271bb8b6dc69e4/1.0.0/69802/9f87fb051a12d5711bbd56428183f2ad8a1dfabb',
      image:
        'https://qn-mw-game.gpark.io/GameRelease/P_fdd24ea16c85354b088aa6ee92271bb8b6dc69e4/1.0.0/69802/9f87fb051a12d5711bbd56428183f2ad8a1dfabb',
      name: 'MOMO TOM',
      desc: 'Is Tom like this?',
      user: 'Bangseo',
    },
    {
      icon: 'https://qn-mw-game.gpark.io/GameRelease/P_b80b0b6477040314bc0ab9f8194439acfedab890/1.0.0/64848/2fe7a55c4d992e28b34bb9fa12fe1d0026d6b0fe',
      image:
        'https://qn-mw-game.gpark.io/GameRelease/P_b80b0b6477040314bc0ab9f8194439acfedab890/1.0.0/64848/2fe7a55c4d992e28b34bb9fa12fe1d0026d6b0fe',
      name: 'UAmomo',
      desc: 'support UA',
      user: '0x2d23...E0c8',
    },
  ]);
  const selectedGame = useMemo(() => lists[0], [lists]);
  const unSelectedGames = useMemo(() => lists.slice(1), [lists]);

  useInterval(() => {
    setLists([lists[1], lists[2], lists[3], lists[0]]);
  }, 4000);

  return (
    <div className="w-full">
      <h3 className="text-base font-medium">Selection</h3>
      <div className="mt-3 flex gap-3">
        <div className="h-93 w-[35.625rem] flex-none border border-gray-500">
          <div className="relative h-[298px] w-full">
            <Image src={selectedGame.image} style={{ objectFit: 'cover' }} alt="game-image" fill />
          </div>
          <div className="relative">
            <div className="absolute -top-6 left-4 h-20 w-20 overflow-hidden rounded-lg border-2 border-gray-700">
              <Image src={selectedGame.icon} style={{ objectFit: 'cover' }} alt="game-image" fill />
            </div>
            <div className="ml-28 pr-4 pt-3">
              <div className="flex items-center gap-3">
                <p className="text-base font-semibold">{selectedGame.name}</p>
                <p className="text-xs text-gray-300">By {selectedGame.user}</p>
              </div>
              <p className="mt-1 truncate text-xs">{selectedGame.desc}</p>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-3">
          {unSelectedGames.map((item) => (
            <div key={item.name} className="relative border border-gray-500">
              <Image src={item.image} style={{ objectFit: 'cover' }} alt="game-image" fill />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
