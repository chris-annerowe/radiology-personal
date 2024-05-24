"use client"

import { getAppointments } from "@/data/appointment"
import { format } from "date-fns"
import { Pagination, Popover, Table } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HiNewspaper, HiOutlinePencilAlt } from "react-icons/hi"

interface Appointment {
    firstName: string,
    lastname: string,
    dob: Date | string,
    tel: string,
    sex: string
}

export default function DailyAppointments() {

    const router = useRouter();

    // const onPageChange = (page: number) => {
    //     const search = props.search;
    //     if(props.search)
    //         router.push(`/dashboard/patient?search=${search}&page=${page}`);
    //     else
    //     router.push(`/dashboard/patient?page=${page}`);
    // }

    // const totalPages = Math.ceil(props.patientCount / props.limit);

    const appointments = async () => {
        const appts = await getAppointments()
        console.log("Daily appointments")
        return appts
    }

    const dailyAppointments = appointments()


    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>Last Name</Table.HeadCell>
                    <Table.HeadCell>First Name</Table.HeadCell>
                    <Table.HeadCell>Date Of Birth</Table.HeadCell>
                    <Table.HeadCell>Gender</Table.HeadCell>
                    <Table.HeadCell>Tel Number</Table.HeadCell>
                    <Table.HeadCell>Modality</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Accession</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        dailyAppointments?.map((appt, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{appt.lastName}</Table.Cell>
                                <Table.Cell>{appt.firstName}</Table.Cell>
                                <Table.Cell>{appt.dob ? format(appt.dob.toString(), "dd/MM/yyyy") : ""}</Table.Cell>
                                {/* <Table.Cell>{appt.sex}</Table.Cell> */}
                                <Table.Cell>{appt.tel}</Table.Cell>
                                <Table.Cell>{appt.modality}</Table.Cell>
                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Edit
                                            </div>)}>
                                                {/* TODO: update link */}
                                        <Link href={`/dashboard/patient/edit/${appt.appointment_id}`} className="font-medium text-cyan-600 dark:text-cyan-500 text-center">
                                            <HiOutlinePencilAlt size={18} className="mx-auto" />
                                        </Link>
                                    </Popover>
                                </Table.Cell>

                                <Table.Cell>
                                    <Popover
                                        trigger="hover"
                                        content={
                                            (<div className="p-2">
                                                Accession
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

            {/* <div className="flex overflow-x-auto sm:justify-center">
                <Pagination currentPage={props.activePage} totalPages={totalPages < 1 ? 1 : totalPages} onPageChange={onPageChange} />
            </div> */}

        </div>
    )

}