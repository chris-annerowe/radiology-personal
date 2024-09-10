'use server'

import { getTransactions } from '@/actions/pos'
import { POSTransaction } from '@/types/pos'
import PaymentTable from '@/ui/dashboard/accessioning/payment/outstanding-payment-table'
import React from 'react'

const Payment = async () => {
  const outstandingTransactions:any[] = []

  const getOutstanding = async () => {
    const transactions = await getTransactions()
    transactions.map(transaction => {
      let temp:POSTransaction = {
        patient_id: "",
        patient_first_name:'',
        patient_last_name:'',
        numOfStudies: 0,
        amountPaid: 0,
        outstandingBalance: 0,
        insuranceAmt: 0,
        taxPaid: 0,
        discountAmt: 0,
        totalBillable: 0,
        transaction_id: 0
      }
  
      temp.amountPaid = transaction.amountPaid,
      temp.numOfStudies = transaction.numOfStudies,
      temp.outstandingBalance = transaction.outstandingBalance,
      temp.patient_first_name = transaction.patient_first_name,
      temp.patient_last_name = transaction.patient_last_name

      outstandingTransactions.push(temp)
    })
  }
  const call = await getOutstanding()


  return (
    <>
      <PaymentTable transactions={outstandingTransactions}/>
    </>
  )
}

export default Payment