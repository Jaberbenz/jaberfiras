import Link from "next/link";

const projectDetails = [
  {
    id: "1",
    title: "Development",
    subtitle: "Environment",

    imgSrc: "/development-image.jpg",
  },
  {
    id: "2",
    title: "Deployment",
    subtitle: "Stacks",

    imgSrc: "/deployment-image.jpg",
  },
  {
    id: "3",
    title: "God Himself",
    subtitle: "Supervision",
    imgSrc: "/supervision-image.jpg",
  },
  {
    id: "4",
    title: "Learn & Apply",
    subtitle: "Documentation",
    imgSrc: "/learn-image.jpg",
  },
];

const ProjectDetailPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center p-10 text-gray-900 dark:text-white">
      <div className="w-full max-w-5xl">
        <h1 className="mb-4 text-center text-4xl font-bold">
          Do everything you want!
        </h1>
        <p className="mb-8 text-center text-lg">
          Modify your code, see your app running, supervise, learn...
        </p>
        <div className="grid grid-cols-1 justify-items-center gap-20 md:grid-cols-2 lg:grid-cols-4">
          {projectDetails.map((proj) => (
            <div
              key={proj.id}
              className="h-80 w-64 flex-col items-center rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
            >
              <img
                src={proj.imgSrc}
                alt={proj.title}
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />
              <h2 className="mb-2 text-2xl font-bold">{proj.title}</h2>
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                {proj.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
