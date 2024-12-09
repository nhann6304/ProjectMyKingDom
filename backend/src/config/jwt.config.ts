import { JwtModule } from "@nestjs/jwt"

export const jwtConfig = async () => {
    const registerJwt = JwtModule.registerAsync({
        useFactory: async () => ({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_TIME_END
            },
        }),
    })
    return registerJwt
}