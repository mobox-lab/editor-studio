import RecommendItem from '@/app/arcade/_components/RecommendItem';

export default function Recommended() {
  return (
    <div className="border border-gray-400 px-4 pb-4 pt-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">Recommend</h3>
        <div>refresh</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-4">
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
        <RecommendItem />
      </div>
    </div>
  );
}
