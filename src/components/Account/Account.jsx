"use client"


import { updateProfileAction } from '@/app/action'
import { candidateOnBoardFormControl, initialCandidateFormData, initialRecruiterFormData, recruiterOnBoardFormControl } from '@/utils'
import React, { useEffect, useState } from 'react'
import CommonFormElement from '../CommonFormElement/CommonFormElement'

function Account({ user, profileInfo }) {

    const [canidateFormData, setcanidateFormData] = useState(initialCandidateFormData)
    const [recruiterFormData, setrecruiterFormData] = useState(initialRecruiterFormData)


    useEffect(() => {
        if (profileInfo?.data?.role === "recruiter") {
            setrecruiterFormData(profileInfo?.data?.recruiterInfo)
        }

        if (profileInfo?.data?.role === "canidate") {
            setcanidateFormData(profileInfo?.data?.canidateInfo)
        }
    }, [profileInfo])
    const handleUpdateProfile = async () => {
        await updateProfileAction(
            profileInfo?.data?.role === "recruiter" ?
                {
                    _id: profileInfo?.data?._id,
                    userId: profileInfo?.data?.userId,
                    role: profileInfo?.data?.role,
                    email: profileInfo?.data?.email,
                    memberShipType: profileInfo?.data?.memberShipType,
                    memberShipStartDate: profileInfo?.data?.memberShipStartDate,
                    memberShipEndDate: profileInfo?.data?.memberShipEndDate,
                    recruiterInfo: {
                        ...recruiterFormData
                    }
                } : {
                    _id: profileInfo?.data?._id,
                    userId: profileInfo?.data?.userId,
                    role: profileInfo?.data?.role,
                    email: profileInfo?.data?.email,
                    memberShipType: profileInfo?.data?.memberShipType,
                    memberShipStartDate: profileInfo?.data?.memberShipStartDate,
                    memberShipEndDate: profileInfo?.data?.memberShipEndDate,
                    canidateInfo: {
                        ...canidateFormData,
                        resume: profileInfo?.data?.canidateInfo?.resume
                    }
                } , 

                "/account"
        )
    }

    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-baseline dark:border-white justify-between pb-6 border-b pt-24'>
                    <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
                        Account Details
                    </h1>
                </div>
                <div className='py-20 pb-24 pt-6'>
                    <CommonFormElement
                        action={handleUpdateProfile}
                        buttonText={"Update Profile"}
                        formControls={
                            profileInfo?.data?.role === "canidate" ?

                                candidateOnBoardFormControl.filter((formControl) => formControl.name !== "resume") :

                                recruiterOnBoardFormControl
                        }
                        formData={
                            profileInfo?.data?.role === "canidate" ?

                                canidateFormData : recruiterFormData
                        }
                        setFormData={
                            profileInfo?.data?.role === "canidate" ?

                                setcanidateFormData : setrecruiterFormData
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default Account