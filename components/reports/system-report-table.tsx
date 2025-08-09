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
            {/* TODO: Update company details */}
            <div className="text-center my-6 ml-5">
                <h2 className="text-xl font-bold">AYE Technologies Limited</h2>
                <p className="text-sm">2 Trafalgar Road, Kingston 5, Jamaica W.I.</p>
                <p className="text-sm">Ph: (876)620-7533  |  Fax: (876)620-7533</p>
                <p className="text-sm">info@aye-tech.com</p>
            </div>

            </div>
            
            {/* Metadata */}
            <div className="flex grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                <h3 className="mt-4 text-lg font-semibold underline">Invoice</h3>
                <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
                <p><span className="font-medium">Invoice #:</span> 4691</p>
                <p><span className="font-medium">GCT Reg#:</span> 001-995-812</p>   {/* TODO: Update invoice details */}
                </div>
                <div className="mt-9">
                <p><span className="font-bold">Bill To:</span> Kris Radiology Limited</p>
                <p>56 Ward Avenue, Mandeville, Manchester</p>
                <p>Jamaica</p>
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm border border-gray-300 mb-6">
                <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">U/M</th>
                    <th className="p-2 text-left">Contract Amt</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b border-gray-200">
                    <td className="p-2">{total}</td>
                    <td className="p-2">Software as a Service (SaaS) Orders processed by AyeLAB SaaS during month of {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}</td>
                    <td className="p-2">{rate}</td>
                    <td className="p-2 font-medium text-right">${total * rate}</td>
                </tr>
                </tbody>
            </table>

            {/* Totals */}
            <div className="text-right text-sm space-y-1 mb-6">
                <p><span className="font-medium">GCT (15%):</span> USD {(total * rate * 0.15).toFixed(2)}</p>
                <p className="text-base font-bold">Total: USD ${((total * rate) + (total * rate * 0.15)).toFixed(2)}</p>
            </div>

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