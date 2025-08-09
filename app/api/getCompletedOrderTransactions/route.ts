import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const date = searchParams.get('date'); // expects 'YYYY-MM-DD'
  
      if (!date) {
        return NextResponse.json({ error: 'Missing date parameter', status: 400 });
      }
  
      const transactions = await db.$queryRawUnsafe(`
        SELECT t.*
        FROM pos_transactions t
        JOIN pos_order o ON t.order_id = o.orderno
        WHERE o.payment_status IN ('Completed', 'Invoiced')
          AND DATE(t.timestamp) = DATE('${date}')
      `);
  
      return NextResponse.json({
        transactions,
        message: 'Order details retrieved successfully',
        status: 200,
      });
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error', status: 500 });
    }
  }
  