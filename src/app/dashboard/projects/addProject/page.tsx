"use client";

import { Link } from "lucide-react";
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
    <div className="flex min-h-screen flex-col items-center p-10 text-gray-900 dark:text-white">
      <div className="w-full max-w-lg rounded-lg bg-white p-10 shadow-xl dark:bg-gray-800">
        <h1 className="mb-4 text-center text-4xl font-bold">
          Create New Project
        </h1>
        <p className="mb-8 text-center text-lg">
          Register some things to help us... help you!
        </p>
        <div className="mb-8 flex justify-center">
          <img
            src="/placeholder-image.jpg"
            alt="Project Thumbnail"
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Project</label>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full rounded-md border border-gray-400 bg-gray-50 px-3 py-2 text-gray-900 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200"
              />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-1/3 rounded-md border border-gray-400 bg-gray-50 px-3 py-2 text-gray-900 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="mb-1 block text-sm font-medium">
                Environment
              </label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full rounded-md border border-gray-400 bg-gray-50 px-3 py-2 text-gray-900 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="Development">Development</option>
                <option value="Production">Production</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="mb-1 block text-sm font-medium">
                Framework
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full rounded-md border border-gray-400 bg-gray-50 px-3 py-2 text-gray-900 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="ReactJS">ReactJS</option>
                <option value="Angular">Angular</option>
                <option value="VueJS">VueJS</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="mb-1 block text-sm font-medium">
                Code (.zip)
              </label>
              <button className="w-full rounded-md border border-gray-300 px-3 py-2">
                Upload
              </button>
            </div>
            <div className="w-1/2">
              <label className="mb-1 block text-sm font-medium">SSH Key</label>
              <button className="w-full rounded-md border border-gray-300 px-3 py-2">
                Upload
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Mates</label>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Username or Mail Address"
                value={mates}
                onChange={(e) => setMates(e.target.value)}
                className="w-full rounded-md border border-gray-400 bg-gray-50 px-3 py-2 text-gray-900 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-200"
              />
              <button className="rounded-md border border-gray-300 px-3 py-2">
                Invite
              </button>
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <button className="rounded-md border border-gray-300 px-4 py-2">
              Cancel
            </button>

            <button
              onClick={handleCreateProject}
              className="rounded-md bg-purple-600 px-4 py-2 text-white"
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
