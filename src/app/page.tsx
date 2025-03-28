import Image from "next/image";
import Link from "next/link";
import ProjectsList from "@/components/ProjectsList";
import projects from "@/data/projects";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-(--color-hero-background) py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
             Moi, Olen Ansku Silvast
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Olen devaaja, tiiminvetäjä, scrummaster, PO ja mitä ikinä keksinkään olla.
            </p>
            <div className="flex gap-4 mt-4">
              <Link 
                href="/contact" 
                className="inline-flex h-10 items-center justify-center rounded-md bg-(--color-primary) px-8 text-sm font-medium text-(--color-primary-foreground) shadow transition-colors hover:bg-blue-700"
              >
                Ole yhteydessä
              </Link>
              <Link 
                href="/blog" 
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50"
              >
                Blogiin
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/images/profile.jpg"
                alt="Profile picture"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Taidot/Skills</h2>
            <p className="text-gray-600 max-w-md mx-auto">
             Näillä näppäilen.
            </p>
            <p className="text-gray-600 max-w-md mx-auto">
              These are the technologies and tools I am proficient with.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              "Team Leadership","Scrum Master","Product Owner", "Project Management",
              "Clojure", "Rust", "ClojureScript", "Re-frame", 
              "JavaScript", "TypeScript", "React", "Next.js", 
              "AWS Lambda", "AWS DynamoDB","AWS SQS", "REST API",
              "Cursor", "GitHub CoPilot"
            ].map((skill) => (
              <div key={skill} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="font-medium">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Projekteja</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Tässäpä on muutamia projekteja, joita vapaa-ajalla olen puuhastellut.
            </p>
          </div>
          <ProjectsList projects={projects} />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Yhteystiedot/Contact</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Löydät minut näistä kanavista:
            </p>
          </div>
          <div className="flex justify-center gap-8">
            <a 
              href="https://github.com/Silvast" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/silvast/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://bsky.app/profile/anskusilvast.bsky.social"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Image 
                src="/images/bluesky-1.svg"
                alt="BlueSky"
                width={24} 
                height={24}
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-(--color-footer-background) py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} Ansku. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                Bio
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/english" className="text-gray-600 hover:text-gray-900">
                In English
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
