function Footer() {
  return (
    <div
      className={
        "basis-1/12 flex justify-center items-center border border-lime-500 w-[100vw] h-[80px] min-h-[80px] text-center"
      }
    >
      <p>
        Copyright © 2024{" "}
        <a
          href="https://twitter.com/arashjafarpour1"
          target="blank"
          className="hover:text-blue-600 hover:border-b-2 border-blue-600"
        >
          @arashjafarpour1
        </a>
        . All Rights Reserved{" "}
      </p>
    </div>
  );
}
export default Footer;
