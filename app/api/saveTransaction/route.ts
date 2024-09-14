import { db } from '@/lib/db'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log("POST method")
    const body = await req.json();
    const { 
      total, 
      insurance, 
      tax, 
      amtPaid, 
      balance,
      patient_first_name,
      patient_last_name,
      patient_id,
      numOfStudies,
      paidBy,
      paymentType,
      clientProvider,
      insuranceProvider
     } = body;
    try {
      const transaction = await db.pos_transactions.create({
        data: {
          totalBillable: total,
          insuranceAmt: insurance,
          taxPaid: tax,
          amountPaid: amtPaid,
          outstandingBalance:balance,
          numOfStudies,
          patient_first_name,
          patient_last_name,
          patient_id,
          paidBy,
          paymentType,
          clientProvider,
          insuranceProvider
        },
      });
      return NextResponse.json({ transaction: transaction, message: 'Transaction saved successfully'}, {status: 201})
    } catch (error) {
      return NextResponse.json({ transaction: null, message: 'Transaction failed to send'}, {status: 500})
    }
  } else {
    return NextResponse.json({ transaction: null, message: 'Method not allowed'}, {status: 405})
  }
}