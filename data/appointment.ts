"use server"

import { db } from "@/lib/db"
import { add, sub } from "date-fns"

export const createAppointment = async (
    lastName: string,
    firstName: string,
    description: string,
    date: Date,
    modality: string,
    tel: string,
    dob: Date,
    sex: string,
    index: number
) =>{
    try{
        await db.appointment.create({
            data: {
                lastName, 
                firstName,
                appointment_time: date,
                description,
                modality: modality,
                tel,
                dob,
                sex,
                index
            }
        })

        console.log("Appointment created successfully")
    }catch(e){ throw e }
}

export const appointmentExists = async(time: Date, modality: string) => {
    try{
        const utcAdjusted = sub(time,{hours: 10})
        const appointments = await db.appointment.findMany()
        let apptExists = null
        
        appointments?.map(appt => (
            appt.appointment_time?.getTime() === utcAdjusted.getTime() && modality === appt.modality ? apptExists = appt : null
        ))
        console.log("Selected timeslot already exists: ",apptExists)
        return apptExists
    }catch{ return }
}

export const getAppointments = async() => {
    try{
        const appointments = await db.appointment.findMany()

        console.log("Appointments retrieved successfully: ",appointments)
       
        return appointments
    }catch{ return }
}