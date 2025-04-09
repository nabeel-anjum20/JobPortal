"use client"

import React, { useState } from 'react'
import CommonCard from '../CommonCard/CommonCard'
import { Rocket } from 'lucide-react'
import { Button } from '../ui/button'
import JobApplicants from '../Jobs/JobListing/JobApplicants/JobApplicants'

function RecruiterJobCard({jobItem , getJobApplication}) {

  const [showAppicantsDrawer , setShowApplicantsDrawer] = useState(false)
  const [currentCanidateDetails , setCurrentCanidateDetails] = useState(null)
  const [currentCanidateDetailsModal , setCurrentCanidateDetailsModal] = useState(false)
  
  return (
    <>
    <CommonCard
    icon={<Rocket/>}
    title={jobItem?.title}
    footerContent={
        <Button onClick={() => setShowApplicantsDrawer(true)} className=" dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5 cursor-pointer">
          {
            getJobApplication.filter((item) => item.jobID === jobItem?._id).length
          }{""}
          Applicants
        </Button>
      }
    />
    <JobApplicants
    showAppicantsDrawer={showAppicantsDrawer}
    setShowApplicantsDrawer={setShowApplicantsDrawer}
    currentCanidateDetails={currentCanidateDetails}
    setCurrentCanidateDetails={setCurrentCanidateDetails}
    currentCanidateDetailsModal={currentCanidateDetailsModal}
    setCurrentCanidateDetailsModal={setCurrentCanidateDetailsModal}
    getJobApplication={
      getJobApplication.filter((item) => item.jobID === jobItem?._id)
    }
    />
    </>
  )
}

export default RecruiterJobCard