'use client';
import { useEffect } from 'react';

export default function CategoryArcana(props: any) {
  useEffect(() => {
    console.log('props: ', props);
  }, [props]);
  return <div>CategoryArcana</div>;
}
