"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu, Moon } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";


function Header({user , profileInfo}) {

    const menuItems = [
        {
            label: "Home",
            path: "/",
            show: true,
        },
        {
            label: "Sign Up",
            path: "/sign-up",
            show: !user?.id,  
        },
        {
            label: "Sign In",
            path: "/sign-in",
            show: !user?.id,  
        },
        {
            label: "Activity",
            path: "/activity",
            show: user?.id && profileInfo?.data?.role === "canidate",
        },
        {
            label: "Jobs",
            path: "/jobs",
            show: user?.id && profileInfo?.data,
        },
        {
            label: "Membership",
            path: "/membership",
            show: user?.id && profileInfo?.data,
        },
        {
            label: "Account",
            path: "/account",
            show: user?.id && profileInfo?.data,
        },
    ];
    return (
        <>
            <header className="flex h-16 w-full shrink-0 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden">
                            <Menu />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left">
                        <Link className="mr-6 hidden lg:flex" href={"#"}>
                            <h3>HireSphere</h3>
                        </Link>
                        <div className="grid gap-2 py-6">
                            {menuItems.map((item, i) => {
                                if(item.show){
                                    return (
                                        <Link
                                            href={item.path}
                                            key={i}
                                            className="flex w-full items-center py-2 px-3 text-lg font-semibold"
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                }
                            })}
                            <Moon className="cursor-pointer" fill="dark" />
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>
                </Sheet>
                <Link className="hidden font-bold text-3xl lg:flex mr-6" href={"#"}>
                    <h3>HireSphere</h3>
                </Link>
                <nav className="ml-auto hidden lg:flex gap-6 mr-6 items-center">
                    {menuItems.map((item, i) => {
                        if(item.show){
                            return (
                                <Link
                                    key={i}
                                    href={item.path}
                                    className="group inline-flex h-9 w-max items-center rounded-md px-4 py-2 text-sm font-medium"
                                >
                                    {item.label}
                                </Link>
                            );
                        }
                    })}
                    <Moon className="cursor-pointer" fill="dark" />
                    <UserButton afterSignOutUrl="/" />
                </nav>
            </header>
        </>
    )
}

export default Header