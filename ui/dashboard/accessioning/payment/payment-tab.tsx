'use client'

import { Study } from "@/types/studies";
import { Button, Popover, Table, TabsRef, } from "flowbite-react";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { HiPlus, HiSearch, HiTrash } from "react-icons/hi";
import { Patient } from "@/types/patient";
import { deletePatientStudy, findPatientStudyByStudyId } from "@/actions/studies";
import Payments from "./payments";




interface PaymentTabProps {
    studies?: Study[],
    patient?: Patient,
    // tabsRef: RefObject<TabsRef>,
    // activeTab: number, 
    // setActiveTab:Dispatch<SetStateAction<number>>
}

export default function PaymentTab(props: PaymentTabProps) {


    // const goToNext = () => {
    //     props.tabsRef.current?.setActiveTab(props.activeTab+1)
    // }

    
    return (
        <>
        <div>
              <Table >
                        <Table.Head>
                            <Table.HeadCell>Item Description</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Ins Provider</Table.HeadCell>
                            <Table.HeadCell>Ins %</Table.HeadCell>
                            <Table.HeadCell>Balance</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Add</span>
                        </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                        {
                            props.studies?.map((study,index)=>(
<Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{study.study_name}</Table.Cell>
                                    <Table.Cell>{study.price}</Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>{study.price}</Table.Cell>                                    
                                    <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Add
                                            </div>)}>
                                        <Button className="font-medium text-cyan-600 dark:text-cyan-500 text-center dark:bg-gray-800" onClick={()=>{null}} >
                                            Add Insurance 
                                            {/* <HiPlus size={18} className="mx-auto" /> */}
                                        </Button>

                                    </Popover>
                                </Table.Cell>
                                </Table.Row>
                            ))}

                        </Table.Body>
                        </Table>
                     <div className="flex space-x-4">
                        <Payments />
                     </div>
                    </div>
        </>
    )
}