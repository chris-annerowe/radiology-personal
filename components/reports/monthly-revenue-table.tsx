'use client'

import { Button, Table } from "flowbite-react";
import { POSTransaction } from "@/types/pos";
import html2pdf from "html2pdf.js";
import { useState } from "react";
import Image from "next/image";

 
 export default function MonthlyRevenueTable(){
    const [total, setTotal] = useState(200)

    const rate = 1.99


    const handleDownload = () => {
        const element = document.getElementById("generatePDF")
        console.log("Element to generate ",element)
        html2pdf(element, {
            margin: 20,
            filename: 'MonthlyRevenueReport.pdf'
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
        //TODO: remove comment below once there are actual orders in the db
        // setTotal(data.orders.length)
        return data.orders
    }
    
    const orders:any[] = getOrders()
    let user:[number, string] = [1,'dev']
    console.log("Userr ",user[1])
    

    return (
        <div id="generatePDF" className="max-w-4xl mx-auto px-6 py-8 bg-white text-gray-900 shadow-md rounded-md">
            {/* Header */}
            <div className="grid grid-cols-12 items-start text-sm mb-6 border-b pb-4">
                {/* Logo */}
                <div className="col-span-2 flex items-start justify-start">
                    <Image
                    src="/assets/logo.png"
                    alt="Company Logo"
                    width={100}
                    height={50}
                    priority
                    />
                </div>

                {/* Company Info */}
                {/* TODO: Update company details */}
                <div className="col-span-6 text-left mt-4 pl-2 leading-tight">
                    <h3 className="text-lg font-bold text-gray-900">AYE Technologies Limited</h3>
                    <p className="font-medium text-gray-700">2 Trafalgar Road, Kingston 5, Jamaica W.I.</p>
                    <p className="font-medium text-gray-700">Ph: (876)620-7533 | Fax: (876)620-7533</p>
                    <p className="font-medium text-gray-700">info@aye-tech.com</p>
                </div>

                {/* Metadata */}
                <div className="col-span-4 text-right mt-6 leading-tight">
                    <p className="font-bold text-gray-900">Monthly Revenue Report</p>
                    <p className="font-medium text-gray-700">Date Range: {new Date().toLocaleDateString()}</p>
                    <p className="text-gray-700">Run Date: {new Date().toLocaleDateString()}</p>
                    <p className="text-gray-700">Run Time: {new Date().toLocaleTimeString()}</p>
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm border border-gray-300 mb-6">
                <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Unit Cost</th>
                    <th className="p-2 text-left">Total Cost</th>
                    <th className="p-2 text-left">Billed Total</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b border-gray-200">
                    <td className="p-2">study</td>
                    <td className="p-2">2</td>
                    <td className="p-2">$</td>
                    <td className="p-2">$</td>
                    <td className="p-2">$</td>
                </tr>
                </tbody>
                {/* Totals */}
                <tfoot>
                    <tr className="border-t border-gray-300 font-bold text-gray-900">
                        <td className="p-2 text-center" colSpan={2}>Grand Totals</td>
                        <td className="p-2 text-left">${(total * rate).toFixed(2)}</td>
                        <td className="p-2 text-left">${(total * rate + total * rate * 0.15).toFixed(2)}</td>
                        <td className="p-2 text-left">${(total * rate + total * rate * 0.15).toFixed(2)}</td>
                    </tr>
                </tfoot>
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