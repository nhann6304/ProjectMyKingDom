import { FindAllCompanies } from "@/apis/modules/companies/companies.api";
import { ESortOptions } from "@/enums/ESort.enum";
import { IPageProps } from "@/interfaces/common";
import { ICompany } from "@/interfaces/models/ICompany";
import TrademarkLayout from "@/layouts/public/trademark/TrademarkLayout";

export default async function TrademarkPage({ searchParams }: IPageProps) {
    if (searchParams && !searchParams?.isDeleted) searchParams.isDeleted = false;
    if (!searchParams?.fields) {
        searchParams.fields = [
            "company_name",
            "company_thumb",
            "company_slug"
        ] as Array<keyof ICompany>;
    }

    const sort: { field: string; order: string } = {
        field: "company_name",
        order: ESortOptions.NAME_ASC
    }
    searchParams.sort = JSON.stringify({ sort });
    const companies = await FindAllCompanies(searchParams);
    return (
        <TrademarkLayout companyList={companies} />
    );
}
