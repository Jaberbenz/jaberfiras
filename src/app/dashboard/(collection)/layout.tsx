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

  useEffect(() => {
    const currentTab =
      tabs.find((tab) => pathname.includes(tab.path))?.name || "Production";
    setActiveTab(currentTab);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col p-10 text-gray-900 dark:text-gray-100">
      <div className="mb-8 flex items-center">
        <div className="flex space-x-4 rounded-lg bg-gray-200 p-1 dark:bg-gray-800">
          {tabs.map((tab) => (
            <Link key={tab.name} href={tab.path}>
              <div
                className={`rounded-lg px-4 py-2 ${
                  activeTab === tab.name
                    ? "bg-white text-black dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {tab.name}
              </div>
            </Link>
          ))}
        </div>
        <h1 className="mx-10 ml-6 text-4xl font-bold">Collection</h1>
      </div>
      <p className="mb-8 text-center text-lg">
        Navigate through your collection
      </p>
      <div className="mx-auto flex w-full max-w-4xl flex-col space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
