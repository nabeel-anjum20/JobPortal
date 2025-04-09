"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function HomeButtonControls({user , profileInfo}) {


    const router = useRouter()

  return (
    <>
    <div className='flex space-x-3'>
        <Button 
        onClick={() => {
            if(!user){
                router.push("/sign-up")
            }else{
                router.push("/jobs")
            }
        }}
        className={"flex h-11 items-center justify-center px-5 cursor-pointer"}> 
            {
              user? profileInfo?.data?.role === "canidate" ?
                "Browse Jobs" : "Job Dashboard" : "Find Job"
            }
        </Button>
        <Button 
        
        onClick={() =>
            {
                if(!user){
                    router.push("/sign-up")
                }else{
                    if(profileInfo?.data.role === "recruiter"){
                        router.push("/jobs")
                    }else{
                        router.push("/activity")
                    }
                }
            }
          }
        
        className={"flex h-11 items-center justify-center px-5 cursor-pointer"}>
            {
                user ? profileInfo?.data?.role === "canidate" ?

                "Your Activity":"Post New Job" : "Post New Job"
            }
        </Button>
    </div>
    </>
  )
}

export default HomeButtonControls