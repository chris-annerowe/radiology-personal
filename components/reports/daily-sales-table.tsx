'use client'

import { Button, Table } from "flowbite-react";
import { POSOrder, POSTransaction } from "@/types/pos";
import html2pdf from "html2pdf.js";
import { useState } from "react";
import Image from "next/image";

 
 export default function DailySalesTable(props:{date:string | null}){
    const [total, setTotal] = useState(200)

    const rate = 1.99


    const handleDownload = () => {
        const element = document.getElementById("generatePDF")
        console.log("Element to generate ",element)
        html2pdf(element, {
            margin: 20,
            filename: 'DailySalesReport.pdf'
        })
        
    }

    
    const getOrders = async () => {
        const resp = await fetch('/api/saveOrder',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json();
        console.log("Orders: ",data.orders)
        return data.orders
    }

    const getTransactions = async () => {
        const resp = await fetch('/api/saveTransaction',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json();
        console.log("Transactions: ",data.transactions)
        return data.transactions
    }
    
    let orders:POSOrder[] = getOrders()
    let transactions:POSTransaction[] = getTransactions()

    console.log("Array ",Array.isArray(orders))

    const getTotals = () => {
        try{
            const mappedOrders = orders.map(order => {
                const matchingTransaction = transactions.find(tx => tx.order_id === order.orderno);
                console.log("Matching transaction ",matchingTransaction)
              
                return {
                  ...order,
                  transaction: matchingTransaction || null, // include matched transaction or null if none
                };
              });

        }catch(e){
            console.warn("Error retrieving totals. ",e)
        }
    }
    
    const totals = getTotals()

    return (
        <div id="generatePDF" className="max-w-4xl mx-auto px-6 py-8 bg-white text-gray-900 shadow-md rounded-md">
            {/* Header */}
            <div className="flex justify-center mb-2">
                <Image
                src="/assets/logo.png"
                alt="Company Logo"
                width={120}
                height={60}
                priority
                />
            </div>

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
                    <th className="p-2 text-left">Cash</th>
                    <th className="p-2 text-left">Credit/Debit Card</th>
                    <th className="p-2 text-left">Insurance</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b border-gray-200">
                    <td className="p-2">$</td>
                    <td className="p-2">$</td>
                    <td className="p-2">$</td>
                </tr>
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