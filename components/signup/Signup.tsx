"use client";

import useAuth from "@/context/useAuth";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {FormEvent, useState} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createUserAccount, resUserExists } from "@/actions/auth";


const Signup = () => {

    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    })
    const [error, setError] = useState("")

    // const {setAuthStatus} = useAuth();

    const create = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    if (!formData.name || !formData.email || !formData.password) {
        setError("All fields are necessary.");
        return;
      }
  
      try {
        const resUser = await resUserExists(formData.email);
        console.log("res when resUser when check userExixts user", resUser);
        const { user } = await resUser.json();
  
        if (user) {
          setError("User already exists.");
          return;
        }
  
        const res = await createUserAccount(formData);
        console.log("res when create user", res);
        if (res.ok) {
          const form:any = e.target;
          form.reset();
          router.push("/");
        } else {
          console.log("User registration failed.");
        }
      } catch (error) {
        console.log("Error during registration: ", error);
      }
    }

    return(
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-200/50 rounded-xl p-10`}>
                <div className="mb-2 flex justify-center">
                        <UserCircle size={40} color="green"/>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                    Register Account
                </h2>
               
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={create} className="mt-8">
                {/* <form className="mt-8"> */}
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="name" className="text-base font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <Input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Full Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <Input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
                                size={'lg'}
                                variant={'default'}
                                type="submit"
                                className="inline-flex w-full items-center justify-center px-3.5 py-2.5 font-semibold leading-7 "
                            >
                                Create Account
                            </Button>
                        </div>
                    </div>
                </form>
                <p className="mt-2 text-center text-sm text-gray-600 font-light">
                    Already have an account?&nbsp;
                    <Link
                        href="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;