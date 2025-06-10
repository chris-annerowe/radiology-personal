'use server'

import { getClientProviders, getInsuranceProviders, getMostRecentPerOrderNo } from '@/actions/pos'
import { ClientProvider, InsuranceProvider, POSTransaction } from '@/types/pos'
import PaymentTable from '@/ui/dashboard/accessioning/payment/outstanding-payment-table'
import React from 'react'

const Payment = async () => {
  let outstandingTransactions:POSTransaction[] = []
  let clientProviders:ClientProvider[] = []
  let insuranceProviders:InsuranceProvider[] = []

  const fetchClientProviders = async () => {
      const providers = await getClientProviders()
      clientProviders = []
      providers.map(prov=>{
          let temp:ClientProvider = {
              clientprov_desc: '',
              clientprov_id: undefined,
              clientprov_name: '',
              clientprov_type: undefined,
              active: false
          }
              //assign each client provider in list to temp then add each temp provider to array
              temp.clientprov_id = prov.clientprov_id
              temp.clientprov_name = prov.clientprov_name
              temp.clientprov_type = prov.clientprov_type
              temp.clientprov_desc = prov.clientprov_desc
              temp.active = prov.active
  
              clientProviders.push(temp)
          })
      return clientProviders
  }

  const fetchInsuranceProviders = async () => {
      const providers = await getInsuranceProviders()
      insuranceProviders = []
      providers.map(prov=> {
          let temp:InsuranceProvider = {
                  insurance_id: '',
                  insurance_name: '',
                  user_id: null,
                  last_modified: null,
                  in_use: null,
                  ins_abbreviation: '',
                  bin_nos: '',
                  bin_codes: ''
          }
          temp.insurance_id = prov.insurance_id
          temp.insurance_name = prov.insurance_name
          temp.user_id = prov.user_id
          temp.last_modified = prov.last_modified
          temp.in_use = prov.in_use
          temp.ins_abbreviation = prov.ins_abbreviation
          temp.bin_nos = prov.bin_nos
          temp.bin_codes = prov.bin_codes

          insuranceProviders.push(temp)
      })
      return insuranceProviders
  }

  const getOutstanding = async () => {
    const transactions = await getMostRecentPerOrderNo()
    console.log("Most recent order")
    outstandingTransactions = []
    transactions.map(transaction => {
      let temp:POSTransaction = {
        patient_id: "",
        order_id: "",
        patient_first_name:'',
        patient_last_name:'',
        numOfStudies: 0,
        amountPaid: 0,
        outstanding_balance: 0,
        insuranceAmt: 0,
        taxPaid: 0,
        discountAmt: 0,
        totalBillable: 0,
        transaction_id: 0,
        paidBy: '',
        paymentType: '',
        clientProvider: '',
        insuranceProvider: '',
        timestamp: new Date()
      }
  
      temp.amountPaid = transaction.amountPaid,
      temp.order_id = transaction.order_id,
      temp.numOfStudies = transaction.numOfStudies,
      temp.outstanding_balance = transaction.outstanding_balance,
      temp.patient_first_name = transaction.patient_first_name,
      temp.patient_last_name = transaction.patient_last_name,
      temp.patient_id = transaction.patient_id,
      temp.insuranceAmt = transaction.insuranceAmt,
      temp.taxPaid = transaction.taxPaid,
      temp.discountAmt = transaction.discountAmt !== null ? transaction.discountAmt : 0,
      temp.totalBillable = transaction.totalBillable,
      temp.transaction_id = transaction.transaction_id,
      temp.insuranceProvider = transaction.insuranceProvider,
      temp.clientProvider = transaction.clientProvider,
      temp.paidBy = transaction.paidBy,
      temp.paymentType = transaction.paymentType

      if(transaction.outstanding_balance > 0){
        outstandingTransactions.push(temp)
      }
    })
  }
  const call = await getOutstanding()
  const client = await fetchClientProviders()
  const insurance = await fetchInsuranceProviders()
  console.log("Outstanding count: ",outstandingTransactions.length)

  return (
    <>
      <PaymentTable transactions={outstandingTransactions} clientProviders={clientProviders} insuranceProviders={insuranceProviders}/>
    </>
  )
}

export default Payment