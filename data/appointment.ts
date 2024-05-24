"use server"

import { db } from "@/lib/db"

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

         //extract appointment times and modality
        let apptExists = false
        
        appointments?.map(appt => (
            appt.appointment_time?.getTime() === time.getTime() && modality === appt.modality ? apptExists = true : null
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
    }catch{  }
}