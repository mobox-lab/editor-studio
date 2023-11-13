import BadgeBackground from '@/components/ui/animation/BadgeBackground';

export default function DeveloperLevel() {
  return (
    <div>
      <h3 className="text-base font-medium">Developer Level</h3>
      <div className="h-93 w-100 relative mt-3 border border-gray-400">
        <BadgeBackground />
      </div>
    </div>
  );
}
