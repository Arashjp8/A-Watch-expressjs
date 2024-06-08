function Footer() {
  return (
    <div
      className={
        "basis-1/12 flex justify-center items-center bg-blue-950 bg-opacity-95 text-white w-[100vw] h-[80px] min-h-[80px] text-center"
      }
    >
      <p>
        Copyright © 2024{" "}
        <a
          href="https://twitter.com/arashjafarpour1"
          target="blank"
          className="hover:text-teal-400 hover:border-b-2 border-b-teal-400"
        >
          @arashjafarpour1
        </a>
        . All Rights Reserved{" "}
      </p>
    </div>
  );
}
export default Footer;
