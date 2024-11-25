'use client'
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GlobalApi from '@/app/_utils/GlobalApi'
import Preloader from '@/app/_components/Loader'
import { toast } from "sonner"
import AppointmentsTab from "./AppointmentsTab"

export default function List() {
    const [loading, setLoading] = useState(true)
    const [appointmentList, setAppointmentList] = useState([])

    useEffect(() => {
        getUserAppointmentList()
    }, [])

    async function getUserAppointmentList() {
        setLoading(true)
        try {
            const res = await GlobalApi.userAppointmentList()
            const data = await res.json()

            if (!res.ok) throw new Error(data.message)
            setAppointmentList(data.data)
        }
        catch (err) {
            toast.error(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    function filterUserAppointment(type) {
        if (!appointmentList || appointmentList.length === 0) return []

        const result = appointmentList.filter((item) => {
            const [day, month, year] = item.date.split('/')
            const ISOFormattedDate = `${year}-${month}-${day}`
            const appointmentTime = new Date(ISOFormattedDate + " " + item.time).getTime()

            return type === 'upcoming' ? appointmentTime >= new Date().getTime() : appointmentTime < new Date().getTime()
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
                <AppointmentsTab
                    list={filterUserAppointment('upcoming')}
                />
            </TabsContent>
            <TabsContent value="expired">
                <AppointmentsTab
                    list={filterUserAppointment('expired')}
                />
            </TabsContent>
        </Tabs>
    )
}
