'use client'
import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingsTab from './BookingsTab'
import GlobalApi from '@/app/_utils/GlobalApi'
import Preloader from '@/app/_components/Loader'
import { toast } from 'sonner'

export default function List() {
    const [loading, setLoading] = useState(true)
    const [bookingList, setBookingList] = useState([])

    useEffect(() => {
        getUserBookingList()
    }, [])

    async function getUserBookingList() {
        setLoading(true)
        try {
            const res = await GlobalApi.userBookingList()
            const data = await res.json()

            if (!res.ok) throw new Error(data.message)
            setBookingList(data.data)
        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    const filterUserBooking = (type) => {
        if (!bookingList || bookingList.length === 0) return []

        const result = bookingList.filter((item) => {
            const [day, month, year] = item.date.split('/')
            const ISOFormattedDate = `${year}-${month}-${day}`
            const bookingTime = new Date(ISOFormattedDate + " " + item.time).getTime()

            return type === 'upcoming' ? bookingTime >= new Date().getTime() : bookingTime < new Date().getTime()
        })

        return result
    }

    if (loading) return <Preloader bgHeight="40vh" width="2rem" height="2rem" color="#0D7Dff" />
    return (
        <Tabs defaultValue="upcoming" className="w-full mt-5">
            <TabsList className='w-full justify-start'>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
                <BookingsTab
                    list={filterUserBooking('upcoming')}
                />
            </TabsContent>
            <TabsContent value="expired">
                <BookingsTab
                    list={filterUserBooking('expired')}
                />
            </TabsContent>
        </Tabs>
    )
}
