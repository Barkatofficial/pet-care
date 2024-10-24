import { sendMail } from "@/lib/actions/mail";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json()

    await sendMail(data, data?.isAppointment, data?.isService)
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
}