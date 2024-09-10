'use client'
import { POSTransaction } from "@/types/pos";
import { Table } from "flowbite-react";

interface PaymentTableProps {
    transactions:POSTransaction[]
}

export default function PaymentTable(props:PaymentTableProps) {
console.log("Table: ",props.transactions)
    return (
        <>
            <div>
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>Patiet First Name</Table.HeadCell>
                        <Table.HeadCell>Patiet Last Name</Table.HeadCell>
                        <Table.HeadCell>Number of Studies</Table.HeadCell>
                        <Table.HeadCell>Amount Paid</Table.HeadCell>
                        <Table.HeadCell>Outstanding Balance</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {props.transactions.map((transaction,index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{transaction.patient_first_name}</Table.Cell>
                                <Table.Cell>{transaction.patient_last_name}</Table.Cell>
                                <Table.Cell>{transaction.numOfStudies}</Table.Cell>
                                <Table.Cell>{transaction.amountPaid}</Table.Cell>
                                <Table.Cell>{transaction.outstandingBalance}</Table.Cell>
                                <Table.Cell></Table.Cell>
                                {/* TODO: add timestamp to transaction db */}
                            </Table.Row>
                        ))}
                        
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}