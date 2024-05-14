"use client"
import ReactCalendar from 'react-calendar'

import React, { useState } from 'react'
import { add, format } from 'date-fns'
import { BUSINESS_HOURS_INTERVAL, CLOSING_HOURS, MODALITIES, OPENING_HOURS } from '@/config'
import { FaCalendar, FaClock } from 'react-icons/fa6'
import {DayPilotScheduler} from "daypilot-pro-react";

interface DateType {
    justDate: Date | null
    dateTime: Date | null
}

const Calendar = () => {
    const [selectedModality, setSelectedModality] = useState()
    const [date, setDate] = useState<DateType>({
        justDate: null,
        dateTime: null
    })
    console.log(date.justDate)
    console.log(date.dateTime)

    const getTimes = () => {
        if(!date.justDate) return

        const {justDate} = date
        const startTime = add(justDate, {hours: OPENING_HOURS}) //sets opening time to 9:00AM
        const end = add(justDate, {hours: CLOSING_HOURS})  //sets closing time to 5:00PM
        const interval = BUSINESS_HOURS_INTERVAL //in minutes. Select time slot in 30 min intervals
    
        const times = []
        for(let i=startTime; i<=end; i=add(i,{minutes:interval})){
            times.push(i)
        }

        return times
    }

    const times = getTimes()

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
    
    return (
        <section className='h-screen flex flex-row'>
      <div className='flex flex-col w-1/4 m-3'>
       <h2 className='flex gap-2 justify-start items-center gap-3 mb-4'>
        <FaCalendar/>
            Select Date 
       </h2>
        <ReactCalendar
              className="REACT-CALENDAR p-2"
              minDate={new Date()}
              view='month'
              onClickDay={(date)=>{setDate((prev)=>({...prev,justDate:date}))}}
          />
          <ReactCalendar
              className="REACT-CALENDAR p-2 mt-6"
              activeStartDate={getNextMonth()}
              view='month'
              onClickDay={(date)=>{setDate((prev)=>({...prev,justDate:date}))}}
          />
          </div>
          {date?.justDate ?
          (
          <div className='flex flex-col border w-3/4 m-3'>
          <div className='grid grid-cols-5 gap-2 text-center p-1'>
                {MODALITIES?.map((modality,i) => (
                    <div key={`modality-${i}`}>
                        {modality}
                    {times?.map((time, i) => (
                        <div key={`time-${i}`} className={`rounded-sm bg-gray-100 p-2 m-2 cursor:pointer hover:bg-sky-600 hover:text-white `}>
                            <button className={`rounded-sm ${date?.dateTime && 'bg-sky-600 text-white'}`} type='button' onClick={()=> setDate((prev)=>({...prev,dateTime:time}))}>
                                {format(time,'kk:mm')}
                            </button>
                        </div>
                    ))}
                    </div>   
                ))}
            </div>
         
            </div>
            )
            : null}
            {/* <DayPilotScheduler
                startDate={"2024-12-01"}
                days={31}
                scale={"Day"}
                timeHeaders={[{groupBy: "Month"}, {groupBy: "Day", format: "d"}]}
                resources={[
                    {name: "Resource 1", id: "R1"},
                    {name: "Resource 2", id: "R2"},
                    {name: "Resource 3", id: "R3"},
                ]}
            /> */}
      </section>
  )
}

export default Calendar