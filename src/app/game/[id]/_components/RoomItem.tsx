import Image from 'next/image';

export default function RoomItem() {
  return (
    <div className="border border-gray-400 p-2 bg-gray-550/10">
      <div className="flex items-center gap-0.5">
        <Image src="/svg/portrait.svg" width={12} height={12} alt="portrait" />
        <p className="text-xs font-medium">13/20</p>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <div className="relative h-7 w-7 overflow-hidden rounded-full">
          <Image
            fill
            style={{ objectFit: 'cover' }}
            src="https://qn-mw-game.gpark.io/GameRelease/P_d8af1de90e6e0e4349f08afbf92c4e3dff909d56/1.0.0/78696/0cbba4f805d2e86b333fb1fc2535da0e1c1d7644"
            alt="avatar"
          />
        </div>
        <p className="text-sm font-semibold">Dodovo‘s Room</p>
      </div>
      <div className="mt-2 cursor-pointer rounded-sm bg-blue/20 py-2.5 text-center text-base/5 font-semibold text-blue hover:bg-blue/30">
        JOIN
      </div>
    </div>
  );
}
