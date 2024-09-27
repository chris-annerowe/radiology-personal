import { Patient } from "@/types/patient";
import { InsuranceData, POSTransaction, PaymentData } from "@/types/pos";
import { Button, Table } from "flowbite-react";
import { useRouter } from "next/navigation";

interface BillableProps{
    subtotal: number,
    insurance: (number),
    insuranceData: InsuranceData,
    taxable: number,
    patient: Patient,
    numOfStudies: number,
    amtPaid: number,
    paymentData: PaymentData,
    order_id: string,
    outstandingTransaction?: POSTransaction,
    onClose: () => void
}

export default function Billable(props:BillableProps) {
    const router = useRouter()

    //TODO: create new order and save to db
    async function completeOrder() {
        let transaction:POSTransaction = {
            patient_id: "",
            order_id: "",
            patient_first_name:'',
            patient_last_name:'',
            numOfStudies: 0,
            amountPaid: 0,
            outstandingBalance: 0,
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

        //check if outstanding order or new order
        if(props.outstandingTransaction){
            console.log("Existing order")
            transaction.order_id = props.outstandingTransaction.order_id
            transaction.patient_id = props.outstandingTransaction.patient_id
            transaction.patient_first_name = props.outstandingTransaction.patient_first_name
            transaction.patient_last_name = props.outstandingTransaction.patient_last_name
            transaction.insuranceAmt = props.outstandingTransaction.insuranceAmt
            transaction.insuranceProvider = props.outstandingTransaction.insuranceProvider
            transaction.numOfStudies = props.outstandingTransaction.numOfStudies
            transaction.totalBillable = props.outstandingTransaction.totalBillable
            transaction.discountAmt = props.outstandingTransaction.discountAmt
            transaction.taxPaid = props.outstandingTransaction.taxPaid
            
            transaction.amountPaid = props.amtPaid
            transaction.outstandingBalance = props.outstandingTransaction.outstandingBalance - props.amtPaid
            transaction.clientProvider = props.paymentData.provider
            transaction.paidBy = props.paymentData.paidBy
            transaction.paymentType = props.paymentData.paymentType
            
            console.log("Call update")
            updateOrder()
            try {
                const response = await fetch('/api/saveTransaction', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    total: transaction.totalBillable,
                    insurance: transaction.insuranceAmt,
                    tax: transaction.taxPaid,
                    amtPaid: transaction.amountPaid,
                    balance: transaction.outstandingBalance,
                    patient_last_name: transaction.patient_last_name,
                    patient_first_name: transaction.patient_first_name,
                    patient_id: transaction.patient_id,
                    numOfStudies: transaction.numOfStudies,
                    paidBy: props.paymentData?.paidBy,
                    paymentType: props.paymentData?.paymentType,
                    insuranceProvider: transaction.insuranceProvider,
                    clientProvider: props.paymentData.provider,
                    order_id: props.order_id,
                  }),
                });
            
                if (response.ok) {
                  const result = await response.json();
                  console.log('Paid', result);
                    router.push('/')
                } else {
                  console.error('Failed to save transaction');
                }
              } catch (e) {
                    console.log(e);
                }

            //do not save existing orders if no payment is being made
            if(props.amtPaid === 0){
                console.log("No payment")
                props.onClose()
            }
        }
        else{

         saveOrder()
         try {
            const response = await fetch('/api/saveTransaction', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                total,
                insurance: props.insurance,
                tax: props.taxable * 0.15,
                amtPaid: props.amtPaid,
                balance: total - props.amtPaid,
                patient_last_name: props.patient.last_name,
                patient_first_name: props.patient.first_name,
                patient_id: props.patient.patient_id,
                numOfStudies: props.numOfStudies,
                paidBy: props.paymentData?.paidBy,
                paymentType: props.paymentData?.paymentType,
                insuranceProvider: props.insuranceData.insuranceProv,
                clientProvider: props.paymentData.provider,
                order_id: props.order_id,
              }),
            });
        
            if (response.ok) {
              const result = await response.json();
              console.log('Paid', result);
                router.push('/')
            } else {
              console.error('Failed to save transaction');
            }
          } catch (e) {
                console.log(e);
            }
        }
    }

    async function saveOrder() {
        //if no existing order sent as prop, save as new order
        if(!props.outstandingTransaction || props.outstandingTransaction.order_id === ""){
            let payment_status = "Pending"
            let balance = total
            if(total - props.amtPaid === 0){
                payment_status = "Completed"
            }
            if(props.outstandingTransaction?.outstandingBalance){
                balance = props.outstandingTransaction?.outstandingBalance
            }

            try{
                const response = await fetch('/api/saveOrder', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      order_id: props.order_id,
                      patient_id: props.patient.patient_id,
                      payment_status: payment_status,
                      balance_outstanding: balance - props.amtPaid
                    }),
                  });
              
                  if (response.ok) {
                    const result = await response.json();
                    console.log('Order created', result)
                  } else {
                    console.error('Failed to save order');
                  }
            } catch(e){
                console.log(e)
            }
        } 
    }

    async function updateOrder() {
        if(props.outstandingTransaction && props.outstandingTransaction.order_id !== ""){
            let payment_status = "Pending"
            let balance = total
            if(props.outstandingTransaction.outstandingBalance - props.amtPaid === 0){
                payment_status = "Completed"
            }
            if(props.outstandingTransaction?.outstandingBalance){
                balance = props.outstandingTransaction?.outstandingBalance
            }

            try{
                const response = await fetch('/api/saveOrder', {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      order_id: props.order_id,
                      payment_status: payment_status,
                      balance_outstanding: balance - props.amtPaid
                    }),
                  });
              
                  if (response.ok) {
                    const result = await response.json();
                    console.log('Order updated', result)
                  } else {
                    console.error('Failed to save order');
                  }
            } catch(e){
                console.log(e)
            }
        } 
    }

    let billable = props.subtotal ? props.subtotal - (typeof props.insurance === 'number' ? props.insurance : 0.00) : 0.00 //the subtotal minus insurance
    let netTotal = billable 
    let total = netTotal + (props.taxable ? (props.taxable * 0.15) : 0.00)
    return (
        <>
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-3">Billable</h3>
                
                <div className="border-t border-2 border-transparent my-2 mr-0"></div>
                <Table className=" text-right">
                        <Table.Head>
                            <Table.HeadCell>Total Cost</Table.HeadCell>
                            <Table.HeadCell className={props.outstandingTransaction && 'text-red-700'}>{props.outstandingTransaction && props.outstandingTransaction.amountPaid > 0 ? 'Amount Paid' : 'Insurance (-)' }</Table.HeadCell>
                            <Table.HeadCell>Billable</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="text-right">{props.subtotal ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.subtotal) : new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(billable)}</Table.Cell>
                                    <Table.Cell className={props.outstandingTransaction ? 'text-red-700 text-right' :'text-right'}>{props.outstandingTransaction && props.outstandingTransaction.amountPaid > 0 ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.outstandingTransaction.amountPaid) : (typeof props.insurance === 'number' ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.insurance) : new Intl.NumberFormat('en-IN',{style:'currency',currency:'USD'}).format(0.00))}</Table.Cell>
                                    <Table.Cell className="text-right">{props.outstandingTransaction ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.outstandingTransaction.outstandingBalance) : new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(billable)}</Table.Cell> 
                            </Table.Row>
                        </Table.Body>
                </Table>
                <div className="flex pt-2 text-right justify-end justify-items-end ">
                    <Table>
                        <Table.Body>
                        {!props.outstandingTransaction && (
                            <>
                            <Table.Row>
                                <Table.Cell>
                                    Discount (-)
                                </Table.Cell>
                                <Table.Cell className="text-right">
                                    {new Intl.NumberFormat('en-IN',{style:'currency',currency:'USD'}).format(0.00)}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Net Total
                                </Table.Cell>
                                <Table.Cell className="text-right">
                                    {new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(netTotal)}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Tax (+)
                                </Table.Cell>
                                <Table.Cell className="text-right">
                                    {props.taxable ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.taxable * 0.15) : new Intl.NumberFormat('en-IN',{style:'currency',currency:'USD'}).format(0.00)}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Total Billable
                                </Table.Cell>
                                <Table.Cell className="text-right">
                                    {new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(total )}
                                </Table.Cell>
                            </Table.Row>
                            </>
                            )}
                            {props.amtPaid > 0 ? (
                                <>
                                <Table.Row>
                                    <Table.Cell>
                                        Payment
                                    </Table.Cell>
                                    <Table.Cell className="text-right">
                                        {new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.amtPaid )}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="text-red-700">
                                        Outstanding Balance
                                    </Table.Cell>
                                    <Table.Cell className="text-right text-red-700">
                                        {props.outstandingTransaction ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(total - props.amtPaid - props.outstandingTransaction.amountPaid) : new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(total - props.amtPaid )}
                                    </Table.Cell>
                                </Table.Row>
                                </>
                            ) : null}
                        </Table.Body>
                    </Table>
                </div>
                
                <div className="flex my-8 justify-end">
                        <Button className="w-40" type="submit" color="blue" onClick={()=>completeOrder()}>{props.amtPaid > 0 ? 'Pay' : 'Save'}</Button>
                    
                </div>
            </div>
        </>
    )
}