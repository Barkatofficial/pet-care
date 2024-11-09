import React from 'react'
import dynamic from 'next/dynamic'
import Preloader from '@/app/_components/Loader'

const Profile = dynamic(() => import('./_components/Profile'), {
  loading: () => <Preloader width="5rem" height="5rem" color="#0D7Dff" />
})

export default function Page() {
  // API CALL WITH THE COOKIE IN SERVER SIDE

  return (
    // <div>page</div>
    // PASS THE FETCHED PROFILE DATA INTO COMPONENT USING PROPS
    <Profile />
  )
}
