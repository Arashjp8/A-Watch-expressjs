import { useState } from "react";

function NavItems() {
  return (
    <ul className={"w-[20%] text-2xl flex flex-row space-x-12"}>
      <li>item</li>
      <li>item</li>
      <li>item</li>
    </ul>
  );
}

function Navbar() {
  const [toggled, setToggled] = useState<boolean>(false);
  return (
    <nav
      className={
        "flex flex-row justify-between items-center w-full h-[80px] p-4 border border-sky-500"
      }
    >
      <div className={"flex flex-row space-x-12 items-center"}>
        <a className={"text-2xl font-extrabold text-teal-500"}>MovieMerge</a>
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
    //<nav
    //  className={
    //    "basis-1/12 flex flex-row justify-between items-center w-[100%] h-[80px] p-4 border border-sky-500"
    //  }
    //>
    //  <a href={"/"} className={"basis-1/3 text-2xl font-bold"}>
    //    MovieMerge
    //  </a>
    //  <NavItems />
    //  <button
    //    className={"basis-1/3 w-2 h-10 border border-red-400 flex justify-end"}
    //  >
    //    moon
    //  </button>
    //</nav>
  );
}
export default Navbar;
