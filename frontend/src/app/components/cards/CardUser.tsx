import Image from "next/image";
import more from "@/app/assets/common/icons/more.png";

export default function UserCard({ type }: { type: string }) {
    return (
        <div className="rounded-2xl odd:bg-slate-400 even:bg-red-700 p-4 flex-1 min-w-[130px]">
            <div className="flex justify-between items-center">
                <span>2024/24/3</span>
                <Image alt="" src={more} width={20} height={20} />
            </div>
            <h1>1,234</h1>
            <h2>{type}</h2>
        </div>
    )
}
