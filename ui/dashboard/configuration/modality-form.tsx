"use client"

import { Pagination, Popover, Table } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi"


interface Modality{
    name: string,
    code: string
}
export default function ModalityList(){
    let tempModality:Modality[] = []
    const [modalities, setModalities] = useState<Modality[]>([])

    const getModalities = async () => {
        const resp = await fetch('/api/getModalities',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        })
    
        const data = await resp.json();
        data.modalities.map((modality)=>{
            let temp:Modality = {
                name: modality.modality_name,
                code: modality.modality_code
            }
            tempModality.push(temp)
        })
    // temp = {
    //     name: data.modality_name,
    //     code: data.modality_code
    // }
        setModalities(tempModality)
        console.log("Modality List: ",data.modalities, tempModality)
    }

    useEffect(()=>{
        getModalities()
    },[])    


    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Code</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Delete</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        modalities.map((modality, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{modality.name}</Table.Cell>
                                <Table.Cell>{modality.code}</Table.Cell>
                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Edit
                                            </div>)}>
                                        <Link href={``} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiOutlinePencilAlt size={18} className="mx-auto" />
                                        </Link>
                                    </Popover>
                                </Table.Cell>

                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Delete
                                            </div>)}>
                                        <Link href={``} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiTrash size={18} className="mx-auto" />
                                        </Link>
                                    </Popover>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>

        </div>
    )

}