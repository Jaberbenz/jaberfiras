"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const tabs = [
    { name: "Production", path: "/dashboard/production" },
    { name: "Preproduction", path: "/dashboard/preproduction" },
    { name: "Recette", path: "/dashboard/recette" },
  ];
  const [activeTab, setActiveTab] = useState("Production");
  const pathname = usePathname();

  useEffect(() => {
    const currentTab =
      tabs.find((tab) => pathname.includes(tab.path))?.name || "Production";
    setActiveTab(currentTab);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 px-6 py-10 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Grand Titre Centré */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-purple-700 dark:text-purple-400">
          Collection
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Navigate through your collection
        </p>
      </div>

      {/* Navigation des Onglets */}
      <div className="mb-10 flex justify-center">
        <div className="flex space-x-4 rounded-full bg-gray-200 p-1 shadow-lg dark:bg-gray-800">
          {tabs.map((tab) => (
            <Link key={tab.name} href={tab.path}>
              <div
                className={`cursor-pointer rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.name
                    ? "bg-white text-gray-900 shadow-md dark:bg-purple-600 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {tab.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Contenu */}
      <div className="mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg transition-all dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
