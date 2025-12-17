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

interface Appointment{
    first_name: string | null,
    last_name: string | null,
    appointment_id: number | null,
    dob: Date | null,
    tel: string | null,
    sex: string | null,
    appointment_time: Date | null,
    description: string | null,
    index: number | null,
    modality: string | null,
    duration: string | null
}
  
const resetAppointment:Appointment = {
    first_name: null,
    last_name: null,
    tel: null,
    sex: null,
    dob: null,
    appointment_id: null,
    appointment_time: null,
    description: null,
    index: null,
    modality: null,
    duration: null
}

const Calendar = (props:AppointmentProps) => {
    console.log("Appointments props from daybook: ",props.appointments)

    const [selectedModality, setSelectedModality] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [isHoliday, setIsHoliday] = useState(false)
    const [holiday, setHoliday] = useState("")
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined)
    const [appointmentEdit, setAppointmentEdit] = useState<any>(resetAppointment)
    const [date, setDate] = useState<DateType>({
        justDate: null,
        dateTime: null
    })
    const [businessHrs, setBusinessHrs] = useState({
        opening_time: 9,
        closing_time: 17,
        interval: 30
    })

    const getBusinessHrs = async () => {
        const resp = await fetch('/api/getBusinessHours',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await resp.json();
    console.log("Business hours: ",businessHrs)
    setBusinessHrs(data.config);
    }

    
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

            holidays?.map((holiday: any) => {
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
            return colour
    }

    const getAppointmentForSelectedDate = (index:number, modality:string) => {
        let colour = 'bg-slate-100 dark:bg-gray-800'
        props.appointments?.map((appt, i) => {
            if(index === appt.index && modality === appt.modality){
                if(date.justDate?.getDate() === appt.appointment_time?.getDate() &&
                date.justDate?.getMonth() === appt.appointment_time?.getMonth() &&
                date.justDate?.getFullYear() === appt.appointment_time?.getFullYear()){
                    colour = handleApptColour(modality)
                    console.log("Appointment exists for selected date ",appt.appointment_time)
                }
            }  
        })
        return colour
    }

    useEffect(() => {
       getHolidays()
       getBusinessHrs()
        
      }, [date.justDate])

    useEffect(() => {
        setAppointmentEdit(resetAppointment)
        props.appointments?.map(appt=>{
        if(appt.appointment_time?.getDate() === date.dateTime?.getDate() &&
        appt.appointment_time?.getTime() === date.dateTime?.getTime() && appt.modality === selectedModality){
            if(date.dateTime !== null){
            console.log("Appointment matches selected timeslot",date.dateTime,appt.appointment_time)
            setAppointmentEdit(appt)
            }
        }
        })
         
       }, [handleSelectedTimeslot])

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
                    businessHrs={businessHrs}
                />
            }
            <AppointmentModal 
                show={showModal} 
                onClose={closeModal} 
                date={date.dateTime} 
                modality={selectedModality} 
                index={selectedIndex}
                holiday={holiday}
                appt={appointmentEdit}
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