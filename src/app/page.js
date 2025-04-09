import { currentUser } from "@clerk/nextjs/server";
import { fetchProfileAction } from "./action";
import { redirect } from "next/navigation";
import HomeButtonControls from "@/components/HomeButtonsControls/HomeButtonControls";

export default async function Home() {

  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?.data?._id) {
    return redirect("/OnBoard")
  }
  return (
    <>
      <section className="relative w-full h-full min-h-screen pb-10">
        <div className="w-full h-full relative">
          <div className="flex flex-col-reverse lg:flex-row gap-10 mt-16">
            <section className="w-full lg:w-[50%] flex flex-col md:px-2   p-10">
              <div className="w-full flex justify-start flex-col h-auto lg:pt-7">
                <span className="flex space-x-2">
                  <span className="block w-14 mb-2 dark:border-white border-b-2 border-gray-700"></span>
                  <span className="font-medium dark:text-white text-gray-600">
                    One Stop Solution to Find Jobs
                  </span>
                </span>
                <h1 className="text-3xl dark:text-white mt-5 lg:text-7xl text-black font-extrabold">
                  Build your best job community starting from here.
                </h1>
                <div className="w-full mt-6 flex items-center text-white justify-start gap-2">
                  <HomeButtonControls
                    user={user ? JSON.parse(JSON.stringify(user)) : null}
                    profileInfo={profileInfo ? JSON.parse(JSON.stringify(profileInfo)) : null}
                  />
                </div>
              </div>
            </section>
            <section className="relative w-full lg:w-[50%] flex items-center justify-end">
              <img
                src="https://utfs.io/f/4c9f7186-8ad0-4680-aece-a5abea608705-k6t10e.png"
                alt="Hero"
                className="h-full w-full object-contain z-10"
              />
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
