"use server"

import Calendar from '@/components/calendar'
import React from 'react'
import "@/styles/calendar.css"
import { getAppointments } from '@/data/appointment'
import NumCalculator from 'antd/es/theme/util/calc/NumCalculator'

interface ApptProps{
  date: Date | null,
  modality: string | null,
  index: number | null
}
let appts = []
// let temp:DateAndModality = {
//   date: null,
//   modality:null
// }
    
const Daybook = () => {
  const getAppts = async () => {
    const appointments = await getAppointments()
    console.log("Daybook appointments: ",appointments)
    appointments?.map(appt=>{
      let temp:ApptProps = {
        date: null,
        modality:null,
        index:null
      }
      temp.date = appt.appointment_time
      temp.modality = appt.modality
      temp.index = appt.index
      appts.push(temp)
  })
    console.log("Call ",appts)
    return appts
  }
  const call = getAppts()
  return (
    <div className='flex'><Calendar appointments={appts}/></div>
  )
}

export default Daybook