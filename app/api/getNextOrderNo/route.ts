import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const rows:any = await db.$queryRaw`SELECT nextorderno(2,true,true)`;
      const nextSequence = rows[0].nextorderno;
      console.log("rows ",rows, " nextOrder ",nextSequence)
  
      return NextResponse.json({ orderNo: nextSequence, message: 'OrderNo created successfully' ,status:200});
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' ,status:500});
    }
  }
  