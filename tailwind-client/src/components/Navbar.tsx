function NavItems() {
  return (
    <ul className={"flex basis-1/6 flex-row justify-between items-center"}>
      <li>item</li>
      <li>item</li>
      <li>item</li>
    </ul>
  );
}

function Navbar() {
  return (
    <nav
      className={
        "flex flex-row justify-between items-center w-[100%] h-[80px] p-4"
      }
    >
      <a href={"/"} className={"basis-1/3 text-3xl font-bold"}>
        MovieMerge
      </a>
      <NavItems />
      <div className="flex basis-1/3 justify-end">
        <h1 className={"text-2xl text-end font-bold underline"}>Navbar</h1>
      </div>
    </nav>
  );
}
export default Navbar;
