import { db } from '@/lib/db'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log("POST method")
    const body = await req.json();
    const { 
      order_id,
      payment_status,
      balance_outstanding,
      patient_id
     } = body;
    try {
      const transaction = await db.pos_order.create({
        data: {
          order_id,
          payment_status,
          balance_outstanding,
          patient_id
        },
      });
      return NextResponse.json({ transaction: transaction, message: 'Order created successfully'}, {status: 201})
    } catch (error) {
      return NextResponse.json({ transaction: null, message: 'Order failed to send'}, {status: 500})
    }
  } else {
    return NextResponse.json({ transaction: null, message: 'Method not allowed'}, {status: 405})
  }
}

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
      console.log("UPDATE method")
      const body = await req.json();
      const { 
        order_id,
        payment_status,
        balance_outstanding
       } = body;
      try {
        const transaction = await db.pos_order.update({
          where: { order_id},
          data: {
            payment_status,
            balance_outstanding
          },
        });
        return NextResponse.json({ transaction: transaction, message: 'Order updated successfully'}, {status: 200})
      } catch (error) {
        return NextResponse.json({ transaction: null, message: 'Order failed to send'}, {status: 500})
      }
    } else {
      return NextResponse.json({ transaction: null, message: 'Method not allowed'}, {status: 405})
    }
  }