'use client'

import { Study } from "@/types/studies";
import { Button, Modal, Popover, Table, TabsRef, } from "flowbite-react";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { HiPlus, HiSearch, HiTrash } from "react-icons/hi";
import { Patient } from "@/types/patient";
import { deletePatientStudy, findPatientStudyByStudyId } from "@/actions/studies";
import Payments from "./payments";
import Billable from "./billable";
import InsuranceModal from "./insurance-modal";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { ClientProvider, InsuranceData, InsuranceProvider } from "@/types/pos";


interface PaymentModalProps {
    open: boolean,
    onClose: () => void,
    patient: Patient,
    studies: Study[],
    clientProviders: ClientProvider[],
    insuranceProviders: InsuranceProvider[]
}

export default function PaymentModal(props: PaymentModalProps) {
    const [openInsuranceModal, setOpenInsuranceModal] = useState(false)
    const [insuranceData, setInsuranceData] = useState<InsuranceData>({
            cardNo: 0,
            insuranceProv: "",
            policyNo: "",
            amt: 0.00,
            ceiling: 0
    })
    const [tempPrice, setTempPrice] = useState(0)
    const [insuranceAmt, setInsuranceAmt] = useState(0)
    
    let subtotal = 0.00
    let taxable = 0.00
    
    const closeInsuranceModal = () => {
        setOpenInsuranceModal(false);
    }

    const calculateSubtotal = (price:number) => {
        subtotal = subtotal + price
        return("")
    }

    const calculateTaxable = (price:number) => {
        taxable = taxable + price
        return("")
    }

    const handleOpenInsuranceModal = (price:number) => {
        setTempPrice(price)
        setOpenInsuranceModal(true)
    }

    const handleInsurance = (insurance:InsuranceData) => {
        setInsuranceData(insurance)
        console.log("Payment modal insurance data: ",insuranceData)
        setInsuranceAmt(insurance.amt)
    }

    const calculatePercent = () => {
        //calculate insurance amount
        console.log("Study price: ",tempPrice,insuranceData)
        const percent = (insuranceData.amt * 100) / tempPrice
        return (new Intl.NumberFormat('en-In',{maximumFractionDigits:1}).format(percent))
    }

    
    return (
        <>
        <InsuranceModal 
            open={openInsuranceModal} 
            onClose={closeInsuranceModal} 
            setInsurance={handleInsurance} 
            insuranceProviders={props.insuranceProviders}
        />
        <Modal show={props.open} size="4xl" onClose={props.onClose} popup>
                <Modal.Header>Payment</Modal.Header>
                <Modal.Body className="min-h-full">
              <div>
              <Table striped>
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
                                    <Table.Cell className="text-right">{new Intl.NumberFormat('en-In', {style:'currency', currency:'USD'}).format(study.price ? study.price : 0)}</Table.Cell>
                                    <Table.Cell className="text-center">{study.isInsurable ? insuranceData.insuranceProv : ""}</Table.Cell>
                                    <Table.Cell className="text-right">{study.isInsurable ? (insuranceData.amt > 0 ? new Intl.NumberFormat('en-In',{maximumFractionDigits:1}).format(insuranceData.amt * 100 / (study.price ? study.price : 0)) : 0) : ""}</Table.Cell>
                                    <Table.Cell className="text-right">{new Intl.NumberFormat('en-In', {style:'currency', currency:'USD'}).format(study.price ? study.price : 0)}</Table.Cell> 
                                    {study.price !== null ? calculateSubtotal(study.price) : null}                                  
                                    <Table.Cell>
                                    {study.isInsurable && study.isInsurable !== null ? (
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Add Insurance
                                            </div>)}>
                                        <Button className="font-medium text-cyan-600 dark:text-cyan-500 text-center dark:bg-gray-800" onClick={()=>handleOpenInsuranceModal(study.price ? study.price : 0)} >
                                            <FaHandHoldingMedical size={18} className="mx-auto" />
                                        </Button>

                                    </Popover>
                                    ) : "" }
                                    {study.isTaxable && study.isTaxable !== null && study.price !== null ? calculateTaxable(study.price) : ""}
                                </Table.Cell>
                                </Table.Row>
                            ))}

                        </Table.Body>
                        </Table>
                        
                        <div className="border-t border-2 border-transparent my-7"></div>

                     <div className="flex space-x-4">
                        <Payments clientProviders={props.clientProviders}/>
                        <div className="flex">
                            {/* Added soley for styling purposes */}
                        </div>
                        <Billable subtotal={subtotal} insurance={insuranceAmt} taxable={taxable}/>
                     </div>
                    </div>
                    </Modal.Body>
                    </Modal>
        </>
    )
}