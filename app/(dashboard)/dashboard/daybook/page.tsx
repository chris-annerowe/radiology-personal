"use server"

import Calendar from '@/components/calendar'
import React from 'react'
import "@/styles/calendar.css"
import { getAppointmentsByName, getAppointmentSearchCount, getAppointmentsByPagination, getUpcomingAppointmentsCount } from '@/data/appointment'
import AppointmentList from '@/ui/dashboard/appointment/appointment-list'
import { Appointment } from '@/types/appointment'

interface ApptProps{
  date: Date | null,
  modality: string | null,
  index: number | null
}
let appts: any[] = []
let searchAppointments: any[] = []
    
const Daybook = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let search = "";
  let pageNumber = 1
  const limit = 5

  
  const getAppts = async () => {
    const appointments = await getAppointmentsByPagination(pageNumber,limit)
    console.log("Daybook appointments: ",appointments)
    appointments?.map(appt=>{
      let temp:Appointment = {
        firstName: "",
        lastName: "",
        appointment_id: null,
        appointment_time: null,
        tel: "",
        sex: "",
        dob:null,
        description: "",
        index: null,
        modality: ""
      }
      temp.appointment_time = appt.appointment_time
      temp.appointment_id = appt.appointment_id
      temp.firstName = appt.firstName
      temp.lastName = appt.lastName
      temp.tel = appt.tel
      temp.sex = appt.sex
      temp.dob = appt.dob
      temp.description = appt.description
      temp.index = appt.index
      temp.modality = appt.modality
      
      appts.push(temp)
  })
    console.log("Call ",appts)
    return appts
  }
  const call = getAppts()

  
  const pageNumberParam = searchParams["page"];
  const searchParam = searchParams["search"];

    if (pageNumberParam) {
        try {
            if (Array.isArray(pageNumberParam)) {
                pageNumber = parseInt(pageNumberParam[0])
            } else {
                pageNumber = parseInt(pageNumberParam);
            }
        } catch (e) {
            console.log("Page number parameter invalid.")
        }
    }
  
  if (searchParam) {
    console.log("Reading search param")
    search = Array.isArray(searchParam) ? searchParam[0] : searchParam
    console.log(search)
    //Get appointments by name
    const appointments = await getAppointmentsByName(search)
    console.log("appointments by name: ",appointments)
    //clear any previous search results
    searchAppointments = []
    appointments?.map(appt=>{
      let temp:Appointment = {
        firstName: "",
        lastName: "",
        appointment_id: null,
        appointment_time: null,
        tel: "",
        sex: "",
        dob:null,
        description: "",
        index: null,
        modality: ""
      }
      temp.appointment_time = appt.appointment_time
      temp.appointment_id = appt.appointment_id
      temp.firstName = appt.firstName
      temp.lastName = appt.lastName
      temp.tel = appt.tel
      temp.sex = appt.sex
      temp.dob = appt.dob
      temp.description = appt.description
      temp.index = appt.index
      temp.modality = appt.modality
      
      searchAppointments.push(temp)
    })
  }
  
  // const appointmentsList = search ? await getAppointmentByName(search) : await getAppointmentsByPagination(pageNumber,limit)
  const appointmentCount = search ? await getAppointmentSearchCount(search) : await getUpcomingAppointmentsCount();
  // const appointments = JSON.parse(JSON.stringify(appointmentsList));

  
  return (
    <div>
      <div className='flex'>
        <Calendar appointments={appts}/>
      </div>
      {searchParam && (
        <div className='flex-col'>
          <AppointmentList appointments={searchAppointments} appointmentCount={appointmentCount} activePage={pageNumber} limit={limit} search={search} />
        </div>
        )
      }
    </div>
  )
}

export default Daybook