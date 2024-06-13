import { useState } from "react";

function NavItems() {
  return (
    <ul className={"text-white w-[20%] text-2xl flex flex-row space-x-12"}>
      <li
        className={"hover:cursor-pointer hover:underline hover:text-teal-400"}
      >
        item
      </li>
      <li
        className={"hover:cursor-pointer hover:underline hover:text-teal-400"}
      >
        item
      </li>
      <li
        className={"hover:cursor-pointer hover:underline hover:text-teal-400"}
      >
        item
      </li>
    </ul>
  );
}

function Navbar() {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <nav
      className={
        "flex flex-row justify-between items-center w-full h-[80px] p-4 bg-blue-950"
      }
    >
      <div className={"flex flex-row space-x-12 items-center"}>
        <a href={"/"} className={"text-2xl font-extrabold text-teal-500"}>
          MovieMerge
        </a>
        <NavItems />
      </div>
      <button
        className={"flex justify-end p-2 bg-teal-400 rounded-lg"}
        onClick={() => setToggled((prevState) => !prevState)}
      >
        {toggled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
