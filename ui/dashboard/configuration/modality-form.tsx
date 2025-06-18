"use client"

import AddModality from "@/ui/modals/add-modality-modal"
import { Button, Pagination, Popover, Table } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { HiOutlinePencilAlt, HiPlus, HiTrash } from "react-icons/hi"


interface Modality{
    name: string,
    code: string
}
export default function ModalityList(){
    let tempModality:Modality[] = []
    const [modalities, setModalities] = useState<Modality[]>([])
    const [openModal, setOpenModal] = useState(false)

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
        setModalities(tempModality)
        console.log("Modality List: ",data.modalities, tempModality)
    }

    useEffect(()=>{
        getModalities()
    },[])    

    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <div className="overflow-x-auto">
            <AddModality open={openModal} onClose={closeModal} />
            <div className="flex space-x-4">
                <Button className="mb-4" onClick={() => setOpenModal(true)}>
                    <HiPlus className="mr-2 h-5 w-5" />
                        Add Modality
                </Button>         
            </div>
            
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