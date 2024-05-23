"use client";

import { findPatientByName, findPatientsByNameAndDOB } from "@/actions/patient";
import { ActionResponse } from "@/types/action";
import { Patient, PatientSearch } from "@/types/patient";
import DatePicker from "@/ui/common/date-picker";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { Button, Checkbox, Label, Modal, Pagination, Table, TextInput } from "flowbite-react";
import email from "next-auth/providers/email";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { HiSearch } from "react-icons/hi";

const initialState: ActionResponse<PatientSearch> = {
    success: false,
    message: ''
}

interface PatientSearchModalProps {
    open: boolean,
    onClose: () => void,
    onSelect: (patient: Patient) => void
}
export default function PatientSearchModal(props: PatientSearchModalProps) {

    //const patients: Patient[] = [];

    const [patients, setPatients] = useState<Patient[]>([])

    const [errors, setErrors] = useState<{ [key: string]: any }>({});

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



    const searchPatients = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const search = e.currentTarget.value;
        if (e.key === "Enter") {
            let result = await findPatientByName(search, activePage, limit);

            if (result.data) {
                setPatients(result.data);
                setTotalPages(result.pagination.count / limit);
            }
        }


    };

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


    return (
        <>
            <Modal show={props.open} size="4xl" onClose={props.onClose} popup>
                <Modal.Header />
                <Modal.Body className="min-h-full">
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Search Patients</h3>


                        <div className="flex space-x-2">
                            <TextInput id="search" type="ematextil" icon={HiSearch} placeholder="Search for patients" className="" onKeyDown={searchPatients} />
                            {/*<TextInput id="first_name" name="first_name" type="" placeholder="First Name" color={errors?.last_name ? "failure" : "gray"} onChange={handlePatientSearchChange} className="" />
                            <TextInput id="last_name" name="last_name" type="" placeholder="Last Name" color={errors?.first_name ? "failure" : "gray"} onChange={handlePatientSearchChange} className="" />*/}
                            {/*<Datepicker name="dob" value={patientSearch.dob.toDateString()} onSelectedDateChanged={(date) => handleDOBDateChange(date)}  />*/}
                            {/*<Button onClick={() => { searchPatients(patientSearch.firstName) }}>
                                <HiSearch className="mr-2 h-5 w-5" />
                                Search
                        </Button>*/}
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

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}