import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [toggled, setToggled] = useState<boolean>(false);

  const toggleTheme = () => {
    setToggled(!toggled);
    document.body.classList.toggle("dark");
  };

  const navigate = useNavigate();

  return (
    <nav
      className={
        "flex flex-row justify-between items-center w-full h-[80px] p-4 bg-slate-900/80 dark:bg-slate-800 text-slate-900"
      }
    >
      <div className={"flex flex-row space-x-12 items-center"}>
        <a
          onClick={() => navigate("/")}
          className={
            "text-2xl hover:cursor-pointer font-extrabold text-teal-500"
          }
        >
          MovieMerge
        </a>
      </div>
      <button
        className={"flex justify-end p-2 bg-teal-400 rounded-lg"}
        onClick={() => {
          setToggled((prevState) => !prevState);
          toggleTheme();
        }}
      >
        {toggled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-sun"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-moon"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
        )}
      </button>
    </nav>
  );
}
export default Navbar;
