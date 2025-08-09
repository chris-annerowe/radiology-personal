'use client'

import { POSTransaction } from "@/types/pos";
import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import Image from "next/image";

 
 export default function DailySalesTable(props:{date:string | null}){
    const [details, setDetails] = useState<POSTransaction[]>([])


    const completedOrders = async () => {
        setDetails([])
        const resp = await fetch(`/api/getCompletedOrderTransactions?date=${props.date}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json()
        setDetails(prevDetails => {
            const existingIds = new Set(prevDetails.map(d => d.transaction_id));
            const newDetails = data.transactions.filter(d => !existingIds.has(d.transaction_id));
            return [...prevDetails, ...newDetails];
        });
        console.log("Order details: ",data.transactions)
        return data.transactions
    }

    const handleDownload = () => {
        const element = document.getElementById("generatePDF")
        console.log("Element to generate ",element)
        html2pdf(element, {
            margin: 20,
            filename: 'DailySalesReport.pdf'
        })
        
    }

    useEffect(()=>{
        completedOrders()
    },[])


    return (
        <div id="generatePDF" className="max-w-4xl mx-auto px-6 py-8 bg-white text-gray-900 shadow-md rounded-md">
            {/* Header */}
            {/* <div className="flex justify-center mb-2">
                <Image
                src="/assets/logo.png"
                alt="Company Logo"
                width={120}
                height={60}
                priority
                />
            </div> */}

             {/* Metadata */}
            <div className="flex grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                <h3 className="mt-4 text-lg font-semibold underline">Daily Sales Report</h3>
                <p><span className="font-medium">Date:</span> {props.date}</p>
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm border border-gray-300 mb-6">
                <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Cost</th>
                    <th className="p-2 text-left">Provider</th>
                    <th className="p-2 text-left">Cash</th>
                    <th className="p-2 text-left">Credit/Debit Card</th>
                    <th className="p-2 text-left">Insurance</th>
                    <th className="p-2 text-left">Insurance Provider</th>
                    <th className="p-2 text-left">Items</th>
                </tr>
                </thead>
                <tbody>
                {details.map((d, index) => (
                <tr key={index} className="border-b border-gray-200">
                    <td className="p-2">{d.patient_last_name}, {d.patient_first_name}</td>
                    <td className="p-2">{d.totalBillable.toFixed(2)}</td>
                    <td className="p-2">{d.clientProvider}</td>
                    <td className="p-2">{d.paymentType === 'cs' ? `$${d.amountPaid.toFixed(2)}` : ''}</td>
                    {/* TODO: check if need to subtract insurance amount from amt paid*/}
                    <td className="p-2">{d.paymentType === 'cc' || d.paymentType === 'db' ? `$${d.amountPaid.toFixed(2)}` : ''}</td>
                    <td className="p-2">${d.insuranceAmt.toFixed(2)}</td>
                    <td className="p-2">{d.insuranceProvider}</td>
                    <td className="p-2">{d.items}</td>
                </tr>
                ))}
                </tbody>
            </table>

            {/* Download */}
            <div className="flex justify-end">
                <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                data-html2canvas-ignore
                >
                Download Report
                </button>
            </div>
        </div>
    )
 }