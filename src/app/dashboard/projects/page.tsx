import Link from "next/link";

const projects = [
  {
    id: "1",
    title: "Project One",
    language: "JavaScript",
    imgSrc: "/placeholder-image.jpg",
    userAvatar: "/user-avatar.jpg",
    envNumber: "env_001",
  },
  {
    id: "2",
    title: "Project Two",
    language: "Python",
    imgSrc: "/placeholder-image.jpg",
    userAvatar: "/user-avatar.jpg",
    envNumber: "env_002",
  },
  {
    id: "3",
    title: "Project Three",
    language: "React",
    imgSrc: "/placeholder-image.jpg",
    userAvatar: "/user-avatar.jpg",
    envNumber: "env_003",
  },
  {
    id: "4",
    title: "Project Four",
    language: "React",
    imgSrc: "/placeholder-image.jpg",
    userAvatar: "/user-avatar.jpg",
    envNumber: "env_004",
  },
  {
    id: "5",
    title: "Project Five",
    language: "React",
    imgSrc: "/placeholder-image.jpg",
    userAvatar: "/user-avatar.jpg",
    envNumber: "env_005",
  },
];

const ProjectsPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center p-10 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-6xl">
        <h1 className="mb-6 text-center text-5xl font-bold text-purple-700 dark:text-purple-400">
          My Awesome Projects
        </h1>
        <p className="mb-12 text-center text-lg text-gray-700 dark:text-gray-300">
          Give us your code, and we’ll make it *stonks*!
        </p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Create New Project Card */}
          <Link
            href="/dashboard/projects/addProject"
            className="flex h-80 w-full items-center justify-center rounded-lg border-2 border-dashed border-purple-400 bg-purple-50 p-8 text-purple-700 transition hover:border-purple-600 hover:bg-purple-100 dark:border-gray-700 dark:bg-gray-800 dark:text-purple-300 dark:hover:border-gray-500 dark:hover:bg-gray-700"
          >
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold">+</span>
              <p className="mt-4 text-2xl font-semibold">Create New Project</p>
            </div>
          </Link>

          {/* Existing Projects */}
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="group relative flex h-80 w-full flex-col rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
            >
              <img
                src={project.imgSrc}
                alt="Project Preview"
                className="h-36 w-full rounded-t-lg object-cover"
              />
              <div className="flex flex-1 flex-col p-4">
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {project.language}
                </p>
                <div className="mt-auto flex items-center space-x-3">
                  <img
                    src={project.userAvatar}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full border-2 border-purple-400"
                  />
                  <span className="text-sm text-gray-800 dark:text-gray-300">
                    {project.envNumber}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg bg-purple-500 opacity-0 transition-opacity group-hover:opacity-10"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
