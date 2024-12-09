import { Response } from "express";

export class CookieHelper {
    static setCookieToken({ name, data, res, }: { name: string, data: string, res: Response }) {
        return res.cookie(name, data, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 24 * 60 * 60 * 1000  // 15 ngày
        })
    }
    static clearCookie({ name, res }: { name: string, res: Response }) {
        return res.clearCookie(name, {
            httpOnly: true,
            secure: true
        });
    }
}
