import { toggleTheme } from "@/features/ThemeSlice";
import { Moon, Search, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useSelector(
    (state: { theme: { mode: string } }) => state.theme
  );

  return (
    <nav
      className="h-16 w-full flex items-center justify-between px-8 border-b border-gray-200 dark:border-zinc-800"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <div className="flex items-center gap-10">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl cursor-pointer"
          style={{ color: "var(--text-color)" }}
        >
          EaseUi
        </h1>

        <div className="hidden sm:flex items-center bg-transparent rounded-md px-3 py-1.5 border border-gray-200 dark:border-zinc-700">
          <Search size={18} className="text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search components"
            className="ml-2 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600"
          />
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-6 text-gray-500 dark:text-gray-400">
        <li
          onClick={() => navigate("components")}
          className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          Components
        </li>
        <li className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">About</li>
        <li className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Templates</li>
        {mode === "dark" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => dispatch(toggleTheme())}
          >
            <Sun size={20} className="text-yellow-400" />
          </li>
        )}
        {mode === "light" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => dispatch(toggleTheme())}
          >
            <Moon size={20} className="text-gray-500" />
          </li>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-700 dark:text-gray-300"
        onClick={() => dispatch(toggleTheme())}
      >
        {mode === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
