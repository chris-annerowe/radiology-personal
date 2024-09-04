import { db } from "@/lib/db"

export const getClientProviders = async () => {
    const providers = await db.pos_clientProviders.findMany()

    return providers
}

export const getInsuranceProviders = async () => {
    const providers = await db.pos_insurance.findMany()

    return providers
}

export const saveTransaction = async (
    total: number,
    discountAmt: number,
    insuranceAmt: number,
    taxPaid: number,
    amountPaid: number,
    outstandingBalance: number
) => {
    try{
        await db.pos_transactions.create({
            data: {
                totalBillable: total,
                discountAmt,
                insuranceAmt,
                taxPaid,
                amountPaid,
                outstandingBalance
            }
        })
        console.log("Transaction successfully created")
    }catch(e){
    console.log(e)
    }
}