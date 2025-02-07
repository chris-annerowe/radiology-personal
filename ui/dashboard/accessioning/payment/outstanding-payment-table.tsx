'use client'
import { ClientProvider, InsuranceProvider, POSTransaction, PaymentType } from "@/types/pos";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import PaymentModal from "./payment-modal";
import { format } from "date-fns";
import { findStudyById, findStudyByPatientId } from "@/actions/studies";
import { PatientStudy, Study } from "@/types/studies";
import { findPatientById } from "@/actions/patient";
import { Patient } from "@/types/patient";
import { getPaymentTypes } from "@/actions/pos";

interface PaymentTableProps {
    transactions:POSTransaction[],
    clientProviders:ClientProvider[],
    insuranceProviders:InsuranceProvider[],
}

const patientInitialState = {
    patient_id: "",
    first_name: "",
    last_name: "",
    other_name: "",
    title: "",
    dob: new Date(),
    age: 0,
    sex: "",
    height: 0,
    weight: 0,
    allergies: "",
    nationality: "",
    next_kin: "",
    address_1: "",
    address_2: "",
    city: "",
    parish: "",
    telephone_1: "",
    telephone_2: "",
    cellular: "",
    email: "",
    id_type: "",
    idnum: ""

}

export default function PaymentTable(props:PaymentTableProps) {

let temp:any[] = []
const [openPaymentModal, setOpenPaymentModal] = useState(false)
const [selectedTransaction, setSelectedTransaction] = useState<POSTransaction>()
const [patientStudies, setPatientStudies] = useState<PatientStudy[]>([])
const [paymentTypes,setPaymentTypes] = useState<PaymentType[]>([])
const [studies, setStudies] = useState<Study[]>([]);
const [patient, setPatient] = useState<Patient>(patientInitialState)

const handleSelectedTransaction = (transaction:POSTransaction) => {
    setSelectedTransaction(transaction)
    setOpenPaymentModal(true)
}

const closePaymentModal = () => {
    setOpenPaymentModal(false);
}

const getPatientStudies = () => {
    console.log("Finding studies for patient with id: ",selectedTransaction?.patient_id)
    findStudyByPatientId(selectedTransaction?.patient_id !== undefined ? selectedTransaction.patient_id : '').then(res=>{
        setPatientStudies(res)
    })
}

const fetchPaymentTypes = async () => {
    try {
        const response = await fetch('/api/getPaymentTypes');
        const data = await response.json();
        setPaymentTypes(data.paymentTypes);
    } catch (error) {
        console.error('Error fetching payment types', error);
    }
}

const getPatient = () => {
    console.log("Get patient data for id ",selectedTransaction?.patient_id)
    findPatientById(selectedTransaction?.patient_id !== undefined ? selectedTransaction.patient_id : '').then(res=>{
        setPatient(res)
    })
    
}

useEffect(()=>{
    getPatientStudies()
    fetchPaymentTypes()
},[selectedTransaction])

useEffect(()=>{
    console.log("Patient studies: ",patientStudies)
    patientStudies.map(study=>{
        findStudyById(study.study_id).then(res=>{
            console.log("Response for study by id: ",res)
            temp.push(res[0])
        })
        setStudies(temp)
    })

},[patientStudies])

useEffect(()=>{
    getPatient()
},[studies])

const date = format(new Date(),'dd/MM/yyyy')

    return (
        <>
            <div>
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>Patient First Name</Table.HeadCell>
                        <Table.HeadCell>Patient Last Name</Table.HeadCell>
                        <Table.HeadCell>Number of Studies</Table.HeadCell>
                        <Table.HeadCell>Amount Paid</Table.HeadCell>
                        <Table.HeadCell>Outstanding Balance</Table.HeadCell>
                        <Table.HeadCell>Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {props.transactions.map((transaction,index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={()=>handleSelectedTransaction(transaction)}>
                                <Table.Cell className="text-center">{transaction.patient_first_name}</Table.Cell>
                                <Table.Cell className="text-center">{transaction.patient_last_name}</Table.Cell>
                                <Table.Cell className="text-center">{transaction.numOfStudies}</Table.Cell>
                                <Table.Cell className="text-right">{new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(transaction.amountPaid)}</Table.Cell>
                                <Table.Cell className="text-right">{new Intl.NumberFormat('en-IN',{style:'currency', currency: 'USD'}).format(transaction.outstandingBalance)}</Table.Cell>
                                <Table.Cell>{format(transaction.timestamp,'dd-MM-yyyy')}</Table.Cell>
                            </Table.Row>
                        ))}
                        
                    </Table.Body>
                </Table>
            </div>
            <PaymentModal 
                open={openPaymentModal} 
                onClose={closePaymentModal} 
                patient={patient}
                studies={studies}
                paymentTypes={paymentTypes}
                clientProviders={props.clientProviders}
                insuranceProviders={props.insuranceProviders}
                outstandingTransaction={selectedTransaction}
            />
        </>
    )
}