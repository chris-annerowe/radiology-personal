
        
import { getExistingAppointment, getAppointmentTime } from '@/data/appointment'
import React from 'react'

export const Colour = async (time:Date, modality:string) => {
    const bg = await getAppointmentTime(time, modality)
    console.log("Getting colour",bg)
    
    return bg

}

// const Colour = async ({time: Date, modality: string, setSelectedModality: (modality)=>void}) => {
//     return (
//         <div key={`time-${i}`} className={`${bgColour} rounded-sm p-2 m-2 cursor:pointer hover:bg-sky-600 hover:text-white `} onClick={()=>setSelectedModality(modality)} >
//             <button id={`${modality}-timeslot`} className={`rounded-sm`} type='button' onClick={()=> handleSelectedTimeslot(time)}>
//                 {format(time,'h:mm aa')}
//             </button>
//         </div>
//     )
// }

// export default Colour