import { db } from "@/lib/db";
import { toJSON } from "@/lib/utils";
import { Study } from "@/types/studies";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";




export async function POST(req: Request) {
  if (req.method === 'POST') {
    console.log("POST method")
    console.log("Creating transaction details")
    const body = await req.json();
    const {
      orderno,
      transaction_id,
      trans_type,
      trans_code,
      src_id,
      debit_amount,
      credit_amount,
      studies       //array only used to control the amount of rows created, not actually saved to db
    } = body;
    try {
      const transaction = await db.posTransactionDetails.createMany({
        data: studies.map((study: Study, index: number) => {
          return {
            ordercode: orderno,
            transaction_id,
            seq_num: index+1,
            trans_type,
            trans_code,
            src_id,
            item_id: study.study_id,
            item_name: study.study_name,
            debit_amount,
            credit_amount,
            user_id: 1 //TODO: do not hardcode
          }
        })

      });
      return NextResponse.json({ transaction: JSON.parse(toJSON(transaction)), message: 'Transaction details created successfully' }, { status: 201 })
    } catch (error: any) {
      console.log("Error creating transaction details");
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
      return NextResponse.json({ message: 'Transaction details failed to send' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ transaction: null, message: 'Method not allowed' }, { status: 405 })
  }
}

// export async function PUT(req: Request) {
//   if (req.method === 'PUT') {
//     console.log("UPDATE method")
//     const body = await req.json();
//     const {
//       worklist_id,
//       orderno,
//     } = body;
//     try {
//       const transaction = await db.worklist.update({
//         where: { worklist_id, accession_number: orderno },
//         data: {

//         },
//       });
//       return NextResponse.json({ transaction: transaction, message: 'Order updated successfully' }, { status: 200 })
//     } catch (error) {
//       return NextResponse.json({ transaction: null, message: 'Order failed to send' }, { status: 500 })
//     }
//   } else {
//     return NextResponse.json({ transaction: null, message: 'Method not allowed' }, { status: 405 })
//   }
// }