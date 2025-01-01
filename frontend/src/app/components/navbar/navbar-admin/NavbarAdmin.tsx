import Image from "next/image";
import search from "@/app/assets/common/icons/search.png"
import message from "@/app/assets/common/icons/message.png"
import announcement from "@/app/assets/common/icons/announcement.png"
import avatar from "@/app/assets/common/icons/avatar.png"
import "./style.scss"
export default function NavbarAdmin() {
    return (
        <div className="navbar-admin">
            {/* SEARCH BAR */}
            <div className="search-bar">
                <Image src={search} alt="search" />
                <input type="text" placeholder="Search...." />
            </div>

            {/* ICONS AND USERS */}
            <div className="icon-container">
                <div className="icon">
                    <Image src={message} alt="message" />
                </div>

                <div className="icon with-notification">
                    <Image src={announcement} alt="announcement" />
                    <div className="notification-badge">1</div>
                </div>

                <div className="user-info">
                    <span className="user-name">John Doe</span>
                    <span className="user-role">Admin</span>
                </div>

                <Image src={avatar} alt="avatar" className="avatar" />
            </div>
        </div>

    )
}
