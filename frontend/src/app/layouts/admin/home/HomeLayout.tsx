import CardUser from "@/app/components/cards/CardUser"
import "./style.scss"
import UserCard from "@/app/components/cards/CardUser"

export default function AdminHomeLayout() {
    return (
        <div className="admin-home-layout">
            {/* LEFT */}
            <div className="w-full admin-home-layout-left">l</div>

            {/* USER CARD */}
            <div className="flex gap-4 justify-between">
                <UserCard type="content" />
                <UserCard type="product" />
                <UserCard type="admin" />
                <UserCard type="mentor" />
            </div>

            {/* RIGHT */}
            <div className="w-full admin-home-layout-right">r</div>
        </div>

    )
}
