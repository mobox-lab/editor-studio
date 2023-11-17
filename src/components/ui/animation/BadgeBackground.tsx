import { tv } from 'tailwind-variants';

type BadgeBackgroundProps = {
  level?: 'legendary' | 'epic' | 'rare' | 'uncommon' | 'common';
};

const background = tv({
  base: 'absolute -left-1/2 -top-1/2 -z-10 h-[958px] w-[958px] animate-breathing rounded-full blur-[200px]',
  variants: {
    bg: {
      legendary: 'bg-legendary',
      epic: 'bg-epic',
      rare: 'bg-rare',
      uncommon: 'bg-uncommon',
      common: 'bg-common',
    },
  },
});

export default function BadgeBackground({ level }: BadgeBackgroundProps = { level: 'common' }) {
  return <div className={background({ bg: level })} />;
}
