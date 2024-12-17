import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/Nilcloud.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20 ">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3 border-t border-black">
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center"></div>
        <p>Get started for free</p>
        <ArrowRight className="w-4 h-4 inline-flex justify-center items-center" />
      </div>
      <div className="py-5 ">
        <div className="container">
          <div className="flex justify-between items-center">
            <Image src={Logo} alt="Saas logo" height={40} width={40} />
            <MenuIcon className="w-5 h-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-balck/60 items-center">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Services</a>
              <a href="#">Contact</a>
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">
                Get started
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
