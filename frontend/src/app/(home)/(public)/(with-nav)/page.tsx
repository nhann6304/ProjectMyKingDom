import "./style.scss"

import HomePage from "./(home-page)/page";

export default function PageLayout() {
    return (
        <div className="public-page">
            <HomePage />
        </div>
    );
}