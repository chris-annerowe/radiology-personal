import { db } from "@/lib/db"

export const getClientProviders = async () => {
    const providers = await db.pos_clientProviders.findMany()

    return providers
}

export const getInsuranceProviders = async () => {
    const providers = await db.pos_insurance.findMany()

    return providers
}

export const getTransactions = async () => {
    const transactions = await db.pos_transactions.findMany({
        where: {
            outstandingBalance: {
                gt: 0
            }
        }
    })
    console.log("POS Transactions with outstanding balance: ",transactions)
    
    return transactions
}

export const saveTransaction = async (
    total: number,
    discountAmt: number,
    insuranceAmt: number,
    taxPaid: number,
    amountPaid: number,
    outstandingBalance: number,
    patient_first_name: string,
    patient_last_name: string,
    patient_id: string,
    numOfStudies: number
) => {
    try{
        await db.pos_transactions.create({
            data: {
                patient_id,
                patient_first_name,
                patient_last_name,
                numOfStudies,
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