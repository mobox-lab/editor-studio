import { clsx } from 'clsx';
import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { GparkCardItem } from '@/api';
import { categoriesCardAtom } from '@/atoms/arcade/category';
import CategoryItem from '@/app/arcade/_components/CategoryItem';

type CategoryProps = {
  isLoading?: boolean;
};

export default function Category({ isLoading }: CategoryProps) {
  const data = useAtomValue(categoriesCardAtom);
  const defaultList = useMemo<GparkCardItem[]>(() => Array.from({ length: 6 }), []);

  return (
    <div className={clsx('grid grid-cols-2 gap-x-5 gap-y-7.5', { 'animate-pulse': isLoading })}>
      {isLoading
        ? defaultList.map((item, index) => <CategoryItem data={item} category="--" key={index} />)
        : data.map((category) => <CategoryItem data={category} key={category.cardId} category={category.cardName} />)}
    </div>
  );
}
