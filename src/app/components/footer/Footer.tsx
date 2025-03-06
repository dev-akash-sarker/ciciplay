import Image from "next/image";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
export default function Footer() {
  return (
    <>
      <div className="@container bg-[#1E293B]">
        <div className=" xs:w-full xs:px-5 w-[1250px] mx-auto">
          <div className="flex flex-wrap justify-between py-5">
            <div className=" xs:w-full sm:w-full md:w-full xl:w-[181px]">
              <Link href="/">
                <Image
                  src={"/assets/images/header/logo.png"}
                  alt="hello"
                  width="181"
                  height="39"
                />
              </Link>
            </div>
            <div className=" xs:w-full xs:mt-3 sm:w-1/2 md:w-1/3 sm:mt-6  xl:w-[98px]">
              <h3 className=" text-xl font-bold mb-5 text-[#D6E0EB]">Buy</h3>
              <nav>
                <ul className="flex flex-col gap-3 font-normal text-base text-white opacity-65">
                  <li>
                    <Link href="/howtobuy">How To Buy</Link>
                  </li>
                  <li>
                    <Link href="/payment">Payment</Link>
                  </li>
                  <li>
                    <Link href="/refundpolicy">Refund Policy</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className=" xs:w-full xs:mt-3 sm:w-1/2 sm:mt-6 md:w-1/3  xl:w-[185px]">
              <h3 className="text-xl font-bold text-[#D6E0EB] mb-5">Legal</h3>
              <nav>
                <ul className="flex flex-col gap-3 font-normal text-base text-white opacity-65">
                  <li>
                    <Link href="/privacypolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/t&c">Terms And Conditions</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className=" xs:w-full xs:mt-3 sm:w-1/2 sm:mt-6 md:w-1/3 xl:w-[265px]">
              <div className=" w-[265px]">
                <h3 className="text-xl font-bold text-[#D6E0EB] mb-5">
                  Products
                </h3>
                <nav>
                  <ul className=" flex flex-wrap gap-5 justify-between font-normal text-base text-white opacity-65">
                    <li>
                      <Link href="/game/gamename">
                        <RxCaretRight className="mt-1" />
                        Game Name
                      </Link>
                    </li>
                    <li>
                      <Link href="/game/gamename">
                        <RxCaretRight className="mt-1" />
                        Game Name
                      </Link>
                    </li>
                    <li>
                      <Link href="/game/gamename">
                        <RxCaretRight className="mt-1" />
                        Game Name
                      </Link>
                    </li>
                    <li>
                      <Link href="/game/gamename">
                        <RxCaretRight className="mt-1" />
                        Game Name
                      </Link>
                    </li>
                    <li>
                      <Link href="/game/gamename">
                        <RxCaretRight className="mt-1" />
                        Game Name
                      </Link>
                    </li>
                    <li>
                      <Link href="/game/gamename">
                        <RxCaretRight className="mt-1" />
                        Game Name
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className=" xs:w-full xs:mt-3 sm:w-1/2 sm:mt-6 md:w-full  xl:w-[300px]">
              <h3 className="text-xl font-bold text-[#D6E0EB]">Contact Us</h3>
              <p className=" inline-block py-[14.5px] px-[52.5px] linearpara my-5">
                MMOFOX@gmail.com
              </p>
              <div className="flex gap-3">
                <div className="w-[34px] h-[34px] bg-[#334155] rounded-md flex justify-center items-center">
                  <Link href="">
                    <FaFacebookF fontSize={16} color="white" />
                  </Link>
                </div>
                <div className="w-[34px] h-[34px] bg-[#334155] rounded-md flex justify-center items-center">
                  <Link href="">
                    <FaTwitter fontSize={16} color="white" />
                  </Link>
                </div>
                <div className="w-[34px] h-[34px] bg-[#334155] rounded-md flex justify-center items-center">
                  <Link href="">
                    <FaInstagram fontSize={16} color="white" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
