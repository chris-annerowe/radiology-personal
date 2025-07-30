"use client";

import { findPatientByName } from "@/actions/patient";
import { ActionResponse } from "@/types/action";
import { Patient, PatientSearch } from "@/types/patient";
import { format } from "date-fns";
import { Button, Modal, Pagination, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiPlus, HiSearch } from "react-icons/hi";
import store from "@/store"
import PatientFormModal from "@/ui/modals/patient-form-modal";

const initialState: ActionResponse<PatientSearch> = {
    success: false,
    message: ''
}

interface PatientSearchModalProps {
    open: boolean,
    onClose: () => void,
    onSelect: (patient: Patient) => void
}

const patientInitialState = {
    patient_id: "",
    first_name: "",
    last_name: "",
    other_name: "",
    title: "",
    dob: undefined,
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

export default function PatientSearchModal(props: PatientSearchModalProps) {
    const daybookData = store.getState().appointment.appointment

    const [patients, setPatients] = useState<Patient[]>([])
    const [patient, setPatient] = useState<Patient>(patientInitialState)

    const [openPatientModal, setOpenPatientModal] = useState(false);
    
    const defaultSearch = daybookData.firstName || daybookData.lastName ? `${daybookData.firstName} ${daybookData.lastName}`.trim() : '';
      
    const limit = 5;


    const [patientSearch, setPatientSearch] = useState<{
        firstName: string,
        lastName: string,
        dob: Date | null
    }>({
        firstName: "",
        lastName: "",
        dob: new Date()
    })


    const [activePage, setActivePage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

const selectPatient = async (patient: Patient) => {
        console.log("Selected patient ",patient)
        setPatient(patient);
        closePatientModal();
        console.log(patient);
        try {
            const response = await fetch('/api/patient', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(patient),
            });
        
            const result = await response.json();
            console.log(result.message, result.patient);
          } catch (error) {
            console.error('Error saving patient:', error);
          }
    }

    const searchPatients = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const search = e.currentTarget.value;
        let result = await findPatientByName(search, activePage, limit);

            if (result.data) {
                setPatients(result.data);
                setTotalPages(result.pagination.count / limit);
            }
    };

    const searchDefault = async (data:string) => {
        let result = await findPatientByName(data, activePage, limit);

            if (result.data) {
                setPatients(result.data);
                setTotalPages(result.pagination.count / limit);
            }else{
                return 
            }
    }

    useEffect(() => {
        if (defaultSearch) {
            console.log("Searching ",defaultSearch)
            searchDefault(defaultSearch); // simulating an event
        }
    }, [defaultSearch]);

    useEffect(() => {
        if (patient.first_name) {
            console.log("Searching ",patient.first_name, patient.last_name)
            searchDefault(`${patient.first_name} ${patient.last_name}`); // simulating an event
        }
    }, [patient]);
    

    const onPageChange = (page: number) => {
        setActivePage(page);
    }



    const handleDOBDateChange = (date: Date) => {
        console.log(date.toDateString());
        if (date.toDateString() == new Date().toDateString()) {
            setPatientSearch({ ...patientSearch, dob: null })
        } else {
            setPatientSearch({ ...patientSearch, dob: date })
        }

    }

    const closePatientModal = () => {
        setOpenPatientModal(false);
    }

    return (
        <>
            <Modal show={props.open} size="4xl" onClose={props.onClose} popup>
                <Modal.Header />
                <Modal.Body className="min-h-full">
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Search Patients</h3>

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex space-x-2">
                                <TextInput id="search" type="text" icon={HiSearch} placeholder="Search for patients" className="" onChange={searchPatients} 
                                defaultValue={defaultSearch}/>
                            </div>
                            <div>
                                <Button className="mb-4" onClick={() => setOpenPatientModal(true)}>
                                    <HiPlus className="mr-2 h-5 w-5" />
                                        Create Patient
                                </Button>
                            </div>
                        </div>
                        <Table striped hoverable>
                            <Table.Head>
                                <Table.HeadCell>Last Name</Table.HeadCell>
                                <Table.HeadCell>First Name</Table.HeadCell>
                                <Table.HeadCell>Date Of Birth</Table.HeadCell>
                                <Table.HeadCell>Gender</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {
                                    patients ? patients.map((patient, index) => (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer" onClick={() => props.onSelect(patient)}>
                                            <Table.Cell>{patient.last_name}</Table.Cell>
                                            <Table.Cell>{patient.first_name}</Table.Cell>
                                            <Table.Cell>{patient.dob ? format(patient.dob.toString(), "dd/MM/yyyy") : ""}</Table.Cell>
                                            <Table.Cell>{patient.sex}</Table.Cell>
                                            <Table.Cell>

                                            </Table.Cell>


                                        </Table.Row>
                                    )) : <></>
                                }

                            </Table.Body>
                        </Table>
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={activePage} totalPages={totalPages < 1 ? 1 : totalPages} onPageChange={onPageChange} />
                        </div>
                        
                        <PatientFormModal show={openPatientModal} onClose={closePatientModal} selectedPatient={selectPatient}/>

                        
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}