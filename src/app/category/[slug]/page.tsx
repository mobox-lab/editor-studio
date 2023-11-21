'use client';
import { useSearchParams } from 'next/navigation';
import GparkGame from '@/components/ui/card/GparkGame';

export default function CategorySlug() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  console.log('categoryId: ', categoryId);

  return (
    <div className="grid grid-cols-4 gap-4">
      <GparkGame />
      <GparkGame />
      <GparkGame />
      <GparkGame />
      <GparkGame />
      <GparkGame />
      <GparkGame />
      <GparkGame />
    </div>
  );
}
