"use client"
import ReactCalendar from 'react-calendar'

import React, { useState } from 'react'
import { add, format } from 'date-fns'

// interface DateType {
//     justDate: Date | null
//     dateTime: Date | null
// }

const Calendar = () => {
    // const [date, setDate] = useState<DateType>({
    //     justDate: null,
    //     dateTime: null
    // })

    // const getTimes = () => {
    //     if(!date.justDate) return

    //     const {justDate} = date
    //     const startTime = add(justDate, {hours: 9}) //sets opening time to 9:00AM
    //     const end = add(justDate, {hours: 17})  //sets closing time to 5:00PM
    //     const interval = 30 //in minutes. Select date/time in 30 min intervals
    
    //     const times = []
    //     for(let i=startTime; i<=end; i=add(justDate,{minutes:interval})){
    //         times.push(i)
    //     }

    //     return times
    // }

    // const times = getTimes()

    return (
      <div className='h-screen flex flex-col justify-center items-center'>
        <ReactCalendar
            className="REACT-CALENDAR p-2"
            minDate={new Date()}
            view='month'
            onClickDay={(date)=>{console.log(date)}}
        />
        {/* {date.justDate ? (
            <div className='flex gap-4'>
            {times?.map((time, i) => (
                <div key={`time-${i}`} className='rounded-sm bg-gray-100 p-2'>
                    <button type='button' onClick={()=> setDate((prev)=>({...prev,dateTime:time}))}>
                        {format(time,'kk:mm')}
                    </button>
                </div>
            ))}
            </div>
        )
        : null} */}
      </div>
  )
}

export default Calendar