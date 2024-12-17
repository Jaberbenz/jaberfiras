"use client";

import React from "react";

const SupportPage = () => {
  const supportOptions = [
    {
      title: "Learn",
      subtitle: "Documentation",
      additionalInfo: "<page_number>",
    },
    {
      title: "Community",
      subtitle: "Discord",
      additionalInfo: "<member_number>",
    },
  ];

  return (
    <div className="mt-20 flex min-h-screen flex-col items-center p-10 text-gray-900 dark:text-gray-100">
      <h1 className="mb-6 text-center text-4xl font-bold">Need Help?</h1>
      <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-400">
        Sometimes, reading the documentation is the best option...
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className="flex w-80 flex-col justify-between rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
          >
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              {option.title}
            </h2>
            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              {option.subtitle}
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {option.additionalInfo}
            </p>
            <div className="mt-4 text-right">
              <button className="text-xl text-blue-500 hover:underline">
                &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportPage;
