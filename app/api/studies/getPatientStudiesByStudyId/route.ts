import { db } from "@/lib/db";
import { toJSON } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
      const body = await req.json();
      const { 
        study_id
       } = body;
       console.log("Study id ",study_id)
      try {
        const study = await db.patient_studies.findMany({
          where: { study_id}
        });
        return NextResponse.json({ study: JSON.parse(toJSON(study)), message: 'patient study for id retrieved successfully: ',study_id}, {status: 200})
      } catch (error) {
        return NextResponse.json({ study: null, message: 'studies failed to retrieve', error}, {status: 500})
      }
    } else {
      return NextResponse.json({ study: null, message: 'Method not allowed'}, {status: 405})
    }
  }

  export async function DELETE(req: Request) {
    if (req.method === 'DELETE') {
      const body = await req.json();
      const { 
        study_id, id
       } = body;
       console.log("Study id ",study_id)
      try {
        const study = await db.patient_studies.delete({
          where: { id, study_id}
        });
        return NextResponse.json({ study: JSON.parse(toJSON(study)), message: 'patient study for id deleted successfully: ',study_id}, {status: 200})
      } catch (error) {
        return NextResponse.json({ study: null, message: 'studies failed to delete', error}, {status: 500})
      }
    } else {
      return NextResponse.json({ study: null, message: 'Method not allowed'}, {status: 405})
    }
  }