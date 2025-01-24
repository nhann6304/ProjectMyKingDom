import "./style.scss"
import InputForm from "@/app/components/inputs/input-form"
export default function LoginLayout() {
    return (
        <section className="login-container container-pub">
            <div className="box-login">
                <h1 className="login-title">Đăng nhập</h1>
                <InputForm />
            </div>
        </section>
    )
}
