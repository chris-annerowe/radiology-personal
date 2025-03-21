import { db } from "@/lib/db";
import { toJSON } from "@/lib/utils";
import { Study } from "@/types/studies";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";




export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log("POST method")
    console.log("Creating worklist")
    const body = await req.json();
    const {
      orderno,
      patient_uid,
      patient_name,
      patient_dob,
      studies
    } = body;
    try {
      const transaction = await db.worklist.createMany({
        data: studies.map((study: Study) => {
          return {
            accession_number: orderno,
            patient_uid,
            patient_name,
            patient_dob,
            modality: study.modality_code,
          }
        })

      });
      return NextResponse.json({ transaction: JSON.parse(toJSON(transaction)), message: 'Worklist created successfully' }, { status: 201 })
    } catch (error: any) {
      console.log("Error creating worklist");
      console.log("Error: " + error.message);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        console.log("Error: " + error.message);
      }

      if (error instanceof Prisma.PrismaClientUnknownRequestError) {

        console.log("Error: " + error.message);
      }

      if (error instanceof Prisma.PrismaClientValidationError) {

        console.log("Error: " + error.message);

      }
      return NextResponse.json({ transaction: null, message: 'Worklist failed to send' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ transaction: null, message: 'Method not allowed' }, { status: 405 })
  }
}

export async function PUT(req: Request) {
  if (req.method === 'PUT') {
    console.log("UPDATE method")
    const body = await req.json();
    const {
      worklist_id,
      orderno,
    } = body;
    try {
      const transaction = await db.worklist.update({
        where: { worklist_id, accession_number: orderno },
        data: {

        },
      });
      return NextResponse.json({ transaction: transaction, message: 'Order updated successfully' }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ transaction: null, message: 'Order failed to send' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ transaction: null, message: 'Method not allowed' }, { status: 405 })
  }
}