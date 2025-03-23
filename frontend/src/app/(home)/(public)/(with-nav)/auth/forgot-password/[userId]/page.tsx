import { IPageProps } from "@/interfaces/common/IBaseResponse.interface";
import OtpLayout from "@/layouts/public/auth/forgot-password/otp/OtpLayout";

export default function OtpPage({ params, searchParams }: IPageProps) {

    const userId = params.userId;

    return (
        <OtpLayout userId={userId} />
    )
}
