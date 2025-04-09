"use client"

import CanidateJobCard from '@/components/CanidateJobCard/CanidateJobCard'
import PostNewJob from '@/components/PostNewJob/PostNewJob'
import RecruiterJobCard from '@/components/RecruiterJobCard/RecruiterJobCard'
import { createUrlQuery, filterMenuArrayData } from '@/utils'
import React, { useEffect, useState } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Label } from '@/components/ui/label'
import { useRouter, useSearchParams } from 'next/navigation'

function JobListing({ user, profileInfo, getJobList, getJobApplication, jobFilter }) {


  
  const filterJob = filterMenuArrayData.map((item) => ({
    id: item.id,
    name: item.label,
    option: [...new Set(jobFilter.map((filterItem) => filterItem[item?.id]))]
   
  }))

  const [filterParams , setFilterParams] = useState({})

  const searchParams = useSearchParams()

  const router = useRouter()

  const handleOnFilter = (getSectionId , getcurrentOptions) => {
    let cpyFilterParams = {...filterParams}

    const indexCurrentSectionId = Object.keys(filterParams).indexOf(getSectionId)

    if(indexCurrentSectionId == -1){
      cpyFilterParams = {
        ...cpyFilterParams,
        [getSectionId]:[getcurrentOptions]
      }
    }else{
      const indexCurrentOptions = cpyFilterParams[getSectionId].indexOf(getcurrentOptions)
      if(indexCurrentOptions == -1){
        cpyFilterParams[getSectionId].push(getcurrentOptions)
      }else{
        cpyFilterParams[getSectionId].splice(indexCurrentOptions , 1)
      }
    }

    setFilterParams(cpyFilterParams)
    sessionStorage.setItem("filters" , JSON.stringify(cpyFilterParams))
  }


  useEffect(()=>{
    if(filterParams && Object.keys(filterParams).length > 0){
      let url = "";
      url = createUrlQuery({
        dataToAdd:filterParams,
        params:searchParams.toString()
      })
     
      router.push(url , {scroll:false})
    }
  },[filterParams , searchParams])



  return (
    <>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-baseline dark:border-white justify-between border-b border-gray-200 pb-2 pt-20'>
          <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900">
            {
              profileInfo?.data?.role === "canidate" ?

                "Explore All Jobs" : "Job Dashboard"
            }
          </h1>
          <div className='flex item-center'>
            {
              profileInfo?.data?.role === "canidate" ?

                (
                  <Menubar>
                    {
                      filterJob.map((item, index) => {
                        return <MenubarMenu key={index}>
                          <MenubarTrigger>{item.name}</MenubarTrigger>
                          <MenubarContent>
                        {item.option.map((opt, index) => {
                          return (
                            <MenubarItem key={index} onClick={() => handleOnFilter(item?.id , opt)}>
                              <div className={`h-4 w-4 dark:border-white border rounded border-gray-900
                                
                                ${filterParams && Object.keys(filterParams).length > 0 &&
                                   filterParams[item?.id] && filterParams[item?.id].indexOf(opt) > -1
                                   ? "bg-black" : "bg-white"

                                }
                                
                                `}></div>
                              <Label
                                className={
                                  "ml-3 dark:text-white cursor-pointer text-sm text-gray-600"
                                }
                              >
                                {opt}
                              </Label>
                            </MenubarItem>
                          );
                        })}
                      </MenubarContent>
                        </MenubarMenu>
                      })
                    }

                  </Menubar>
                )

                :
                (
                  <PostNewJob user={user} profileInfo={profileInfo} getJobApplication={getJobApplication} />

                )
            }
          </div>
        </div>
        <div className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div className="lg:col-span-4">
              <div className="container mx-auto p-0 space-y-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                  {
                    getJobList && getJobList?.length && getJobList?.map((job, index) => {
                      return profileInfo?.data?.role === "recruiter" ?
                        <RecruiterJobCard jobItem={job} key={index} getJobApplication={getJobApplication} /> : <CanidateJobCard jobItem={job} key={index} profileInfo={profileInfo} getJobApplication={getJobApplication} />
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobListing