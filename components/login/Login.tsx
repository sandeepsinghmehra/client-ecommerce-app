"use client";

import useAuth from "@/context/useAuth";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {FormEvent, useState} from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Login = () => {
    const router = useRouter()
    const {setAuthStatus} = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            // const session = await appwriteService.login(formData);
            // if (session) {
            //     setAuthStatus(true)
            //     router.push("/profile")
            // }
                
            
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-200/50 rounded-xl p-10`}>
                <div className="mb-2 flex justify-center">
                        <UserCircle size={40} color="green"/>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                    Login
                </h2>
                
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={login} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <Input
                                    className="h-10 w-full"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                    placeholder="Email"
                                    id="email"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-base font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <Input
                                    className="flex h-10 w-full"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    id="password"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                variant={'secondary'}
                                className="rounded-3xl text-teal-900 hover:bg-teal-900 hover:text-white my-2"
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </form>
                <p className="mt-2 text-center text-sm text-gray-600 font-light">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        href="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}


export default Login;