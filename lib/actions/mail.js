'use server'

import nodemailer from 'nodemailer'
import path from 'node:path'
import fs from 'node:fs'

const nodeConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}
const transporter = nodemailer.createTransport(nodeConfig)

export async function sendMail(data, isAppointment = false, isService = false) {
    let message

    if (isService) {
        const serviceTemplatePath = path.join(process.cwd(), 'lib', 'email-templates', 'Service.html');
        let serviceTemplate = fs.readFileSync(serviceTemplatePath, 'utf-8');

        const serviceData = {
            name: data.name,
            email: data.email,
            date: data.date,
            time: data.time,
            serviceName: data.serviceName
        };

        serviceTemplate = serviceTemplate
        .replace(/{{name}}/g, serviceData.name)
        .replace(/{{serviceName}}/g, serviceData.serviceName)
        .replace(/{{date}}/g, serviceData.date)
        .replace(/{{time}}/g, serviceData.time);

        message = {
            from: process.env.EMAIL,
            to: serviceData.email,
            subject: "Booking Confirmation",
            html: serviceTemplate
        }
    }
    else if (isAppointment) {
        const appointmentTemplatePath = path.join(process.cwd(), 'lib', 'email-templates', 'Appointment.html');
        let appointmentTemplate = fs.readFileSync(appointmentTemplatePath, 'utf-8');

        const appointmentData = {
            name: data.name,
            email: data.email,
            date: data.date,
            time: data.time,
            doctorName: data.doctorName
        };

        appointmentTemplate = appointmentTemplate
        .replace(/{{name}}/g, appointmentData.name)
        .replace(/{{doctorName}}/g, appointmentData.doctorName)
        .replace(/{{date}}/g, appointmentData.date)
        .replace(/{{time}}/g, appointmentData.time);

        message = {
            from: process.env.EMAIL,
            to: appointmentData.email,
            subject: "Booking Confirmation",
            html: appointmentTemplate
        }
    }

    transporter.sendMail(message)
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        })
}
