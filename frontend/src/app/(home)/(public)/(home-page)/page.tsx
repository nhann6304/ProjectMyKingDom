"use client"

import { useUserCurrent } from "@/stores/userCurrent/userCurrent"

export default function HomePage() {
    const { userCurrent } = useUserCurrent();
    return (
        <>
            HomePage {userCurrent.user.user_email}
        </>
    )
}
