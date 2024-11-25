"use client"
import { useState, useEffect, useTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppointmentList from './_components/AppointmentList'
import GlobalApi from '@/app/_utils/GlobalApi'
import Preloader from '@/app/_components/Loader'
import { toast } from 'sonner'

export default function Page() {
    const [isPending, startTransition] = useTransition()
    const [appointmentList, setAppointmentList] = useState([])

    useEffect(() => {
        getUserAppointmentList()
    }, [])

    function getUserAppointmentList() {
        startTransition(async () => {
            try {
                const res = await GlobalApi.userAppointmentList()
                const data = await res.json()

                if (!res.ok) throw new Error(data.message)
                setAppointmentList(data.data)
            }
            catch (err) {
                toast.error(err.message)
            }
        })
    }

    function filterUserAppointment(type) {
        if (!appointmentList || appointmentList.length === 0) return []

        const result = appointmentList.filter((item) => {
            const [day, month, year] = item.date.split('/')
            const ISOFormattedDate = `${year}-${month}-${day}`

            return type === 'upcoming'
                ? new Date(ISOFormattedDate + " " + item.time) >= new Date().getTime()
                : new Date(ISOFormattedDate + " " + item.time) < new Date().getTime()
        })

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
                    <AppointmentList
                        list={filterUserAppointment('upcoming')}
                    />
                </TabsContent>
                <TabsContent value="expired">
                    <AppointmentList
                        list={filterUserAppointment('expired')}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}
