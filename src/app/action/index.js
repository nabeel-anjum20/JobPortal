"use server"

import { revalidatePath } from 'next/cache'
import { connectDb } from '../database/connectDb'
import ProfileModel from '../Model/ProfileModel'
import JobModel from '../Model/JobModel'
import ApplicationModel from '../Model/ApplicationModel'


export const createProfileAction = async (formData, pathToRevalidate) => {
    try {
        await connectDb()
        const data = await ProfileModel.create(formData)
        if (data) {
            return {
                success: true,
                message: "profile created successfully",
                data
            }
        } else {
            return {
                success: false,
                message: "error occured while profile created",
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    } finally {
        revalidatePath(pathToRevalidate)
    }
}


export const fetchProfileAction = async (userId) => {
    try {
        await connectDb()

        const result = await ProfileModel.findOne({ userId })

        if (result) {
            return {
                success: true,
                message: "profile fetch successfully",
                data: result
            }
        }


    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}



export const createJobAction = async (formData, pathToRevalidate) => {
    try {
        await connectDb()
        const data = await JobModel.create(formData)
        console.log(data)
        if (data) {
            return {
                success: true,
                message: "job created successfully",
                data
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    } finally {
        revalidatePath(pathToRevalidate)
    }
}


export const fetchJobRecruiterActions = async (userid) => {
    try {
        await connectDb()
        const result = await JobModel.find({ recruiterId: userid })
        if (result) {
            return result
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}


export const fetchJobCanidateActions = async (filterParams = {}) => {
    try {
        await connectDb()

        const updateParams = {}

        Object.keys(filterParams).forEach((filterKey)=>{
            updateParams[filterKey] = {$in:filterParams[filterKey].split(",")}
        })

        console.log(JSON.parse(JSON.stringify(updateParams)))

        const result = await JobModel.find(
            filterParams && Object.keys(filterParams).length > 0 ? updateParams : {}
        )
        if (result) {
            return result
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

export const createJobApplication = async (formData, pathToRevalidate) => {
    try {
        await connectDb()

        const data = await ApplicationModel.create(formData)
        if (data) {
            return {
                success: true,
                message: "application crated successfully",
                data
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    } finally {
        revalidatePath(pathToRevalidate)
    }
}


export const fetchJobApplicationCanidate = async (canidateId) => {
    try {
        await connectDb()
        const result = await ApplicationModel.find({ candidateUserID: canidateId })
        if (result) {
            return result
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}

export const fetchJobApplicationRecruiter = async (recruiterId) => {
    try {
        await connectDb()
        const result = await ApplicationModel.find({ recruiterUserID: recruiterId })
        if (result) {
            return result
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}


export const fetchCanidateDetailsById = async (canidateId) => {
    try {
        await connectDb()
        const data = await ProfileModel.findOne({ userId: canidateId })
        if (data) {
            return {
                success: true,
                message: "canidatedetails fetch successfully",
                data
            }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}


export const updateJobApplication = async (data, pathToRevalidate) => {
    try {
        await connectDb()

        const { recruiterUserID,
            name,
            candidateUserID,
            status,
            jobID,
            jobAppliedDate,
            _id
        } = data

        await ApplicationModel.findOneAndUpdate({
            _id: _id,
        },

            {
                recruiterUserID,
                name,
                candidateUserID,
                status,
                jobID,
                jobAppliedDate,
            },

            { new: true }
        )

    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    } finally {
        revalidatePath(pathToRevalidate)
    }
}


export const updateProfileAction = async (data, pathToRevalidate) => {
    try {
        await connectDb()

        const {
            userId,
            role,
            email,
            memberShipType,
            memberShipStartDate,
            memberShipEndDate,
            recruiterInfo,
            canidateInfo,
            _id
        } = data

        await ProfileModel.findOneAndUpdate({
            _id: _id
        },
        {
            userId,
            role,
            email,
            memberShipType,
            memberShipStartDate,
            memberShipEndDate,
            recruiterInfo,
            canidateInfo,
    
        } , 

        {
            new:true
        }
        )
    } catch (error) {
        console.log(error.message)
    }finally{
        revalidatePath(pathToRevalidate)
    }
}

export const createFilterJob = async() => {
    try{
        await connectDb()

        const result = await JobModel.find({})
        return JSON.parse(JSON.stringify(result));
    }catch(error){
        console.log(error.message)
        return{
            success:false,
            message:error.message
        }
    }
}