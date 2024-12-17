"use client";

import Link from "next/link";

const projects = [
  {
    id: "1",
    title: "Project One",
    language: "JavaScript",
    envNumber: "env_001",
    environment: "Development",
  },
  {
    id: "2",
    title: "Project Two",
    language: "Python",
    envNumber: "env_002",
    environment: "Production",
  },
  {
    id: "3",
    title: "Project Three",
    language: "React",
    envNumber: "env_003",
    environment: "Staging",
  },
  {
    id: "4",
    title: "Project Four",
    language: "React",
    envNumber: "env_004",
    environment: "Testing",
  },
  {
    id: "5",
    title: "Project Five",
    language: "TypeScript",
    envNumber: "env_005",
    environment: "QA",
  },
];

const ProjectsPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text p-10">
      <div className="w-full max-w-6xl">
        {/* Titre principal */}
        <h1 className="mb-6 text-center text-4xl font-extrabold text-light-primary dark:text-dark-primary">
          My Awesome Projects
        </h1>
        <p className="mb-12 text-center text-lg text-light-secondary dark:text-dark-secondary">
          All your projects in one place with detailed information.
        </p>

        {/* Grille des Projets */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Carte Ajouter un Projet */}
          <Link
            href="/dashboard/projects/addProject"
            className="flex h-60 w-full items-center justify-center rounded-lg border-2 border-dashed border-light-primary bg-light-card text-light-primary transition hover:border-light-secondary hover:bg-light-background dark:border-dark-primary dark:bg-dark-card dark:text-dark-highlight dark:hover:border-dark-secondary dark:hover:bg-dark-background"
          >
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold">+</span>
              <p className="mt-2 text-lg font-semibold">Create New Project</p>
            </div>
          </Link>

          {/* Cartes des Projets Existant */}
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="flex h-60 w-full flex-col justify-between rounded-lg bg-light-card p-6 shadow-lg transition-transform hover:scale-105 dark:bg-dark-card"
            >
              {/* Informations pertinentes */}
              <div>
                <h2 className="text-2xl font-bold text-light-primary dark:text-dark-highlight mb-2">
                  {project.title}
                </h2>
                <p className="text-sm text-light-text dark:text-dark-secondary">
                  <strong>Language:</strong> {project.language}
                </p>
                <p className="text-sm text-light-text dark:text-dark-secondary">
                  <strong>Environment:</strong> {project.environment}
                </p>
                <p className="text-sm text-light-text dark:text-dark-secondary">
                  <strong>Env ID:</strong> {project.envNumber}
                </p>
              </div>

              {/* Bouton Voir Plus */}
              <div className="text-right">
                <button className="text-sm font-semibold text-light-primary hover:underline dark:text-dark-highlight">
                  View Details →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
