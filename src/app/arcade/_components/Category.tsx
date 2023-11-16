import CategoryItem from '@/app/arcade/_components/CategoryItem';

export default function Category() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-7.5">
      <CategoryItem category="Simulation" />
      <CategoryItem category="Action" />
      <CategoryItem category="Casual" />
      <CategoryItem category="Role-playing" />
    </div>
  );
}
