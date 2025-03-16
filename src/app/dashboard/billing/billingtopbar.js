import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import Link from "next/link";
export default function BillingTopBar({totalPrice}) {
  console.log(totalPrice)
  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow">
      <span className="text-lg text-white font-semibold">
        Total vendido: CRC {totalPrice}
      </span>
      <div className="flex flex-row items-center gap-2 hover:bg-[#1F1F22] p-2 rounded ">
        <span className="text-lg text-white font-semibold">23/05/25</span>
        <IoIosArrowDropdown size={20} />
      </div>
      <Link
        className="flex items-center gap-2 text-white bg-[#1F1F22] px-4 py-2 rounded-lg hover:opacity-80"
        href={"/dashboard/billing/newbilling"}
      >
        <IoAddCircleOutline size={20} />
        Agregar
      </Link>
    </div>
  );
}
