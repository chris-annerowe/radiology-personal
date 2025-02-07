// pages/api/printInvoice.js
import { NextResponse } from 'next/server';
import qz from 'qz-tray';

export async function POST(req:any) {
  if (req.method === 'POST') {
    const { invoiceData } = await req.json()

    try {
      await qz.websocket.connect();
      const printers = await qz.printers.find();
      console.log("All printers: ",printers)
      const config = qz.configs.create('PDF');
      await qz.print(config, [{ type: 'pixel', format: 'html', flavor: 'plain', data: invoiceData }]);
      await qz.websocket.disconnect();
      return NextResponse.json({ message: 'Invoice sent to printer successfully', status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to send invoice to printer', status: 500 });
    }
  } else {
    // res.setHeader('Allow', ['POST']);
    return NextResponse.json(`Method ${req.method} Not Allowed`);
  }
};
