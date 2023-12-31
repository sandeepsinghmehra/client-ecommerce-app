"use client";
import Signup from "@/components/signup/Signup";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const SignupPage = () => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (authStatus) {
        router.replace("/profile");
        return <></>;
    }

    return(
        <section className="px-4 py-5 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
            <Signup />
        </section>
    )
}

export default SignupPage;