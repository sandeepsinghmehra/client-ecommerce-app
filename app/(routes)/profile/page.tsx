"use client";

import UserInfo from "@/components/userInfo";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
    const router = useRouter();

    return(
        <section className="px-4 py-5 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
            <UserInfo />
        </section>
    )
}


export default ProfilePage;