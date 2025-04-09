"use client"

import React, { useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import CommonCard from '../CommonCard/CommonCard'
import { Rocket } from 'lucide-react'

function Activity({ getJobList, getJobApplication }) {
    const status = ["Applied", "Selected", "Rejected"]
    const [currenTab, setcurrentTab] = useState(status[0])

    return (
        <div className='max-w-7xl mx-auto px-4'>
            <Tabs value={currenTab} onValueChange={setcurrentTab}>
                <div className='flex items-baseline justify-between border-b pb-6 pt-24'>
                    <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
                        Your Activity
                    </h1>
                    <TabsList>
                        {
                            status.map((s , index) => {
                                return <TabsTrigger value={s} key={index}>{s}</TabsTrigger>
                            })
                        }
                    </TabsList>
                </div>

                <div className='pb-24 pt-6'>
                    <div className='container mx-auto space-y-6 p-0 '>
                        <div className='flex flex-col '>
                            {
                                status.map((s , index)=>{
                                    return <TabsContent value={s} key={index} className={"space-y-6"}>
                                        {
                                            getJobList.filter((jobItem)=>
                                            getJobApplication.filter((jobApplication)=>
                                                jobApplication.status[
                                                    jobApplication.status.length -1
                                                ] === s
                                            ).findIndex((finalItem)=>
                                            jobItem?._id === finalItem?.jobID
                                            ) > -1
                                            ).map((item)=>{
                                                return  <CommonCard
                                                key={item._id}
                                                icon={<Rocket />}
                                                title={item?.title}
                                                description={item?.companyName}
                                            />
                                            })
                                        }
                                    </TabsContent>
                                })
                            }
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    )
}

export default Activity
