import { Button } from "antd";
import "./style.scss";
import ButtonCommon from "@/components/buttons/ButtonCommon";
import ButtonName from "@/components/buttons/ButtonName";
import andrybird from "@/assets/common/icon-public/jpg/ANGRY-company.png"
import Image from "next/image";
import Link from "next/link";
export default function TrademarkLayout() {
    const alphabet = [
        'A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'G', 'H',
        'I', 'K', 'L', 'M', 'N', 'O', 'Ô', 'Ơ', 'P', 'Q',
        'R', 'S', 'T', 'U', 'Ư', 'V', 'X', 'Y'
    ];
    return (
        <div className="trademark-container container-pub">
            <header>
                <span className="trademark-count">206 thương hiệu</span>
            </header>

            <div className="trademark-content">
                <div className="filter-box">
                    <ButtonName title="Tất cả" />
                    {alphabet.map((item, index) => (
                        <ButtonName key={index} title={item} />
                    ))}
                </div>


                <div className="filter-item">
                    <div className="filter-child">
                        <ButtonName title="3" />
                        <div className="box-list-trademark">
                            <Link href={"#"}><Image src={andrybird} alt="andrybird" /></Link>
                            <Link href={"#"}><Image src={andrybird} alt="andrybird" /></Link>
                            <Link href={"#"}><Image src={andrybird} alt="andrybird" /></Link>
                            <Link href={"#"}><Image src={andrybird} alt="andrybird" /></Link>
                            <Link href={"#"}><Image src={andrybird} alt="andrybird" /></Link>
                            <Link href={"#"}><Image src={andrybird} alt="andrybird" /></Link>
                            <Link href={"#"}><Image src={andrybird} alt="andrybird" /></Link>
                            <Link href={"#"}><Image src={andrybird} alt="andrybird" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
