import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center">About Me</h1>
          
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-12">
            <div className="w-64 h-64 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <Image
                src="/images/profile.jpg"
                alt="Profile picture"
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Ansku</h2>
              <p className="text-gray-600 mb-4">
                I'm a passionate developer with expertise in modern web technologies. I love building intuitive, 
                responsive, and accessible web applications that solve real problems.
              </p>
              <p className="text-gray-600 mb-4">
                My journey in web development started several years ago, and I've been hooked ever since. 
                I enjoy the constant learning and evolution that comes with working in this field.
              </p>
              <p className="text-gray-600">
                When I'm not coding, you can find me reading tech blogs, contributing to open-source projects, 
                or exploring the outdoors.
              </p>
            </div>
          </div>
          
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-6">My Experience</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Senior Developer</h3>
                <p className="text-gray-500 mb-3">Tech Company • 2020 - Present</p>
                <p className="text-gray-600">
                  Leading development of web applications using React, Next.js, and Node.js. 
                  Implementing best practices and mentoring junior developers.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Full Stack Developer</h3>
                <p className="text-gray-500 mb-3">Digital Agency • 2017 - 2020</p>
                <p className="text-gray-600">
                  Developed client websites and applications. Worked with various technologies 
                  including JavaScript, React, and WordPress.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Junior Developer</h3>
                <p className="text-gray-500 mb-3">Tech Startup • 2015 - 2017</p>
                <p className="text-gray-600">
                  Started my career building user interfaces and implementing new features 
                  for web applications.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-12 mt-12">
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Bachelor's in Computer Science</h3>
              <p className="text-gray-500 mb-3">University of Technology • 2011 - 2015</p>
              <p className="text-gray-600">
                Focused on software development and web technologies. Graduated with honors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 