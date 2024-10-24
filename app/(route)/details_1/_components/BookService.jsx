'use client'
import React, { useState, useTransition, useRef } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

export default function BookService({ service_id, bookings }) {
    const { user } = useKindeBrowserClient();
    const [isPending, startTransition] = useTransition();

    const [date, setDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [note, setNote] = useState("");

    const dialogCloseRef = useRef(null);

    const timeSlots = makeTimeSlots();

    const isPastDay = (day) => {
        // Check if the selected day is in the past
        return day.getTime() + 24 * 3600 * 1000 <= new Date().getTime();
    };

    const saveBooking = () => {
        // Check if user object exists and if the necessary fields are present
        if (!user || !user.given_name || !user.family_name || !user.email) {
            console.error("User information is not available");
            toast.error("User information is not available. Please log in.");
            return;
        }

        // Format date as MM-DD-YYYY
        const formattedDate = date.toLocaleDateString("en-CA");

        const data = {
            data: {
                Username: `${user.given_name || "Guest"} ${user.family_name || "User"}`,  // Correct the case to match Strapi's field
                email: user.email,
                Time: selectedTimeSlot,
                Date: formattedDate,
                doctor: service_id,
                Note: note || ""  // Handle an empty note field
            }
        };

        startTransition(() => {
            GlobalApi.bookAppointment(data).then(async (res) => {
                if (res.status === 200) {
                    toast("Booking Confirmation will be sent to your email", {
                        style: { backgroundColor: '#28a745', color: 'white' },
                    });

                    const mailData = res.data.data.attributes;
                    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/mail`, {
                        method: 'POST',
                        body: JSON.stringify({
                            name: mailData.Username,
                            email: mailData.email,
                            doctorName: mailData.service.data.attributes.Name,
                            date: mailData.Date,
                            time: mailData.Time,
                            isService: true
                        })
                    });
                }

            })
            .catch((error) => {
                console.error("Error booking appointment:", error.response?.data || error.message);
            })
            .finally(() => {
                resetBooking();
            });
        });
    };

    const resetBooking = () => {
        setDate(new Date());
        setSelectedTimeSlot();
        dialogCloseRef.current.click();
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="mt-3 rounded-full">Book Appointment</Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black max-w-md mx-auto max-h-screen overflow-y-auto overscroll-auto scroll-smooth">
                <DialogHeader>
                    <DialogTitle>Book Appointment</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-4">
                    {/* Responsive Grid Layout */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-5">

                        {/* Calendar */}
                        <div className="flex flex-col gap-3">
                            <h2 className="flex gap-2 items-center">
                                <CalendarDays className="text-primary h-5 w-5" />
                                Select Date
                            </h2>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={isPastDay}
                                className="rounded-md border w-full"
                            />
                        </div>

                        {/* Time Slot */}
                        <div className="flex flex-col gap-3">
                            <h2 className="flex gap-2 items-center">
                                <Clock className="text-primary h-5 w-5" />
                                Select Time Slot
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border rounded-lg p-4 overflow-y-auto max-h-60">
                                {timeSlots.map((time, index) => {
                                    const isAvailable = getFreeTimeSlots(date, bookings).includes(time);

                                    return (
                                        <h2
                                            key={index}
                                            onClick={() => isAvailable && setSelectedTimeSlot(time)}
                                            className={`p-2 border cursor-pointer text-center rounded-full
                                                ${isAvailable ? "hover:bg-primary hover:text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                                                ${time === selectedTimeSlot ? "bg-primary text-white" : ""}`}
                                            style={{ pointerEvents: isAvailable ? 'auto' : 'none' }}
                                        >
                                            {time}
                                        </h2>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Note Section */}
                        <div className="col-span-1 md:col-span-2">
                            <textarea
                                placeholder="Add a note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="p-2 border rounded-lg w-full h-24 text-sm"
                            />
                        </div>
                    </div>
                </DialogDescription>

                {/* Updated DialogFooter */}
                <DialogFooter className="sticky bottom-0 bg-white z-10 p-2 flex justify-between items-center space-x-2">
                    <div className="flex w-full space-x-2"> {/* Flex container added */}
                        <DialogClose>
                            <Button
                                ref={dialogCloseRef}
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 flex-1"
                            >
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            disabled={!(date && selectedTimeSlot) || isPending}
                            onClick={saveBooking}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 flex-1"
                        >
                            Submit
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function makeTimeSlots() {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
        timeList.push(i + ":00 AM");
        timeList.push(i + ":30 AM");
    }
    for (let i = 1; i <= 6; i++) {
        timeList.push(i + ":00 PM");
        timeList.push(i + ":30 PM");
    }
    return timeList;
}

function getFreeTimeSlots(date, bookings) {
    const time_slots = makeTimeSlots();
    const fullDate = date.toLocaleDateString("en-US", {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    let bookings_time = [];
    if (bookings.length > 0) {
        bookings_time = bookings.map((item) => {
            return new Date(item.attributes.Date + " " + item.attributes.Time).getTime();
        });
    }

    const timeslots_time = time_slots.map((time) => {
        return new Date(fullDate + " " + time).getTime();
    });

    const available_slots = time_slots.filter(
        (_, index) => !bookings_time.includes(timeslots_time[index])
    );

    return available_slots;
};
