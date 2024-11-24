"use client"
import { useState, useEffect, useTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import GlobalApi from '@/app/_utils/GlobalApi'
import Preloader from '@/app/_components/Loader'
import moment from 'moment/moment'
import { toast } from 'sonner'

export default function Page() {
    const [isPending, startTransition] = useTransition()
    const [bookingList, setBookingList] = useState([])

    useEffect(() => {
        getUserBookingList()
    }, [])

    function getUserBookingList() {
        startTransition(async () => {
            try {
                const res = await GlobalApi.userBookingList()
                const data = await res.json()

                if (!res.ok) throw new Error(data.message)
                    setBookingList(data.data)
            }
            catch (err) {
                toast.error(err.message)
            }
        })
    }

    const filterUserBooking = (type) => {
        if (!bookingList || bookingList.length === 0) return []

        const result = bookingList.filter(item =>
            type === 'upcoming'
                ? moment(item.date, "DD-MM-YYYY") >= new Date()
                : moment(item.date, "DD-MM-YYYY") < new Date()
        )

        return result
    }

    if (isPending) return <Preloader bgHeight="100%" width="3rem" height="3rem" color="#0D7Dff" />
    return (
        <div className='px-4 sm:px-10 mt-10'>
            <h2 className='font-bold text-xl'>My Booking</h2>
            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className='w-full justify-start'>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <BookingList
                        list={filterUserBooking('upcoming')}
                    />
                </TabsContent>
                <TabsContent value="expired">
                    <BookingList
                        list={filterUserBooking('expired')}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
