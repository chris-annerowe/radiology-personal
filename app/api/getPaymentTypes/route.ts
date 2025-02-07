import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const paymentTypes:any = await db.pos_payment_options.findMany();
  
      return NextResponse.json({ paymentTypes: paymentTypes, message: 'Payment types retrieved successfully' ,status:200});
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' ,status:500});
    }
  }
  