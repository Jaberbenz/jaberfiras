"use client";

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
    <div className="flex min-h-screen flex-col items-center bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text p-10">
      <div className="w-full max-w-5xl">
        {/* Titre et sous-titre */}
        <h1 className="mb-6 text-center text-4xl font-extrabold text-light-primary dark:text-dark-primary">
          Do everything you want!
        </h1>
        <p className="mb-12 text-center text-lg text-light-secondary dark:text-dark-secondary">
          Modify your code, see your app running, supervise, learn...
        </p>

        {/* Grille des Détails */}
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-4">
          {projectDetails.map((proj) => (
            <div
              key={proj.id}
              className="flex h-80 w-64 flex-col justify-between rounded-lg bg-light-card p-4 shadow-lg transition-transform hover:scale-105 dark:bg-dark-card"
            >
              {/* Image */}
              {proj.imgSrc ? (
                <img
                  src={proj.imgSrc}
                  alt={proj.title}
                  className="h-40 w-full rounded-lg object-cover mb-4"
                />
              ) : (
                <div className="h-40 w-full flex items-center justify-center rounded-lg bg-light-secondary text-light-text dark:bg-dark-secondary dark:text-dark-text">
                  No Image
                </div>
              )}

              {/* Contenu */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-light-primary dark:text-dark-highlight">
                  {proj.title}
                </h2>
                <p className="text-sm text-light-secondary dark:text-dark-secondary">
                  {proj.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
