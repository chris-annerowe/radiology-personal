import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File

    if(!file) {
        return NextResponse.json({message: 'No file to upload', success: false})
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    //File data is now in the buffer, you can save or send as email
    const path = join('/','patientData','patient_id', file.name)
    await writeFile(path,buffer)
    console.log(`Open ${path} to see the uploaded file`)

    return NextResponse.json({message: 'File uploaded successfully!', success: true})
}