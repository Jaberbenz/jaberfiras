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
    { name: "Account", path: "/dashboard/account" },
    { name: "SSH Keys", path: "/dashboard/sshKeys" },
    { name: "Billing", path: "/dashboard/billing" },
    { name: "Environment", path: "/dashboard/environment" },
    { name: "Automation", path: "/dashboard/automation" },
  ];
  const [activeTab, setActiveTab] = useState("Account");
  const pathname = usePathname();

  useEffect(() => {
    const currentTab =
      tabs.find((tab) => pathname.includes(tab.path))?.name || "Account";
    setActiveTab(currentTab);
  }, [pathname]);

  useEffect(() => {
    const currentTab =
      tabs.find((tab) => pathname.includes(tab.path))?.name || "Account";
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
        <h1 className="mx-10 ml-6 text-4xl font-bold">Settings</h1>
      </div>
      <p className="mb-8 text-center text-lg">Setup everything you need</p>
      <div className="mx-auto flex w-full max-w-4xl flex-col space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
