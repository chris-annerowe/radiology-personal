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
            outstanding_balance: {
                gt: 0
            }
        }
    })
    console.log("POS Transactions with outstanding balance: ",transactions)
    
    return transactions
}

export const getPaymentTypes = async () => {
    const types = await db.pos_payment_options.findMany()
    console.log("Payment types: ",types)

    return types
}

export const getMostRecentPerOrderNo = async () => {
    const transactions =await db.$queryRaw`
    SELECT t1.*
    FROM pos_transactions t1
    INNER JOIN (
      SELECT order_id, MAX(timestamp) as max_timestamp
      FROM pos_transactions
      GROUP BY order_id
    ) t2
    ON t1.order_id = t2.order_id AND t1.timestamp = t2.max_timestamp
  `;
    console.log("Last transaction per order: ",transactions)
    return transactions
}

export const saveTransaction = async (
    total: number,
    discountAmt: number,
    insuranceAmt: number,
    taxPaid: number,
    amountPaid: number,
    outstanding_balance: number,
    patient_first_name: string,
    patient_last_name: string,
    patient_id: string,
    numOfStudies: number,
    order_id: string
) => {
    try{
        await db.pos_transactions.create({
            data: {
                patient_id,
                order_id,
                patient_first_name,
                patient_last_name,
                numOfStudies,
                totalBillable: total,
                discountAmt,
                insuranceAmt,
                taxPaid,
                amountPaid,
                outstanding_balance
            }
        })
        console.log("Transaction successfully created")
    }catch(e){
    console.log(e)
    }
}

export const getCompletedOrderTransactions = async () => {
    try{
        const transactions = await db.$queryRaw`
        SELECT t.*
        FROM pos_transactions t
        JOIN pos_order o ON t.order_id = o.orderno
        WHERE o.payment_status IN ('Completed', 'Invoiced');`
        console.log("Completed order details ",transactions)
        return transactions
    }catch(e){
        console.log(e)
    }
}