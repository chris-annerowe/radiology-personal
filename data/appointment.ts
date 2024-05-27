"use server"

import { db } from "@/lib/db"
import { getBgColour } from "@/types/appointment"
import { add, sub } from "date-fns"

export const createAppointment = async (
    lastName: string,
    firstName: string,
    description: string,
    date: Date,
    modality: string,
    tel: string,
    dob: Date,
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
                dob
            }
        })

        console.log("Appointment created successfully")
    }catch{ return }
}

export const appointmentExists = async(time: Date, modality: string) => {
    try{
        const appointments = await db.appointment.findMany()
        let apptExists = false
        
        appointments?.map(appt => (
            appt.appointment_time?.getTime() === time.getTime() && modality === appt.modality ? apptExists = true : null
        ))
        console.log("Selected timeslot already exists: ",apptExists)
        return apptExists
    }catch{ return }
}

export const getExistingAppointment = async(time: Date, modality: string) => {
    try{
        const utcAdjusted = sub(time,{hours: 10})
        const appointments = await db.appointment.findFirst({
            where: {appointment_time:utcAdjusted,modality}
        })
        // console.log("Getting appt",time,appointments,utcAdjusted)
        
        let colour= 'bg-slate-100'
        // console.log("Calling get bg colour")
        if(appointments){
            // appointments?.map(appt => (
            //     appt.appointment_time?.getTime() === utcAdjusted.getTime() && modality === appt.modality ? colour = getBgColour(modality) : null
            // ))
            colour= getBgColour(modality)
        } 

        console.log("Appointment exists: ",colour,appointments)
        return colour
        
    }catch{ return }
}

export const getAppointments = async() => {
    try{
        const appointments = await db.appointment.findMany()

        console.log("Appointments retrieved successfully: ",appointments)
       
        return appointments
    }catch{ return }
}