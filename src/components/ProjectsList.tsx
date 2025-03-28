import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {projects.map((project) => (
        <div 
          key={project.id}
          className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2">{project.title}</h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {project.link.isExternal ? (
              <a 
                href={project.link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center font-medium"
              >
                Lisää projektista
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <Link 
                href={project.link.url} 
                className="text-blue-600 hover:text-blue-800 inline-flex items-center font-medium"
              >
                Lisää projektista
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 