'use client'
import React, { useState, useTransition, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

export default function BookAppointment({ doctor_email }) {
    const [isPending, startTransition] = useTransition()
    const [appointments, setAppointments] = useState([])

    const [date, setDate] = useState(new Date())
    const [selectedTimeSlot, setSelectedTimeSlot] = useState()
    const [note, setNote] = useState()

    const dialogCloseRef = useRef(null)

    const timeSlots = makeTimeSlots()

    const isPastDay = (day) => day.getTime() + 24 * 3600 * 1000 <= new Date().getTime()

    async function handleBookAppointmentClick() {
        try {
            const res = await GlobalApi.getBookedAppointments(doctor_email, date.toLocaleDateString("en-CA"))
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = (await res.json()).data
            setAppointments(data)
        } catch (error) {
            console.error('Error fetching booked appointments:', error)
        }
    }

    function saveBooking() {
        const formattedDate = date.toLocaleDateString("en-CA")

        const appointmentData = {
            date: formattedDate,
            time: selectedTimeSlot,
            note: note,
            doctor_email: doctor_email
        }

        startTransition(async () => {
            try {
                const res = await GlobalApi.bookAppointment(appointmentData)

                const data = await res.json()
                if (!res.ok) throw new Error(data.message)

                toast.success(data.message)
            }
            catch (err) {
                toast.error(err.message)
            }
            finally {
                resetAppointment()
            }
        })
    }

    function resetAppointment() {
        setDate(new Date())
        setSelectedTimeSlot()
        dialogCloseRef.current.click()
    }

    return (
        <Dialog>
            <DialogTrigger asChild onClick={handleBookAppointmentClick}>
                <Button className="mt-3 rounded-full cursor-pointer">Book Appointment</Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black mx-auto max-h-screen overflow-y-auto overscroll-auto scroll-smooth">
                <DialogHeader className="sticky top-0 bg-white z-10">
                    <DialogTitle>Book Appointment</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-4" asChild>
                    {/* Responsive Grid Layout */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
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
                                    const isAvailable = getFreeTimeSlots(date, appointments).includes(time)

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
                        <DialogClose asChild onClick={resetAppointment}>
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
                            {isPending ? 'Submitting...' : 'Submit'}
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

function getFreeTimeSlots(date, appointments) {
    const time_slots = makeTimeSlots()
    date = date.toLocaleDateString("en-CA")

    let appointments_time = []
    if (appointments.length > 0) {
        appointments_time = appointments.map((item) => {
            return new Date(item.date + " " + item.time).getTime()
        })
    }

    const timeslots_time = time_slots.map((time) => {
        return new Date(date + " " + time).getTime()
    })

    const available_slots = time_slots.filter(
        (_, index) => !appointments_time.includes(timeslots_time[index])
    )

    return available_slots
}
