import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const modalities:any = await db.modality_codes.findMany();
  
      return NextResponse.json({ modalities: modalities, message: 'Modalities retrieved successfully' ,status:200});
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' ,status:500});
    }
  }
  