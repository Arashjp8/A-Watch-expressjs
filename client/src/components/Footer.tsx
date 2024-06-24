function Footer() {
  return (
    <footer
      className={"bg-slate-900/80 dark:bg-slate-800 bg-opacity-95 text-white"}
    >
      <div className={"container mx-auto p-6 text-center"}>
        Copyright © 2024{" "}
        <a
          href="https://twitter.com/arashjafarpour1"
          target="blank"
          className="hover:text-teal-400 hover:border-b-2 border-b-teal-400"
        >
          @arashjafarpour1
        </a>
        . All Rights Reserved{" "}
      </div>
    </footer>
  );
}
export default Footer;
