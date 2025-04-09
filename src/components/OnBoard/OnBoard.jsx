"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { candidateOnBoardFormControl, initialCandidateFormData, initialRecruiterFormData, recruiterOnBoardFormControl } from "@/utils"

import React, { useEffect, useState } from 'react'
import CommonFormElement from "../CommonFormElement/CommonFormElement"
import { useUser } from "@clerk/nextjs"
import { createProfileAction } from "@/app/action"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"


const supabaseClient = createClient('https://bhvnwjrgeslmkjtevnxq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodm53anJnZXNsbWtqdGV2bnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDg1ODMsImV4cCI6MjA1ODM4NDU4M30.6wJ52nkd0UJAqxpzq1gr5_wm_q5NC_Fn7oVKqBu_TpU')


    
function OnBoard() {

    const [canidateFormData, setcanidateFormData] = useState(initialCandidateFormData)
    const [recruiterFormData, setrecruiterFormData] = useState(initialRecruiterFormData)

    const [currentTab, setcurrentTab] = useState("canidate")

    const { user } = useUser()


    const router = useRouter()

    const [file , setFile] = useState(null)

    const handleOnChange = (event) => {
        console.log("file change")
        console.log(event.target.files[0])
        setFile(event.target.files[0])
    }

    
    const handleOnSupabaseFileUpload = async () => {
        const { data, error } = await supabaseClient.storage
          .from("jobpotal")
          .upload(`public/${file.name}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

          if(data){
            setcanidateFormData({...canidateFormData , resume:data.path})
          }
      };


      useEffect(()=>{
        if(file){
            handleOnSupabaseFileUpload()
        }
      },[file])


    const handleCreateProfile = async () => {
        const data = currentTab === "canidate" ? {
            canidateInfo: canidateFormData,
            role: "canidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        } : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress
        }

        await createProfileAction(data, "/OnBoard")
        router.push("/")
    }


    return (
        <>
            <div className="bg-white">
                <Tabs className="w-[400px] mt-20" value={currentTab} onValueChange={setcurrentTab}>
                    <div className="w-full">
                        <div className="flex border-b justify-baseline item-center items-baseline pb-4">
                            <h1 className="text-3xl text-gray-900 font-bold">Welcome To OnBoard</h1>
                            <TabsList>
                                <TabsTrigger value="canidate">Canidate</TabsTrigger>
                                <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                            </TabsList>
                        </div>
                    </div>
                    <TabsContent value="canidate">
                        <CommonFormElement
                            formData={canidateFormData}
                            setFormData={setcanidateFormData}
                            buttonText={"OnBoard As Canidate"}
                            action={handleCreateProfile}
                            formControls={candidateOnBoardFormControl}
                            handleFileChange={handleOnChange}
                        />
                    </TabsContent>
                    <TabsContent value="recruiter">
                        <CommonFormElement
                            formData={recruiterFormData}
                            setFormData={setrecruiterFormData}
                            buttonText={"OnBoard As Recruiter"}
                            action={handleCreateProfile}
                            formControls={recruiterOnBoardFormControl}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default OnBoard