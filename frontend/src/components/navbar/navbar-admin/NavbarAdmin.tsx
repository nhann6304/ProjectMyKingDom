import Image from "next/image";
import "./style.scss"
import InputSearch from "../../inputs/input-search";
//
import search from "@/assets/common/icons/search.png"
import message from "@/assets/common/icons/message.png"
import announcement from "@/assets/common/icons/announcement.png"
import avatar from "@/assets/common/icons/avatar.png"
export default function NavbarAdmin() {
    return (
        <div className="navbar-admin">
            {/* SEARCH BAR */}
            <div className="box-search">
                <InputSearch />
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
