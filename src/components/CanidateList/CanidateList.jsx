"use client"

import { fetchCanidateDetailsById, updateJobApplication } from '@/app/action'
import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import { createClient } from '@supabase/supabase-js'



const supabaseClient = createClient('https://bhvnwjrgeslmkjtevnxq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodm53anJnZXNsbWtqdGV2bnhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDg1ODMsImV4cCI6MjA1ODM4NDU4M30.6wJ52nkd0UJAqxpzq1gr5_wm_q5NC_Fn7oVKqBu_TpU')

function CanidateList({
    currentCanidateDetails,
    setCurrentCanidateDetails,
    currentCanidateDetailsModal,
    setCurrentCanidateDetailsModal,
    getJobApplication
}) {

    const handleFetchCanidateDetails = async (JobApplication) => {
        const result = await fetchCanidateDetailsById(
            JobApplication?.candidateUserID
        )
        if (result) {
            setCurrentCanidateDetails(result)
            setCurrentCanidateDetailsModal(true)
        }
    }

    console.log(currentCanidateDetails)
   

    const updateJobApplicationStatus = async(currentStatus) => {
        console.log(currentStatus)
        let cpyJobApplication = [...getJobApplication]
        const indexJobApplication = cpyJobApplication.findIndex((JobApplicants)=> JobApplicants.candidateUserID === currentCanidateDetails?.data?.userId)
        let  data = cpyJobApplication[indexJobApplication]
        data.status = data.status.concat(currentStatus)

        await updateJobApplication(data , "/jobs")
    }

    const handleResumePreview = async () => {
        const { data  }  =  supabaseClient.storage
          .from("jobpotal")
          .getPublicUrl(currentCanidateDetails?.data?.canidateInfo?.resume
          )
          const a  = document.createElement("a")
          a.href = data?.publicUrl
          console.log(a)
          a.setAttribute("download", "Resume.pdf")
          a.setAttribute("target", "_blank")
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)    
      };


    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-10'>
                {
                    getJobApplication && getJobApplication.length &&
                    getJobApplication.map((JobApplication) => {
                        return <div className='bg-white shadow-lg  max-w-sm  w-full rounded-lg overflow-hidden mx-auto mt-4'>
                            <div className='px-4 my-6 flex justify-between items-center'>
                                <h3 className="text-lg font-bold dark:text-black">
                                    {JobApplication?.name}
                                </h3>
                                <Button
                                    onClick={() => handleFetchCanidateDetails(JobApplication)}
                                >
                                    View profile
                                </Button>
                            </div>
                        </div>
                    })
                }
            </div>
            <Dialog
                open={currentCanidateDetailsModal}
                onOpenChange={setCurrentCanidateDetailsModal}
            >
                <DialogContent>
                    <div>
                        <h1 className="text-2xl font-bold dark:text-white text-black">
                            {currentCanidateDetails?.data?.canidateInfo?.name},{" "}
                            {currentCanidateDetails?.data?.email}
                        </h1>
                        <p className="text-xl mt-3 font-medium dark:text-white text-black">
                            {currentCanidateDetails?.data?.canidateInfo?.currentCompany}
                        </p>
                        <p className="text-sm mt-3 font-normal dark:text-white text-black">
                            {currentCanidateDetails?.data?.canidateInfo?.currentJobLocation}
                        </p>
                        <p className="dark:text-white">
                            Total Experience:
                            {currentCanidateDetails?.data?.canidateInfo?.totalExperience}
                        </p>
                        <p className="dark:text-white">
                            Salary: {currentCanidateDetails?.data?.canidateInfo?.currentSalary}{" "}
                        </p>
                        <p className="dark:text-white">
                            Notice Period:{" "}
                            {currentCanidateDetails?.data?.canidateInfo?.noticePeriod}
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <h1 className="dark:text-white mt-5">Previous Companies:</h1>
                            <div className="flex flex-wrap items-center gap-4 mt-6">
                                {currentCanidateDetails?.data?.canidateInfo?.previousCompanies
                                    .split(",")
                                    .map((skillItem) => (
                                        <div className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                            <h2 className="text-[13px]  dark:text-black font-medium text-white">
                                                {skillItem}
                                            </h2>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-6">
                            {currentCanidateDetails?.data?.canidateInfo?.skills
                                .split(",")
                                .map((skillItem) => (
                                    <div className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                                        <h2 className="text-[13px] dark:text-black font-medium text-white">
                                            {skillItem}
                                        </h2>
                                    </div>
                                ))}
                        </div>
                        <div className='flex gap-3 mt-4'>
                            <Button
                              className=" disabled:opacity-65 flex h-11 items-center justify-center px-5 cursor-pointer"
                              onClick={handleResumePreview}
                            >Resume</Button>
                            <Button
                                onClick={() => updateJobApplicationStatus("Selected")}
                                className=" disabled:opacity-65 flex h-11 items-center justify-center px-5 cursor-pointer"
                                disabled={
                                    getJobApplication.find((item) => item.candidateUserID === currentCanidateDetails?.data?.userId)?.status.includes("Selected") || 
                                    getJobApplication.find((item) => item.candidateUserID === currentCanidateDetails?.data?.userId)?.status.includes("Rejected") ? true : false 
                                }
                            >
                                {
                                    getJobApplication.find((item) => item.candidateUserID === currentCanidateDetails?.data?.userId)?.status.includes("Selected") ? "Selected" : "Select"
                                }
                            </Button>
                            <Button
                            onClick={() => updateJobApplicationStatus("Rejected")}
                            className=" disabled:opacity-65 flex h-11 items-center justify-center px-5 cursor-pointer"
                            disabled={
                                getJobApplication.find((item) => item.candidateUserID === currentCanidateDetails?.data?.userId)?.status.includes("Selected") || 
                                getJobApplication.find((item) => item.candidateUserID === currentCanidateDetails?.data?.userId)?.status.includes("Rejected") ? true : false 
                            }
                            >
                                {
                                    getJobApplication.find((item) => item.candidateUserID === currentCanidateDetails?.data?.userId)?.status.includes("Rejected") ? "Rejected" : "Reject"
                                }
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CanidateList