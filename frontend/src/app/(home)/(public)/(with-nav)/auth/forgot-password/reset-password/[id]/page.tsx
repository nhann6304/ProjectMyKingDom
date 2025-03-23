import { IPageProps } from "@/interfaces/common/IBaseResponse.interface";
import ResetPasswordLayout from "@/layouts/public/auth/forgot-password/reset-password/ResetPasswordLayout";

export default function ResetPasswordPage({ params, searchParams }: IPageProps) {
    const userId = params.id;

    return (
        <ResetPasswordLayout userId={userId} />
    )
}
