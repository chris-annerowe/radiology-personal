import { db } from '@/lib/db'
import { Prisma } from '@prisma/client';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log("POST method")
    const body = await req.json();
    const { 
      orderno,
      payment_status,
      balance_outstanding,
      patient_id
     } = body;
    try {
      const order = await db.pos_order.create({
        data: {
          orderno,
          payment_status,
          balance_outstanding,
          patient_id,
          last_modified: new Date()
        },
      });
      return NextResponse.json({ order: order, message: 'Order created successfully'}, {status: 201})
    } catch (error) {
      console.log("Error creating order ",error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        console.log("Error: "+error.message);
        if (error.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      return NextResponse.json({ order: null, message: 'Order failed to send'}, {status: 500})
    }
  } else {
    return NextResponse.json({ order: null, message: 'Method not allowed'}, {status: 405})
  }
}

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
      console.log("UPDATE method")
      const body = await req.json();
      const { 
        orderno,
        payment_status,
        balance_outstanding
       } = body;
      try {
        const order = await db.pos_order.update({
          where: { orderno},
          data: {
            payment_status,
            balance_outstanding
          },
        });
        return NextResponse.json({ order: order, message: 'Order updated successfully'}, {status: 200})
      } catch (error) {
        return NextResponse.json({ order: null, message: 'Order failed to send'}, {status: 500})
      }
    } else {
      return NextResponse.json({ order: null, message: 'Method not allowed'}, {status: 405})
    }
  }

  export async function GET() {
    try {
      // get orders for the previous month, 1st to 1st of current month
      const previousMonthStart = startOfMonth(subMonths(new Date(), 1));
      const previousMonthEnd = endOfMonth(subMonths(new Date(), 1));
  
      const orders = await db.pos_order.findMany({
        where: {
          last_modified: {
            gte: previousMonthStart,
            lte: previousMonthEnd,
          },
        },
      });
  
      return NextResponse.json({ orders: orders, message: 'Orders retrieved successfully' ,status:200});
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' ,status:500});
    }
  }