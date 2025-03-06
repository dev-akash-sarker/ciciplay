"use client";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";
const Navbar: FC = () => {
  const pathname = usePathname();
  console.log(pathname);
  const [collapse, setCollapse] = useState(false);
  const togglebutton = () => {
    setCollapse(!collapse);
  };
  return (
    <>
      <div className="bg-[rgba(30,41,59.70)] ">
        <div className=" @container  xs:hidden lg:block lg:w-[1000px] xl:w-[1170px]  2xl:w-[1400px] 3xl:w-[1600px] py-[30px] mx-auto bg-[rgba(30,41,59.70)]">
          <nav className=" flex justify-between items-center">
            <ul>
              <li>
                <Link href="/">
                  <Image
                    src={"/assets/images/header/logo.png"}
                    alt="hello"
                    width="181"
                    height="39"
                  />
                </Link>
              </li>
            </ul>
            <ul className=" flex justify-start lg:gap-3 xl:gap-5 2xl:gap-8 3xl:gap-10 items-center font-bold text-white">
              <li className="">
                <Link href="/" className={pathname === "/" ? "active" : ""}>
                  <Image
                    src="/assets/images/header/gameIcon.svg"
                    width="24"
                    height="24"
                    alt="home"
                  />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/gold"
                  className={pathname === "/gold" ? "active" : ""}
                >
                  <Image
                    src="/assets/images/header/moneyIcon.svg"
                    width="24"
                    height="24"
                    alt="gold"
                  />
                  Gold
                </Link>
              </li>
              <li>
                <Link
                  href="/item"
                  className={pathname === "/item" ? "active" : ""}
                >
                  <Image
                    src="/assets/images/header/gameIcon.svg"
                    width="24"
                    height="24"
                    alt="itemicon"
                  />
                  Item
                </Link>
              </li>
              <li>
                <Link
                  href="/boot"
                  className={pathname === "/boot" ? "active" : ""}
                >
                  <Image
                    src="/assets/images/header/swordIcon.svg"
                    width="24"
                    height="24"
                    alt="boot"
                  />
                  Boot
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className={pathname === "/news" ? "active" : ""}
                >
                  <Image
                    src="/assets/images/header/newsIcon.svg"
                    width="24"
                    height="24"
                    alt="news"
                  />
                  News
                </Link>
              </li>
              <li className="flex">
                <button>
                  <Image
                    src="/assets/images/header/Search.svg"
                    width="24"
                    height="24"
                    alt="search"
                  />
                </button>
              </li>
            </ul>
            <ul className=" flex justify-start gap-[8px] items-center">
              <li className="p-3 rounded-[10px] bg-[#334155] text-white">
                <Link href={"#"}>
                  <Image
                    src="/assets/images/header/cartIcon.svg"
                    width={24}
                    height={24}
                    alt="cart"
                  />
                </Link>
              </li>
              <li className="p-3 rounded-[10px] bg-[#334155] text-white">EN</li>
              <li className="p-3 rounded-[10px] border-2 border-[#334155] bg-[#161F33] text-white">
                <Link href={"#"}>Sign up</Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* mobile version */}
        <div
          className={
            collapse
              ? " absolute w-full h-screen top-0 left-0 bg-[rgba(30,41,59.70)]"
              : " " + " lg:hidden md:block"
          }
        >
          <div className="flex justify-between px-3 py-3">
            <motion.button onClick={togglebutton} whileTap={{ scale: 0.9 }}>
              <AnimatePresence mode="wait">
                {collapse ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AiOutlineClose size={32} color="#fff" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AiOutlineMenu size={32} color="#fff" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <ul className=" flex justify-start gap-[8px] items-center">
              <li className="p-3 rounded-[10px] bg-[#334155] text-white">
                <Link href={"#"}>
                  <Image
                    src="/assets/images/header/cartIcon.svg"
                    width={24}
                    height={24}
                    alt="cart"
                  />
                </Link>
              </li>
              <li className="p-3 rounded-[10px] bg-[#334155] text-white">EN</li>
              <li className="p-3 rounded-[10px] border-2 border-[#334155] bg-[#161F33] text-white">
                <Link href={"#"}>Sign up</Link>
              </li>
            </ul>
          </div>
          <nav className={collapse ? "" : "hidden"}>
            <ul className=" flex flex-col mt-3 px-3 font-bold text-white gap-8">
              <li>
                <Link href="/">
                  <Image
                    src={"/assets/images/header/logo.png"}
                    alt="hello"
                    width="181"
                    height="39"
                  />
                </Link>
              </li>
              <li className="">
                <Link href="/" className={pathname === "/" ? "active" : ""}>
                  <Image
                    src="/assets/images/header/gameIcon.svg"
                    width="24"
                    height="24"
                    alt="home"
                  />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/gold"
                  className={pathname === "/gold" ? "active" : ""}
                >
                  <Image
                    src="/assets/images/header/moneyIcon.svg"
                    width="24"
                    height="24"
                    alt="gold"
                  />
                  Gold
                </Link>
              </li>
              <li>
                <Link
                  href="/item"
                  className={pathname === "/item" ? "active" : ""}
                >
                  <Image
                    src="/assets/images/header/gameIcon.svg"
                    width="24"
                    height="24"
                    alt="itemicon"
                  />
                  Item
                </Link>
              </li>
              <li>
                <Link
                  href="/boot"
                  className={pathname === "/boot" ? "active" : ""}
                >
                  <Image
                    src="/assets/images/header/swordIcon.svg"
                    width="24"
                    height="24"
                    alt="boot"
                  />
                  Boot
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className={pathname === "/news" ? "active" : ""}
                >
                  <Image
                    src="/assets/images/header/newsIcon.svg"
                    width="24"
                    height="24"
                    alt="news"
                  />
                  News
                </Link>
              </li>
              <li className="flex">
                <button className="inline-block px-6 py-2 rounded-sm border-2 border-[#334155] bg-[#161F33] text-white">
                  <Image
                    src="/assets/images/header/Search.svg"
                    width="24"
                    height="24"
                    alt="search"
                  />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
