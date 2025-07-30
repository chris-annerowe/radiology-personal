import { db } from '@/lib/db'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log("POST method")
    const body = await req.json();
    const { 
        patient_id,
        internalid,
        first_name,
        last_name,
        other_name,
        title,
        dob,
        sex,
        nationality,
        address_1,
        address_2,
        city,
        parish,
        telephone_1,
        telephone_2,
        email,
        id_type,
        idnum,
        cellular
     } = body;
    try {
      const patient = await db.patient.create({
        data: {
            patient_id,
            internalid,
            first_name,
            last_name,
            other_name,
            title,
            dob,
            sex,
            nationality,
            address_1,
            address_2,
            city,
            parish,
            telephone_1,
            telephone_2,
            email,
            id_type,
            idnum,
            cellular
        },
      });
      return NextResponse.json({ patient: patient, message: 'Patient saved successfully'}, {status: 201})
    } catch (error) {
      return NextResponse.json({ patient: null, message: 'Patient failed to save'}, {status: 500})
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed'}, {status: 405})
  }
}