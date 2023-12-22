import { tv } from 'tailwind-variants';

type BadgeBackgroundProps = {
  level?: string;
};

const background = tv({
  base: 'absolute -left-[85%] -top-[55%] -z-10 h-[958px] w-[958px] animate-breathing rounded-full blur-[200px]',
  variants: {
    bg: {
      Legendary: 'bg-legendary',
      Epic: 'bg-epic',
      Rare: 'bg-rare',
      Uncommon: 'bg-uncommon',
      Common: 'bg-common',
    },
  },
});

export default function BadgeBackground({ level }: BadgeBackgroundProps = { level: 'Common' }) {
  return <div className={background({ bg: level as any })} />;
}
