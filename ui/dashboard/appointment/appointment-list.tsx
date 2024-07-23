"use client"

import { deleteAppointment } from "@/data/appointment"
import { Appointment } from "@/types/appointment"
import AppointmentModal from "@/ui/modals/appointment-modal"
import { format } from "date-fns"
import { Button, Pagination, Popover, Table } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi"

interface AppointmentListProps {
    appointments: Appointment[],
    appointmentCount: number,
    activePage: number,
    limit: number,
    search: string | null
}
export default function AppointmentList(props: AppointmentListProps) {
console.log("Appointment list props: ",props.appointments)
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false)
    const [editAppointment, setEditAppointment] = useState<Appointment>({
        firstName: null,
        lastName: null,
        tel: null,
        sex: null,
        dob: null,
        appointment_id: null,
        appointment_time: null,
        description: null,
        index: null,
        modality: null
    })

    const onPageChange = (page: number) => {
        const search = props.search;
        if(props.search)
            router.push(`/dashboard/daybook/search?search=${search}&page=${page}`);    //TODO
        else
        router.push(`/dashboard/daybook?page=${page}`);                 //TODO
    }

    const totalPages = Math.ceil(props.appointmentCount / props.limit);

    const handleDelete = (id:bigint) => {
        deleteAppointment(id)
        //TODO: reload list to show deleted row
    }

    const handleEdit = (appt:Appointment) => {
        setEditAppointment(appt)
        setOpenModal(true)
        console.log("Appointment list edit: ",editAppointment)
    }

    const closeModal = () => {
        setOpenModal(false);
    }


    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>Last Name</Table.HeadCell>
                    <Table.HeadCell>First Name</Table.HeadCell>
                    <Table.HeadCell>Date Of Birth</Table.HeadCell>
                    <Table.HeadCell>Gender</Table.HeadCell>
                    <Table.HeadCell>Appointment Date</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Delete</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        props.appointments.map((appt, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{appt.lastName}</Table.Cell>
                                <Table.Cell>{appt.firstName}</Table.Cell>
                                <Table.Cell>{appt.dob ? format(appt.dob.toString(), "dd/MM/yyyy") : ""}</Table.Cell>
                                <Table.Cell>{appt.sex}</Table.Cell>
                                <Table.Cell>{appt.appointment_time ? format(appt.appointment_time.toString(), "dd/MM/yyyy") : ""}</Table.Cell>
                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Edit
                                            </div>)}>
                                        {/* <Link href={`/dashboard/daybook/edit/${appt.appointment_id}`} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiOutlinePencilAlt size={18} className="mx-auto" />
                                        </Link> */}
                                        <Button className="font-medium text-cyan-600 dark:text-cyan-500 text-center dark:bg-gray-800" onClick={()=>{handleEdit(appt)}} >
                                            <HiOutlinePencilAlt size={18} className="mx-auto" />
                                        </Button>
                                    </Popover>
                                </Table.Cell>

                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Delete
                                            </div>)}>
                                        {/* <Link href={`#`} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiTrash size={18} className="mx-auto" />
                                        </Link> */}
                                        <Button className="font-medium text-cyan-600 dark:text-cyan-500 text-center dark:bg-gray-800" onClick={()=>{handleDelete(appt.appointment_id)}} >
                                            <HiTrash size={18} className="mx-auto" />
                                        </Button>

                                    </Popover>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>

            <AppointmentModal 
                show={openModal} 
                onClose={closeModal} 
                date={editAppointment.appointment_time} 
                modality={editAppointment.modality} 
                index={editAppointment.index}
                appt={editAppointment}
            />

            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination currentPage={props.activePage} totalPages={totalPages < 1 ? 1 : totalPages} onPageChange={onPageChange} />
            </div>

        </div>
    )

}