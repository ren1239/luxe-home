import Link from "next/link";
import Image from "next/image";
import DesktopLogo from "../../public/airbnb-desktop.png";
import MobileLogo from "../../public/airbnb-mobile.webp";
import { UserNav } from "./UserNav";
import { SearchModelComponent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href={"/"}>
          <Image
            src={DesktopLogo}
            alt={"logo"}
            className="w-32 hidden lg:block"
          />
          <Image
            src={MobileLogo}
            alt={"mobile logo"}
            className="w-12 block lg:hidden"
          />
        </Link>
        <SearchModelComponent />
        <UserNav />
      </div>
    </nav>
  );
}
