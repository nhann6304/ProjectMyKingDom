"use client";
import "./style.scss";
import { Button } from "antd";
import ButtonName from "@/components/buttons/ButtonName";
import andrybird from "@/assets/common/icon-public/jpg/ANGRY-company.png";
import Image from "next/image";
import Link from "next/link";
import { FindAllCompanies } from "@/apis/modules/companies/companies.api";
import { useState } from "react";
import { ICompany } from "@/interfaces/models/ICompany";

interface IProps {
    companyList: Awaited<ReturnType<typeof FindAllCompanies>>;
}

export default function TrademarkLayout({ companyList }: IProps) {
    const [companies, setCompanies] = useState<ICompany[] | []>(
        companyList?.metadata?.items || []
    );

    const [valueButton, setValueButton] = useState<string>("all"); // Mặc định là "all"

    const handleClickTagName = (tag: string) => {
        setValueButton(tag);
    };

    const handleClickAll = () => {
        setValueButton("all");
    };

    return (
        <div className="trademark-container container-pub">
            <header>
                <span className="trademark-count">
                    {companyList?.metadata?.totalItems} thương hiệu
                </span>
            </header>

            <div className="trademark-content">
                <div className="filter-box">
                    <ButtonName
                        title="Tất cả"
                        isActive={valueButton === "all"}
                        onClick={handleClickAll}
                    />

                    {Object.entries(companies).map(([groupKey], index) => (
                        <ButtonName
                            key={index}
                            title={groupKey}
                            isActive={valueButton === groupKey}
                            onClick={handleClickTagName}
                        />
                    ))}
                </div>

                <div className="filter-item">
                    {valueButton === "all" ? (
                        Object.entries(companies).map(([groupKey, company], index) => {
                            const companyArray = company as unknown as ICompany[];
                            return (
                                <div className="filter-child" key={index}>
                                    <ButtonName disabled={true} title={groupKey} />
                                    <div className="box-list-trademark">
                                        {companyArray.map((val, idx) => (
                                            <Link key={idx} href={`products/${val.company_slug}`}>
                                                <Image
                                                    height={54}
                                                    width={108}
                                                    src={val?.company_thumb?.img_url || ""}
                                                    alt={val?.company_thumb?.img_alt || ""}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        Object.entries(companies)
                            .filter(([groupKey]) => groupKey === valueButton)
                            .map(([groupKey, company], index) => {
                                const companyArray = company as unknown as ICompany[];
                                return (
                                    <div className="filter-child" key={index}>
                                        <ButtonName disabled={true} title={groupKey} />
                                        <div className="box-list-trademark">
                                            {companyArray.map((val, idx) => (
                                                <Link key={idx} href={"#"}>
                                                    <Image
                                                        height={54}
                                                        width={108}
                                                        src={val?.company_thumb?.img_url || ""}
                                                        alt={val?.company_thumb?.img_alt || ""}
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                    )}
                </div>
            </div>
        </div>
    );
}
