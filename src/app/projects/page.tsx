'use client';
import StyledButton from '@/components/ui/button/StyledButton';
import Search from '@/components/ui/search';
import ProjectCard from './_components/ProjectCard';

export default function Projects() {
  return (
    <div>
      <div className="font-semibold leading-6">Local Projects</div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <StyledButton variant="gradient" className="h-11 w-[288px] font-semibold">
            + Create New Project
          </StyledButton>
          <StyledButton variant="bordered" className="h-11 w-[118px] font-semibold">
            Input
          </StyledButton>
        </div>
        <Search className="w-90" placeholder="Template name" />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
}
