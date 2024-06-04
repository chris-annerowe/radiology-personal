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
    }catch{ return }
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

export const getApptIndex = async(date: Date, modality: string, i: number) => {
    try{
        const utcAdjusted = add(date,{hours: 6})
        const appointments = await db.appointment.findMany()
        let index = null
        console.log("Appt date: ",date,utcAdjusted)
        
        appointments?.map(appt => (
            appt.appointment_time?.getDate() === utcAdjusted.getDate() && modality === appt.modality && appt.index === i ? index = appt.index : null
        ))
        console.log("Appt index: ",index)
        return index
    }catch{ return }
}

export const getAppointmentTime = async(time: Date, modality: string) => {
    try{
        //const utcAdjusted = sub(time,{hours: 10})
        const appointments = await db.appointment.findMany()
        let apptExists = null
        console.log(time)
        
        appointments?.map(appt => (
            // console.log(time,appointments)
            appt.appointment_time?.getTime() === time.getTime() && modality === appt.modality ? apptExists = appt.appointment_time : null
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
        
        let colour= 'bg-slate-100'
        
        if(appointments){
            switch(modality){
                case 'Mammogram': 
                    colour = 'bg-pink-100'
                    break;
                case 'MRI':
                    colour = 'bg-blue-100'
                    break;
                case 'CT':
                    colour = 'bg-red-100'
                    break;
                case 'UltraSound':
                    colour = 'bg-green-100'
                    break;
                case 'Xray':
                    colour = 'bg-yellow-100'
                    break;
                default:
                    colour = 'slate'
                    break;
            }
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