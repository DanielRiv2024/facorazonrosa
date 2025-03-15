import { useRouter, usePathname } from "next/navigation";
import { FaMoon } from "react-icons/fa";
import { IoIosNotifications, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { SiLibretranslate } from "react-icons/si";

export default function TopBar({ showNavbar, toggleNavbar }) {
  const router = useRouter();
  const pathname = usePathname();

  const breadcrumbs = pathname
    .split("/")
    .filter((segment) => segment) 
    .map((segment, index, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1), 
      path: "/" + arr.slice(0, index + 1).join("/"), 
    }));

  return (
    <div className="flex items-center justify-between p-4 text-white gap-10 bg-black">
      <div className="flex flex-row gap-4">
        <button onClick={toggleNavbar} className="p-2 hover:bg-[#27272A] rounded-lg">
          {showNavbar ? <IoIosArrowBack size={24} color="white" /> : <IoIosArrowForward size={24} color="white" />}
        </button>

        {/* Breadcrumbs navegables */}
        <nav className="text-gray-300 flex items-center gap-1">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center">
              {index > 0 && <IoIosArrowForward size={10} className="mx-1" />}
              <span 
                className="text-white cursor-pointer hover:underline"
                onClick={() => router.push(crumb.path)}
              >
                {crumb.name}
              </span>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <button>
       < SiLibretranslate size={25} color="white"/>
        </button>
        <button>
          <IoIosNotifications size={25} color="white" />
        </button>
        <button className="p-2 rounded-md text-white">
          <FaMoon className="bg-[#27272A] p-2 rounded-md" size={30} color="white" />
        </button>
        <img
          src="https://static.wixstatic.com/media/2e2561_bb3e95000dc34a2bbd3b767828642f5a~mv2.png"
          alt="Perfil"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
}
