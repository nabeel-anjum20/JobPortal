import React, { useState } from "react";
import CommonCard from "../CommonCard/CommonCard";
import { Rocket } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { createJobApplication } from "@/app/action";
import { toast } from "sonner";

function CandidateJobCard({ jobItem, profileInfo, getJobApplication }) {
 
  const [showDrawerOpen, setShowDrawerOpen] = useState(false);

  const handleJobApply = () => {

    if (!profileInfo?.data?.isPremiumUser && getJobApplication.length >= 2) {
      toast(
        "Buy MemberShip For Apply More Jobs",
      )
      return
    }

    setShowDrawerOpen(false)
    createJobApplication({
      recruiterUserID: jobItem?.recruiterId,
      name: profileInfo?.data?.canidateInfo?.name,
      email: profileInfo?.data?.email,
      candidateUserID: profileInfo?.data?.userId,
      status: ["Applied"],
      jobID: jobItem?._id,
      jobAppliedDate: new Date().toLocaleDateString()
    },
      "/jobs"
    )
  }

  return (
    <>
      <Drawer open={showDrawerOpen} onOpenChange={setShowDrawerOpen}>
        <CommonCard
          icon={<Rocket />}
          title={jobItem?.title}
          footerContent={
            <Button
              onClick={() => setShowDrawerOpen(true)}
              className="dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5 cursor-pointer"
            >
              View Details
            </Button>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex justify-between items-center">
              <DrawerTitle className="text-4xl dark:text-white font-extrabold text-gray-800">
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  onClick={handleJobApply}
                  className="disabled:opacity-65 flex h-11 items-center justify-center px-5 cursor-pointer"
                  disabled={
                    getJobApplication.findIndex((item) => item.jobID === jobItem._id) > -1 ?
                      true : false
                  }
                >
                  {
                    getJobApplication.findIndex((item) => item.jobID === jobItem._id) > -1 ?
                      "Applied" : "Apply"
                  }
                </Button>
                <Button
                  onClick={() => setShowDrawerOpen(false)}
                  className="flex h-11 items-center justify-center px-5 cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </div>
            <DrawerDescription className="text-2xl dark:text-white font-medium text-gray-600 mt-4">
              {jobItem?.description}
              <span className="text-xl dark:text-white ml-4 font-normal text-gray-500">
                {jobItem?.location}
              </span>
            </DrawerDescription>

            <div className="w-[150px] mt-6 flex p-8 justify-center items-center h-[40px] bg-black dark:bg-white rounded-[4px]">
              <h2 className="text-xl font-bold text-white dark:text-black py-20">
                {jobItem?.type}
              </h2>
            </div>

            <h3 className="text-2xl font-medium text-black mt-3">
              Experience: {jobItem?.experience}
            </h3>

            <div className="flex flex-wrap gap-4 mt-6">
              {jobItem?.skills?.split(",").map((skill, index) => (
                <div
                  key={index}
                  className="px-4 flex justify-center items-center h-[35px] bg-black dark:bg-white rounded-[4px]"
                >
                  <h2 className="text-[13px] font-medium text-white dark:text-black">
                    {skill.trim()}
                  </h2>
                </div>
              ))}
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CandidateJobCard;
