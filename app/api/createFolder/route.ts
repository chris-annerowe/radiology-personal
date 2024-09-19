import fs from 'fs';
import { NextResponse } from 'next/server';
import {join} from 'path';

export async function POST(req:any) {
  if (req.method === 'POST') {
    const body = await req.json()
    const { folderName } = body;
    
    // Define the path where you want to create the folder
    const dirPath = join("/", "patientData", folderName);
    
    // Check if the directory already exists
    if (!fs.existsSync(dirPath)) {
      // Create the directory
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Open ${dirPath} to see the created folder`)
      return NextResponse.json({ message: 'Folder created successfully' ,status:200});
    } else {
      return NextResponse.json({ message: 'Folder already exists', status: 400 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed', status: 405 });
  }
}
