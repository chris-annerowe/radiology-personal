import { Patient } from "@/types/patient";
import { InsuranceData, PaymentData } from "@/types/pos";
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
    paymentData: PaymentData
}

export default function Billable(props:BillableProps) {
    const router = useRouter()

    async function completeOrder() {
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
                clientProvider: props.paymentData.provider
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
                            <Table.HeadCell>Insurance (-) </Table.HeadCell>
                            <Table.HeadCell>Billable</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="text-right">{props.subtotal ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.subtotal) : new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(billable)}</Table.Cell>
                                    <Table.Cell className="text-right">{typeof props.insurance === 'number' ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.insurance) : new Intl.NumberFormat('en-IN',{style:'currency',currency:'USD'}).format(0.00)}</Table.Cell>
                                    <Table.Cell className="text-right">{props.insurance ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(billable) : new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(billable)}</Table.Cell> 
                            </Table.Row>
                        </Table.Body>
                </Table>
                <div className="flex pt-2 text-right justify-end justify-items-end ">
                    <Table>
                        <Table.Body>
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
                                        {new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(total - props.amtPaid )}
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