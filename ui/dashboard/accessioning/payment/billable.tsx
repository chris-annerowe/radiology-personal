import { Button, Table } from "flowbite-react";

interface BillableProps{
    subtotal?: number,
    insurance?: number
}

export default function Billable(props:BillableProps) {
    const completeOrder = () => {
        console.log("Paid")
    }

    let billable = props.subtotal ? props.subtotal : 0.00 //the subtotal minus insurance
    let total = billable
    
    return (
        <>
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-3">Billable</h3>
                
                <div className="border-t border-2 border-transparent my-4"></div>
                <Table >
                        <Table.Head>
                            <Table.HeadCell>Total Cost</Table.HeadCell>
                            <Table.HeadCell>Insurance (-) </Table.HeadCell>
                            <Table.HeadCell>Billable</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{props.subtotal}</Table.Cell>
                                    <Table.Cell>{props.insurance}</Table.Cell>
                                    <Table.Cell>{props.insurance ? billable-props.insurance : billable}</Table.Cell> 
                            </Table.Row>
                        </Table.Body>
                </Table>
                <div className="flex pt-2 justify-end">
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
                                    0.00
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Tax
                                </Table.Cell>
                                <Table.Cell>
                                    0.00
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Total Billable
                                </Table.Cell>
                                <Table.Cell>
                                    {total}
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