import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { MenuIcon, MoonIcon, Search, Settings, SunIcon } from "lucide-react";
import Link from "next/link";

type Props = {};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black dark:px-4 dark:py-3">
      {/* searchbar */}
      <div className="flex items-center justify-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <MenuIcon className="h-8 w-8 cursor-pointer dark:text-white" />
          </button>
        )}
        <div className="flex-h-min relative w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-5 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            placeholder="Search..."
            type="search"
          />
        </div>
      </div>

      {/* icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? "rounded p-2 dark:hover:bg-gray-700"
              : "rounded p-2 hover:bg-gray-100"
          }
        >
          {isDarkMode ? (
            <MoonIcon className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <SunIcon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="/account"
          className={
            isDarkMode
              ? "h-min w-min rounded p-2 dark:hover:bg-gray-700"
              : "h-min w-min rounded p-2 hover:bg-gray-100"
          }
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
