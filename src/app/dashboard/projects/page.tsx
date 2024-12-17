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
    <div className="flex min-h-screen flex-col items-center p-10 text-gray-900 dark:text-white">
      <div className="w-full max-w-5xl">
        <h1 className="mb-4 text-center text-4xl font-bold">
          My Awesome Projects
        </h1>
        <p className="mb-8 text-center text-lg">
          Give us your code, we’ll make it stonks!
        </p>
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Create New Project Card */}
          <Link
            href="/dashboard/projects/addProject"
            className="flex h-80 w-64 items-center justify-center rounded-lg border border-dashed p-8 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex flex-col items-center">
              <span className="text-5xl">+</span>
              <p className="mt-2 text-xl font-semibold">Create New Project</p>
            </div>
          </Link>
          {/* Existing Projects */}
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="h-80 w-64 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
            >
              <img
                src={project.imgSrc}
                alt="Project Preview"
                className="mb-4 h-36 w-full rounded-lg object-cover"
              />
              <h2 className="mb-2 text-2xl font-bold">{project.title}</h2>
              <p className="mb-4 text-sm">{project.language}</p>
              <div className="flex items-center space-x-2">
                <img
                  src={project.userAvatar}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span>{project.envNumber}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
