
import MemberShip from '@/components/MemberShip/MemberShip'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'
import { fetchProfileAction } from '../action';

async function page() {

  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  return (
    <>
      <MemberShip 
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={JSON.parse(JSON.stringify(profileInfo))}
      />
    </>
  )
}

export default page