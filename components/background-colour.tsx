"use server"
        
import { getExistingAppointment } from '@/data/appointment'
import React from 'react'

export const Colour = async (time:Date, modality:string) => {
    const bg = await getExistingAppointment(time, modality)
    console.log("Getting colour",bg)
    
    return bg

}