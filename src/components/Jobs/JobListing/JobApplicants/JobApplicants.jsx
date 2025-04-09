"use client"

import React from 'react'
import {
    Drawer,
    DrawerContent,

} from "@/components/ui/drawer"
import CanidateList from '@/components/CanidateList/CanidateList'
import { ScrollArea } from '@/components/ui/scroll-area'


function JobApplicants({
    showAppicantsDrawer,
    setShowApplicantsDrawer,
    currentCanidateDetails,
    setCurrentCanidateDetails,
    currentCanidateDetailsModal,
    setCurrentCanidateDetailsModal,
    getJobApplication
}) {
    return (
        <>
            <Drawer open={showAppicantsDrawer} onOpenChange={setShowApplicantsDrawer} >
                <DrawerContent>
                    <ScrollArea className={"h-auto overflow-y-auto"}>
                        <CanidateList
                            currentCanidateDetails={currentCanidateDetails}
                            setCurrentCanidateDetails={setCurrentCanidateDetails}
                            currentCanidateDetailsModal={currentCanidateDetailsModal}
                            setCurrentCanidateDetailsModal={setCurrentCanidateDetailsModal}
                            getJobApplication={getJobApplication}
                        />
                    </ScrollArea>
                </DrawerContent>
            </Drawer>

        </>
    )
}

export default JobApplicants