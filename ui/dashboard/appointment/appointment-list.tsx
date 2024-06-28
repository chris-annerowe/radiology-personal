"use client"

import { Appointment } from "@/types/appointment"
import { Patient } from "@/types/patient"
import { Prisma } from "@prisma/client"
import { format } from "date-fns"
import { Pagination, Popover, Table } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HiNewspaper, HiOutlinePencilAlt } from "react-icons/hi"

interface AppointmentListProps {
    appointments: Appointment[],
    appointmentCount: number,
    activePage: number,
    limit: number,
    search: string | null
}
export default function AppointmentList(props: AppointmentListProps) {

    const router = useRouter();

    const onPageChange = (page: number) => {
        const search = props.search;
        if(props.search)
            router.push(`/dashboard/patient?search=${search}&page=${page}`);    //TODO
        else
        router.push(`/dashboard/patient?page=${page}`);                 //TODO
    }

    const totalPages = Math.ceil(props.appointmentCount / props.limit);

    


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
                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Edit
                                            </div>)}>
                                        <Link href={`/dashboard/daybook/edit/${appt.appointment_id}`} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
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
                                        <Link href={`#`} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiNewspaper size={18} className="mx-auto" />
                                        </Link>
                                    </Popover>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>

            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination currentPage={props.activePage} totalPages={totalPages < 1 ? 1 : totalPages} onPageChange={onPageChange} />
            </div>

        </div>
    )

}