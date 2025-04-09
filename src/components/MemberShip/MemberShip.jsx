"use client"

import { memberShipPlan } from '@/utils'
import { Rocket } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import CommonCard from '../CommonCard/CommonCard'
import { updateProfileAction } from '@/app/action'

function MemberShip({user , profileInfo}) {


  const handleCreateMemberShip = async(getCurrentPlan) => {
     await updateProfileAction(
                profileInfo?.data?.role === "recruiter" ?
                    {
                        _id: profileInfo?.data?._id,
                        userId: profileInfo?.data?.userId,
                        role: profileInfo?.data?.role,
                        email: profileInfo?.data?.email,
                        isPremiumUser:true,
                        memberShipType: getCurrentPlan.heading,
                        memberShipStartDate: new Date().toString(),
                        memberShipEndDate: new Date().getFullYear() + Number.parseInt(
                          getCurrentPlan?.type === "basic" ? 1 : getCurrentPlan?.type === "teams" ? 2 :5
                        ) , 
                        recruiterInfo: profileInfo?.data?.recruiterInfo
                            
                    } : {
                      _id: profileInfo?.data?._id,
                      userId: profileInfo?.data?.userId,
                      role: profileInfo?.data?.role,
                      email: profileInfo?.data?.email,
                      isPremiumUser:true,
                      memberShipType: getCurrentPlan.heading,
                      memberShipStartDate: new Date().toString(),
                      memberShipEndDate: new Date().getFullYear() + Number.parseInt(
                        getCurrentPlan?.type === "basic" ? 1 : getCurrentPlan?.type === "teams" ? 2 :5
                      ) , 
                      canidateInfo: profileInfo?.data?.canidateInfo
       
                    } , 
    
                    "/membership"
            )
  }

  return (
    <>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-baseline border-b pb-6 pt-24 justify-between'>
          <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900">
            Choose Your Plan
          </h1>
          <Button className={"disabled:opacity-65 flex h-11 items-center justify-center px-5 cursor-pointer"}>
            {
              profileInfo?.data?.memberShipType
            }
          </Button>
        </div>
        <div className='py-20 pb-24 pt-6'>
          <div className='container mx-auto space-y-8'>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-8'>
              {
                memberShipPlan.map((item , index)=>{
                  const t = profileInfo?.data?.memberShipType
                  return(
                    <CommonCard 
                    icon={<Rocket/>}
                    title={`$ ${item.price} /year`} 
                    key={index}
                    description={item.heading}
                    footerContent={
                      <Button
                      disabled={
                        index === 0 && (t === `Tier 1` || t === `Tier 2` || t === `Tier 3`) ? true :
                        index === 1 && (t === `Tier 2` || t === `Tier 3`) ? true : index === 2 && (t === `Tier 3`) ? true : false
                      }
                      onClick={() => handleCreateMemberShip(item)}
                      className={"disabled:opacity-65 flex h-11 items-center justify-center px-5 cursor-pointer"}>
                        Go Premium
                      </Button>
                    }
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MemberShip