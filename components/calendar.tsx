"use client"
import ReactCalendar from 'react-calendar'

import React, { useState, useEffect } from 'react'
import { format, sub } from 'date-fns'
import { COUNTRY_CODE, PUBLIC_HOLIDAYS_URL } from '@/config'
import { FaCalendar } from 'react-icons/fa6'
import AppointmentModal from '@/ui/modals/appointment-modal'
import { getBgColour } from '@/types/appointment'
import AppointmentTimes from './ui/daybook'
import HolidayModal from '@/ui/modals/holiday-modal'

interface DateType {
    justDate: Date | null
    dateTime: Date | null
}

interface AppointmentProps {
    appointments: any[]
}

const Calendar = (props:AppointmentProps) => {
    console.log("Appointments props from daybook: ",props.appointments)

    const [selectedModality, setSelectedModality] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [isHoliday, setIsHoliday] = useState(false)
    const [holiday, setHoliday] = useState("")
    const [dark, setDark] = useState("")
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<DateType>({
        justDate: null,
        dateTime: null
    })

    console.log(date.justDate)

    const closeModal = () => {
        setShowModal(false);
    }

    const closeHoliday = () => {
        setIsHoliday(false);
    }
    
    const getHolidays = async () => {
        setHoliday("")  //ensure each check starts with a clean slate
        const URL = `${PUBLIC_HOLIDAYS_URL}/${new Date().getFullYear()}/${COUNTRY_CODE}`
        try{
            const resp = await fetch(URL,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const holidays = await resp.json()
            console.log("JM Holidays: ",URL,holidays)

            holidays?.map(holiday => {
                if(date.justDate){
                    const formatted = format(date.justDate,'yyyy-MM-dd')
                    //check if date selected is a holiday
                    if(formatted === holiday.date){
                        console.log("Date is a holiday")
                        setIsHoliday(true)
                        setHoliday(holiday.localName)
                    }
                }
        })
            return
        }
        catch{return}
    }

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

    const handleSelectedTimeslot = (time: Date, index: number) => {
        const utcAdjusted = sub(time, {hours: 5})
        setDate((prev)=>({...prev,dateTime:utcAdjusted}))
        setSelectedIndex(index)
        setShowModal(true)
    }

    const handleSelectedDate = (date: Date) => {
        setDate((prev)=>({...prev,justDate:date}))
    }

    const handleApptColour = (modality:string) => {
            const colour = getBgColour(modality)
            setDark('dark:'+colour)
            console.log("Dark mode: ",dark)
            return colour
    }

    const getAppointmentForSelectedDate = (index:number, modality:string) => {
        let colour = 'bg-slate-100 dark:bg-gray-800'
        props.appointments?.map((appt, i) => {
            if(index === appt.index && modality === appt.modality){
                if(date.justDate?.getDate() === appt.date?.getDate() &&
                date.justDate?.getMonth() === appt.date?.getMonth() &&
                date.justDate?.getFullYear() === appt.date?.getFullYear()){
                    colour = handleApptColour(modality)
                    console.log("Appointment exists for selected date ",appt.date)
                }
            }  
        })
        return colour
    }

    useEffect(() => {
       getHolidays()
        
      }, [date.justDate])

     return (
        <div className='h-screen flex flex-row'>
            <div className='flex flex-col w-1/4 m-3'>
                <h2 className='flex justify-start items-center gap-3 mb-4'>
                    <FaCalendar/>
                        Select Date 
                </h2>
                <ReactCalendar
                    className="REACT-CALENDAR p-2 dark:bg-gray-700 dark:text-white"
                    minDate={new Date()}
                    view='month'
                    onClickDay={(date)=>{handleSelectedDate(date)}}
                />
                <ReactCalendar
                    className="REACT-CALENDAR p-2 mt-6 dark:bg-gray-700 dark:text-white"
                    activeStartDate={getNextMonth()}
                    view='month'
                    onClickDay={(date)=>{handleSelectedDate(date)}}
                />
            </div>
            {date?.justDate &&
                 <AppointmentTimes
                    calendarDate={date.justDate} 
                    handleSelectedTimeslot={handleSelectedTimeslot} 
                    getAppointmentForSelectedDate={getAppointmentForSelectedDate}
                    setSelectedModality={setSelectedModality}
                    darkMode={dark}
                />
            }
            <AppointmentModal 
                show={showModal} 
                onClose={closeModal} 
                date={date.dateTime} 
                modality={selectedModality} 
                index={selectedIndex}
                holiday={holiday}
            />
           <HolidayModal
                show={isHoliday}
                onClose={closeHoliday}
                holiday={holiday}
            />
      </div>
    )
}

export default Calendar