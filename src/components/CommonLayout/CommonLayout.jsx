"use server"

import React from "react";
import Header from "../Header/Header";
import { currentUser } from "@clerk/nextjs/server";
import { fetchProfileAction } from "@/app/action";
import { Toaster } from "sonner";

async function CommonLayout({ children }) {
    const user = await currentUser() || {}
    const profileInfo =  await fetchProfileAction(user?.id) || {}
    
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Header user={JSON.parse(JSON.stringify(user))}
            profileInfo={JSON.parse(JSON.stringify(profileInfo))}
            />
            <main>{children}</main>
            <Toaster/>
        </div>
    );
}

export default CommonLayout;
