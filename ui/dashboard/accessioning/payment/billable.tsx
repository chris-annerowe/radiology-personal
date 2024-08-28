import { Button, Table } from "flowbite-react";

interface BillableProps{
    subtotal?: number,
    insurance?: number,
    taxable?: number
}

export default function Billable(props:BillableProps) {
    const completeOrder = () => {
        console.log("Paid")
    }

    let billable = props.subtotal ? props.subtotal : 0.00 //the subtotal minus insurance
    let netTotal = billable
    let total = netTotal - (props.taxable ? (props.taxable * 0.15) : 0.00)
    
    return (
        <>
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-3">Billable</h3>
                
                <div className="border-t border-2 border-transparent my-2"></div>
                <Table className=" text-right">
                        <Table.Head>
                            <Table.HeadCell>Total Cost</Table.HeadCell>
                            <Table.HeadCell>Insurance (-) </Table.HeadCell>
                            <Table.HeadCell>Billable</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{props.subtotal ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.subtotal) : new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(billable)}</Table.Cell>
                                    <Table.Cell>{props.insurance ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.insurance) : 0.00}</Table.Cell>
                                    <Table.Cell>{props.insurance ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(billable-props.insurance) : new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(billable)}</Table.Cell> 
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
                                <Table.Cell>
                                    0.00
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Net Total
                                </Table.Cell>
                                <Table.Cell>
                                    {new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(netTotal)}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Tax
                                </Table.Cell>
                                <Table.Cell>
                                    {props.taxable ? new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(props.taxable * 0.15) : 0.00}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Total Billable
                                </Table.Cell>
                                <Table.Cell>
                                    {new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(total )}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className="flex my-8 justify-end">
                        <Button className="w-40" type="submit" color="blue" onClick={()=>completeOrder()}>Pay</Button>
                    
                </div>
            </div>
        </>
    )
}