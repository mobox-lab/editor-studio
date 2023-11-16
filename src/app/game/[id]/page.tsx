import GamePanel from '@/app/game/[id]/_components/GamePanel';
import Rooms from '@/app/game/[id]/_components/Rooms';
import ReleaseNote from '@/app/game/[id]/_components/ReleaseNote';

export default function ArcadeGame({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="text-base font-medium">
        <span className="text-gray-300">Arcade /</span> Borderland
      </div>
      <div className="mt-3">
        <GamePanel />
      </div>
      <div className="mt-7.5">
        <h3 className="text-base font-medium">Rooms</h3>
        <div className="mt-3">
          <Rooms />
        </div>
      </div>
      <div className="mt-7.5">
        <h3 className="text-base font-medium">Release Note</h3>
        <div className="mt-3">
          <ReleaseNote />
        </div>
      </div>
    </div>
  );
}
