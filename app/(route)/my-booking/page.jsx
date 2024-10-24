"use client"
import React, { useState, useEffect, useTransition } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import Preloader from '@/app/_components/Loader'

function MyBooking() {
    const { user } = useKindeBrowserClient();
    const [isPending, startTransition] = useTransition()
    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        if (user) {
            getUserBookingList();
        }
    }, [user]);

    const getUserBookingList = () => {
        startTransition(() => {
            GlobalApi.getUserBookingList(user?.email).then(resp => {
                setBookingList(resp.data.data || []); // Ensure it sets an array
            }).catch(err => {
                console.error('Error fetching bookings:', err);
                setBookingList([]); // Set to an empty array in case of error
            });
        })
    }

    const filterUserBooking = (type) => {
        if (!bookingList || bookingList.length === 0) {
            return [];
        }

        const result = bookingList.filter(item =>
            type === 'upcoming'
                ? new Date(item.attributes.Date) >= new Date()
                : new Date(item.attributes.Date) < new Date()
        );

        return result;
    }

    if(isPending) return <Preloader bgHeight="100%" width="3rem" height="3rem" color="#0D7Dff" />
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
                        bookingList={filterUserBooking('upcoming')}
                        updateRecord={() => getUserBookingList}
                        expired={false}
                    />
                </TabsContent>
                <TabsContent value="expired">
                    <BookingList
                        bookingList={filterUserBooking('expired')}
                        updateRecord={() => getUserBookingList}
                        expired={true}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default MyBooking
