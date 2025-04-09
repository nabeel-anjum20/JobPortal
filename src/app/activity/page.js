import Activity from '@/components/Activity/Activity'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { fetchJobApplicationCanidate, fetchJobCanidateActions } from '../action'

async function page() {

    const user = await currentUser()
    const getJobList = await fetchJobCanidateActions()
    const getJobApplication = await fetchJobApplicationCanidate(user?.id)

  return (
    <>
    <Activity
    getJobList={JSON.parse(JSON.stringify(getJobList))}
    getJobApplication={JSON.parse(JSON.stringify(getJobApplication))}
    />
    </>
  )
}

export default page