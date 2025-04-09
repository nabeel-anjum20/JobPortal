"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CommonFormElement from '../CommonFormElement/CommonFormElement'
import { initialPostNewJobFormData, postNewJobFormControls } from '@/utils'
import { createJobAction } from '@/app/action'
import { toast } from 'sonner'


function PostNewJob({ user, profileInfo, getJobApplication }) {


  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormdata] = useState(initialPostNewJobFormData)



  useEffect(() => {
    setFormdata({
      ...formData,
      companyName: profileInfo?.data?.recruiterInfo?.companyName
    })
  }, [])


  const createJob = async () => {
    await createJobAction({
      ...formData,
      recruiterId: user?.id,
      applicant: []
    },

      "/jobs"

    )

    setOpenDialog(false)
    setFormdata(initialPostNewJobFormData)
  }


  const handleOpenDialog = () => {
    if (!profileInfo?.data?.isPremiumUser && getJobApplication.length >= 1) {
      toast(
        "Buy MemberShip For Creating More Jobs",
      )
      return
    }

    setOpenDialog(true)
  }


  return (
    <>
      <Button onClick={handleOpenDialog} className={"disabled opacity-60 h-11 flex item-center justify-center px-5 cursor-pointer"}>
        Post New Job
      </Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog} >
        <DialogContent className={"sm:max-w-screen h-[600px] overflow-auto"}>
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <div className='grid gap-4 p-4'>
              <CommonFormElement
                action={createJob}
                buttonText={"Add"}
                formControls={postNewJobFormControls}
                formData={formData}
                setFormData={setFormdata}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PostNewJob