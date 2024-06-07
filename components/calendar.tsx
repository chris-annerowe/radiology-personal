"use client"
import ReactCalendar from 'react-calendar'

import { db } from "@/lib/db"
import React, { useState, useEffect } from 'react'
import { add, format, sub } from 'date-fns'
import { BUSINESS_HOURS_INTERVAL, CLOSING_HOURS, COUNTRY_CODE, MODALITIES, OPENING_HOURS } from '@/config'
import { FaCalendar } from 'react-icons/fa6'
import AppointmentModal from '@/ui/modals/appointment-modal'
import DailyAppointments from './ui/daybook'
import {Colour} from '@/components/background-colour'
import { getBgColour } from '@/types/appointment'
import { appointmentExists, getAppointmentTime, getApptIndex, getExistingAppointment } from '@/data/appointment'

interface DateType {
    justDate: Date | null
    dateTime: Date | null
}

interface BgData {
    time: Date | null
    modality: string
}

const Calendar = (props:any[]) => {
    console.log("Appointments props from daybook: ",props)
    const [selectedModality, setSelectedModality] = useState("")
    const [bgColour, setBgColour] = useState("")
    const [bgData, setBgData] = useState<BgData>({
        time: null,
        modality: ""
    })
    const [showModal, setShowModal] = useState(false);
    const [appointmentIndex, setAppointmentIndex] = useState<number | undefined>(undefined)
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<DateType>({
        justDate: null,
        dateTime: null
    })

    console.log(date.justDate)
    // console.log(date.dateTime)

    const closeModal = () => {

        setShowModal(false);
    }
    
    const getTimes = () => {
        if(!date.justDate) return

        const {justDate} = date
        const startTime = add(justDate, {hours: OPENING_HOURS}) //sets opening time to 9:00AM
        const end = add(justDate, {hours: CLOSING_HOURS})  //sets closing time to 5:00PM
        const interval = BUSINESS_HOURS_INTERVAL //in minutes. Sets time slot in 30 min intervals
    
        const times = []
        for(let i=startTime; i<=end; i=add(i,{minutes:interval})){
            times.push(i)
        }

        return times
    }

    const times = getTimes()

    const getHolidays = async () => {
        const URL = `https://date.nager.at/api/v3/publicholidays/${new Date().getFullYear()}/${COUNTRY_CODE}`
        try{
            const resp = await fetch(URL,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const holidays = await resp.json()
            console.log("JM Holidays: ",URL,holidays)

            //extract date value from holidays array
            let dates = []
            holidays?.map(holiday => (
                dates.push(holiday.date)
            ))
            console.log(dates)
            return dates
        }
        catch{return}
    }
    const holidays = getHolidays()

    const getNextMonth = () => {
        const now = new Date();
        let nextMonth;
    
        if (now.getMonth() === 11) {
            // If it's December, set to January of the following year
            nextMonth = new Date(now.getFullYear() + 1, 0, 1);
        } else {
            // Otherwise, set to the first day of the next month
            nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
    
        return nextMonth;
    }

    const getAppointmentIndex = (modality:string) =>{
        let index = undefined
        if(date.justDate){
            index = getApptIndex(date.justDate,modality).then((res)=>{console.log("Set appt index: ",res)})
        }
        return index
    }

    const handleAppointmentIndex = (index:any) => {
        console.log("index: ",index)
        if(typeof index === 'number'){
            setAppointmentIndex(index)
            console.log("set index: ",appointmentIndex)
        }
        return null
    }

    const handleSelectedTimeslot = (time: Date, index: number) => {
        const utcAdjusted = sub(time, {hours: 5})
        setDate((prev)=>({...prev,dateTime:utcAdjusted}))
        setSelectedIndex(index)
        setShowModal(true)
    }

    const handleSelectedDate = (date: Date) => {
        setDate((prev)=>({...prev,justDate:date}))
    }

     return (
        <div className='h-screen flex flex-row'>
            <div className='flex flex-col w-1/4 m-3'>
                <h2 className='flex justify-start items-center gap-3 mb-4'>
                    <FaCalendar/>
                        Select Date 
                </h2>
                <ReactCalendar
                    className="REACT-CALENDAR p-2"
                    minDate={new Date()}
                    view='month'
                    onClickDay={(date)=>{handleSelectedDate(date)}}
                />
                <ReactCalendar
                    className="REACT-CALENDAR p-2 mt-6"
                    activeStartDate={getNextMonth()}
                    view='month'
                    onClickDay={(date)=>{handleSelectedDate(date)}}
                />
            </div>
            {date?.justDate &&
            
            <div className='flex flex-col w-3/4 m-3'>
                {appointments.appointment_time == date.justDate ? "appt and date match" : `appt doesnt match date, ${date.justDate} ${appointments}`}
                <div className='grid grid-cols-5 gap-2 text-center p-1'>
                    {MODALITIES?.map((modality,i) => (
                    <div key={`modality-${i}`}>
                        {modality}
                        {times?.map((time, i) => (
                            <>
                            <div key={`time-${i}`} className={`rounded-sm p-2 m-2 ${i===appointmentIndex ? getBgColour(modality) : console.log("Index not match ",i)} cursor:pointer hover:bg-sky-600 hover:text-white `} onClick={()=>setSelectedModality(modality)} >
                                <button id={`${modality}-timeslot`} className={`rounded-sm`} type='button' onClick={()=> handleSelectedTimeslot(time,i)}>
                                {format(time,'h:mm aa')}
                                </button>
                            </div>
                            </>
                        ))}
                    </div>   
                    ))}
                </div>
            </div>
            
        
            }
            {date?.dateTime && date?.justDate &&
                <>
                {/* {appointmentExists(date.dateTime, selectedModality)  && null //TODO: create modal to notify an appointment already exists for that slot
                } */}
                <AppointmentModal 
                        show={showModal} 
                        onClose={closeModal} 
                        date={date.dateTime} 
                        modality={selectedModality} 
                        index={selectedIndex}
                />
                </>
             
           }
      </div>
    )
}

export default Calendar