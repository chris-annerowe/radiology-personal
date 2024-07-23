"use server"

import { db } from "@/lib/db"
import { randomUUID } from "crypto"
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

export const updateAppointment = async (
    id: bigint,
    patientid: string,
    time: Date,
    lastName: string,
    firstName: string,
    description: string,
    tel: string,
    dob: Date,
    sex: string,
    index: number
) =>{
    try{
        await db.appointment.update({
            where: {
                appointment_id: id
            },
            data: {
                lastName, 
                firstName,
                patientid,
                appointment_time: sub(time,{hours: 5}),
                description,
                tel,
                dob,
                sex,
                index
            }
        })

        console.log("Appointment updated successfully")
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

export const getAllAppointments = async() => {
    try{
        const appointments = await db.appointment.findMany()

        console.log("All appointments retrieved successfully: ",appointments)
       
        return appointments
    }catch{ return }
}

export const getUpcomingAppointments = async() => {
    try{
        const appointments = await db.appointment.findMany({
            where: {
                appointment_time: {
                    gte: new Date()
                }
            }
        })

        console.log("Upcoming appointments retrieved successfully: ",appointments)
       
        return appointments
    }catch{ return }
}

export const getAllAppointmentsCount = async () => {
    const appointmentCount = await db.appointment.count();
    return appointmentCount;
}

export const getUpcomingAppointmentsCount = async () => {
    const appointmentCount = await db.appointment.count({
        where: {
            appointment_time: {
                gte: new Date()
            }
        }
    })
    return appointmentCount
}

//TODO: re-evaluate this
export const getAppointmentSearchCount = async (searchName: string) => {
    const appointmentCount = await db.appointment.count({
        where: {
            lastName: {
                startsWith: searchName
            }
        }
    });
    return appointmentCount;
}

export const getAppointmentsByPagination = async (page: number, limit: number) => {
    const appointments = await db.appointment.findMany({
        skip: ((page - 1) * limit),
        take: limit,
        where: {
            appointment_time: {
                gte: new Date()
            }
        }
    });

    return appointments
}

export const getAppointmentsByName = async(name:string) => {
    const appointments = await db.appointment.findMany({
        where: {
            OR: [
                {
                    firstName: {
                        search: name,
                    },
                },
                {
                    lastName: {
                        search: name,
                    },
                }
            ],
            //Check that appointment date is greater than today's date
            AND: [
                {
                    appointment_time: {
                        gte: new Date()
                    }
                }
            ]
        },
    })
    console.log("Appointments by name: ",appointments)
    return appointments
}

export const deleteAppointment = async (id: bigint) => {
    await db.appointment.delete({
        where: {
            appointment_id: id
        }
    })
    console.log("Appointment successfully deleted.")
    return
}