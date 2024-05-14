"use client"
import React, { useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { Calendar } from './ui/calendar'

const Appointment = () => {
    const [date, setDate] = useState(new Date())

  return (
    <>
        <h2><FaCalendarAlt /> Select Date</h2>
        <div className='grid grid-cols-2'>
            <div>            
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </div>
            <div>
                time
            </div>
        </div>
    </>
  )
}

export default Appointment