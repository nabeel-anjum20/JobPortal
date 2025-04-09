"use server"

import JobListing from '@/components/Jobs/JobListing/JobListing'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { createFilterJob, fetchJobApplicationCanidate, fetchJobApplicationRecruiter, fetchJobCanidateActions, fetchJobRecruiterActions, fetchProfileAction } from "@/app/action";

async function page({searchParams}) {

  const user = await currentUser()
  const profileInfo =  await fetchProfileAction(user?.id) 


  const serachData = await searchParams

  const getJobList = profileInfo?.data?.role === "recruiter" ? 
  await fetchJobRecruiterActions(user?.id) :
  await fetchJobCanidateActions(serachData)

 
  const getJobApplication = profileInfo?.data?.role === "recruiter" ? 
  await fetchJobApplicationRecruiter(user?.id) :
  await fetchJobApplicationCanidate(user?.id)


  const jobFilter = await createFilterJob()

  return (
    <>
    <JobListing
    user={JSON.parse(JSON.stringify(user))}
    profileInfo={JSON.parse(JSON.stringify(profileInfo))}
    getJobList={JSON.parse(JSON.stringify(getJobList))}
    getJobApplication={JSON.parse(JSON.stringify(getJobApplication))}
    jobFilter={jobFilter}
    />
    </>
  )
}

export default page