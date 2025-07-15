import { db } from "@/lib/db";
import { toJSON } from "@/lib/utils";
import { NextResponse } from "next/server";


export async function GET() {
    try {
      const appointment:any = await db.appointment.findMany({
        where: {
            appointment_time: {
                gte: new Date()
            }
        }
    });
  
      return NextResponse.json({ appointment: appointment, message: 'Upcoming Appointments retrieved successfully' ,status:200});
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' ,status:500});
    }
  }

//   export async function PUT(req: Request) {
//       if (req.method === 'PUT') {
//         console.log("PUT method ")
//         const body = await req.json();
//         const {  
//           appointment_id,
//           appointment_time,
//           first_name,
//           last_name,
//           patient_id,
//           description,
//           dob,
//           modality,
//           tel,
//           index,
//           sex,
//           duration
//          } = body;
         
//         try {
//           const data = await db.appointment.update({
//               where: {
//                   appointment_id
//               },
//               data: {
//                 appointment_time,
//                 first_name,
//                 last_name,
//                 patient_id,
//                 description,
//                 dob,
//                 modality,
//                 tel,
//                 index,
//                 sex,
//                 duration
//               }
//           })
//           return NextResponse.json({ appointment: JSON.parse(toJSON(data)), message: 'Appointment updated successfully'}, {status: 200})
//         } catch (error) {
//           console.error("Update error:", error);
//           return NextResponse.json({ appointment: null, message: 'Appointments failed to update'}, {status: 500})
//         }
//       } else {
//         return NextResponse.json({ message: 'Method not allowed'}, {status: 405})
//       }
//     }

export async function PUT(req: Request) {
    try {
      const body = await req.json(); // this is an array
      console.log("Received appointments:", body);
  
      if (!Array.isArray(body)) {
        return NextResponse.json({ message: 'Request body must be an array' }, { status: 400 });
      }
  
      const updatedAppointments = [];
  
      for (const appt of body) {
        if (!appt.appointment_id) {
          console.warn("Skipping missing appointment_id:", appt);
          continue;
        }
  
        const updated = await db.appointment.update({
          where: { appointment_id: appt.appointment_id },
          data: {
            appointment_time: appt.appointment_time,
            first_name: appt.first_name,
            last_name: appt.last_name,
            patient_id: appt.patient_id,
            description: appt.description,
            dob: appt.dob,
            modality: appt.modality,
            tel: appt.tel,
            index: appt.index,
            sex: appt.sex,
            duration: appt.duration
          }
        });
  
        updatedAppointments.push(JSON.parse(toJSON(updated)));
      }
  
      return NextResponse.json({
        appointments: updatedAppointments,
        message: 'Appointments updated successfully'
      }, { status: 200 });
  
    } catch (error) {
      console.error("Update error:", error);
      return NextResponse.json({
        appointments: null,
        message: 'Appointments failed to update'
      }, { status: 500 });
    }
  }