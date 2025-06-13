import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiCube,
  HiArchive,
  HiUser,
  HiShoppingCart,
  HiReceiptTax,
  HiLocationMarker,
  HiCalendar,
} from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
export default function Navbar({ show }) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Productos",
      icon: <HiCube size={20} />,
      path: "/dashboard/products",
    },
     {
      name: "Ventas",
      icon: <HiCube size={20} />,
      path: "/dashboard/products",
    },
    { name: "Inventario", icon: <HiArchive size={20} />, path: "/inventario" },
    { name: "Personal", icon: <HiUser size={20} />, path: "/personal" },
    { name: "Pedidos", icon: <HiShoppingCart size={20} />, path: "/pedidos" },
    {
      name: "Facturación",
      icon: <HiReceiptTax size={20} />,
      path: "/dashboard/billing",
    },
    {
      name: "Perdida",
      icon: <FaRegTrashAlt size={20} />,
      path: "/dashboard/loss",
    },
    {
      name: "Sucursales",
      icon: <HiLocationMarker size={20} />,
      path: "/dashboard/stores",
    },
    { name: "Eventos", icon: <HiCalendar size={20} />, path: "/eventos" },
  ];

  return (
    <div className="bg-background text-foreground h-screen fixed top-0 left-0 p-4 transition-all duration-800">
      {navItems.map((item) => (
        <Link key={item.name} href={item.path} className="block">
          <div
            className={`p-2 flex items-center mb-2 gap-2 rounded-md cursor-pointer transition-all duration-200
  ${
    pathname.startsWith(item.path)
      ? "bg-neutral-900 text-white"
      : "hover:bg-[#27272A] hover:text-white"
  }`}>
            {item.icon} {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
