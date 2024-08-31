'use client'

import { Study } from "@/types/studies";
import { Button, Popover, Select, Table, TabsRef, } from "flowbite-react";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi";
import AddStudyModal from "./add-study-modal";
import { Patient } from "@/types/patient";
import { deletePatientStudy, findPatientStudyByStudyId } from "@/actions/studies";
import PaymentModal from "../payment/payment-modal";
import { ClientProvider, InsuranceProvider } from "@/types/pos";


interface StudiesTabProps {
    studies: Study[],
    setStudies: Dispatch<SetStateAction<Study[]>>,
    patient: Patient,
    tabsRef: RefObject<TabsRef>,
    activeTab: number, 
    setActiveTab:Dispatch<SetStateAction<number>>,
    clientProviders: ClientProvider[],
    insuranceProviders: InsuranceProvider[]
}

export default function StudiesTab(props: StudiesTabProps) {
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    

    const closeSearchModal = () => {
        setOpenSearchModal(false);
    }

    const handleDelete = (id:bigint) => {
        //get Patient_Study using study_id from Studies
        const patient_study = findPatientStudyByStudyId(id).then(res=>{
            console.log("Study to delete: ",res[0])
            deletePatientStudy(res[0].id)
        })
    }

    const closePaymentModal = () => {
        setOpenPaymentModal(false)
    }

    return (
        <>
        {console.log("Studies tab: ",props.studies)}
            <div>
                <AddStudyModal open={openSearchModal} onClose={closeSearchModal} onSelect={()=>{}} patient={props.patient} study={props.studies}/>
                <div className="flex space-x-4">
                    <Button className="mb-4" onClick={() => setOpenSearchModal(true)}>
                        <HiPlus className="mr-2 h-5 w-5" />
                        Add Study
                    </Button>         
                </div>

                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>CPT Code</Table.HeadCell>
                        <Table.HeadCell>Study Name</Table.HeadCell>
                        <Table.HeadCell>Modality</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Priority</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            props.studies.map((study, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{study.cpt_code}</Table.Cell>
                                    <Table.Cell>{study.study_name}</Table.Cell>
                                    <Table.Cell>{study.modality_code}</Table.Cell>
                                    <Table.Cell>{study.price}</Table.Cell>
                                    <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Priority
                                            </div>)}>
                                     
                                         <Select id="priority" name="priority" defaultValue={'RT'} required>
                                            <option value={'RT'}>Routine</option>
                                            <option value={'URG'}>Urgent</option>
                                        </Select>
                                    </Popover>
                                    </Table.Cell>
                                    <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Delete
                                            </div>)}>
                                        <Button className="font-medium text-cyan-600 dark:text-cyan-500 text-center dark:bg-gray-800" onClick={()=>{handleDelete(study.study_id)}} >
                                            <HiTrash size={18} className="mx-auto" />
                                        </Button>

                                    </Popover>
                                </Table.Cell>
                                </Table.Row>
                            ))
                        } 

                    </Table.Body>
                </Table>
                <div className="flex my-8 justify-end">
                    <Button className="w-40 m-3" color="blue" onClick={()=>setOpenPaymentModal(true)}>Go to Payment</Button>
                    <Button className="w-40 m-3" type="submit" onClick={()=>{}} color="red">Finish</Button>
                    
                </div>
                <PaymentModal 
                    open={openPaymentModal} 
                    onClose={closePaymentModal} 
                    studies={props.studies} 
                    patient={props.patient} 
                    clientProviders={props.clientProviders} 
                    insuranceProviders={props.insuranceProviders}
                />
            </div>
        </>
    )
}