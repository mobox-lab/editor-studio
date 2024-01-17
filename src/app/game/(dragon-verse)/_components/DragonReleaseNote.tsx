import { clsxm } from '@/utils';
import DragonBorder from './DragonBorder';

export default function DragonReleaseNote({ className }: { className?: string }) {
  return (
    <div className={clsxm('relative border border-gray-400 bg-gray-550/10 p-6 px-7.5 py-11', className)}>
      <DragonBorder className="inset-2 -z-10" />
      <div className="flex items-center justify-between border-b border-gray-400 pb-3">
        <h4 className="text-sm">version 0.26.0.5</h4>
        <p className="text-xs text-gray-300">2023-06-15</p>
      </div>
      <div className="py-3 pr-40 text-xs/5">
        - New soundscapes! Enjoy the full Endel content library in Endel for Mac (excluding motion-based Move and Clarity Trip)
        <br />- Adjust sound pads for Focus, Relax, Sleep, Hibernation, Nature Elements and Dynamic to customise sounds in real
        time to suit your needs-Share wake-up time from Endel for ios-U improvement: show/hide Endel app icons in the dock and
        return to the app window from the dock-Added system keyboard shortcuts-Bug fix: Sound glitches and crashes have been
        fixed
      </div>
      <div className="mt-4 flex items-center justify-between border-b border-gray-400 pb-3">
        <h4 className="text-sm">version 0.26.0.5</h4>
        <p className="text-xs text-gray-300">2023-06-15</p>
      </div>
      <div className="py-3 pr-40 text-xs/5">
        - New soundscapes! Enjoy the full Endel content library in Endel for Mac (excluding motion-based Move and Clarity Trip)
        <br />- Adjust sound pads for Focus, Relax, Sleep, Hibernation, Nature Elements and Dynamic to customise sounds in real
        time to suit your needs-Share wake-up time from Endel for ios-U improvement: show/hide Endel app icons in the dock and
        return to the app window from the dock-Added system keyboard shortcuts-Bug fix: Sound glitches and crashes have been
        fixed
      </div>
    </div>
  );
}
