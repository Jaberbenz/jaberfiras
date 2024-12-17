"use client";

import { useState } from "react";

const AddProjectPage = () => {
  const [projectName, setProjectName] = useState("");
  const [language, setLanguage] = useState("");
  const [environment, setEnvironment] = useState("");
  const [framework, setFramework] = useState("");
  const [mates, setMates] = useState("");

  const handleCreateProject = () => {
    console.log("Creating project with:", {
      projectName,
      language,
      environment,
      framework,
      mates,
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-light-background p-10 text-light-text dark:bg-dark-background dark:text-dark-text">
      <div className="w-full max-w-2xl rounded-lg bg-light-card p-10 shadow-lg transition-all dark:bg-dark-card">
        <h1 className="mb-6 text-center text-4xl font-extrabold text-light-primary dark:text-dark-primary">
          Create New Project
        </h1>
        <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-300">
          Register some things to help us... help you!
        </p>
        <div className="space-y-6">
          {/* Project Name & Language */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Project
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-1/3 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
            </div>
          </div>
          {/* Environment & Framework */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Environment
              </label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="Development">Development</option>
                <option value="Production">Production</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Framework
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="ReactJS">ReactJS</option>
                <option value="Angular">Angular</option>
                <option value="VueJS">VueJS</option>
              </select>
            </div>
          </div>
          {/* Upload Section */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Code (.zip)
              </label>
              <button className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 shadow-sm hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Upload
              </button>
            </div>
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
                SSH Key
              </label>
              <button className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 shadow-sm hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Upload
              </button>
            </div>
          </div>
          {/* Mates Section */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Mates
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Username or Mail Address"
                value={mates}
                onChange={(e) => setMates(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 shadow-sm focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
              <button className="rounded-lg bg-purple-600 px-4 py-3 text-white shadow-sm transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Invite
              </button>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-8 flex justify-between">
            <button className="rounded-lg border border-gray-300 bg-gray-100 px-5 py-3 text-gray-700 shadow-sm hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              className="rounded-lg bg-purple-600 px-5 py-3 text-white shadow-sm transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectPage;
