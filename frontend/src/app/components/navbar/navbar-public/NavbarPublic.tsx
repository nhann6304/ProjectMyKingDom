import BottomNav from "./bottom-nav/BottomNav";
import TopNavPublic from "./top-nav/TopNav";

export default function NavbarPublic() {
    return (
        <div>
            {/* TOP NAV */}
            <TopNavPublic />
            {/* CENTER NAV */}
            <BottomNav />
            {/* BOTTOM NAV */}
            {/* Bottom Nav Public */}
        </div>
    )
}
