"use client"

import { worklist } from "@prisma/client";
import { Pagination, Table } from "flowbite-react";
import { useRouter } from "next/navigation";

interface StudiesListProps {
    studies: worklist[],
    studiesCount: number,
    activePage: number,
    limit: number,
    search: string | null
}

export default function StudiesList(props: StudiesListProps) {

    const router = useRouter();

    const onPageChange = (page: number) => {
        const search = props.search;
        if(props.search)
            router.push(`/dashboard/studies?search=${search}&page=${page}`);
        else
        router.push(`/dashboard/studies?page=${page}`);
    }

    const totalPages = Math.ceil(props.studiesCount / props.limit);

    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>Accession Number</Table.HeadCell>
                    <Table.HeadCell>Study Description</Table.HeadCell>
                    <Table.HeadCell>Patient Name</Table.HeadCell>
                    <Table.HeadCell>Modality</Table.HeadCell>
                    
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        props.studies.map((study, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{study.accession_number}</Table.Cell>
                                <Table.Cell>{study.study_description}</Table.Cell>
                                <Table.Cell>{study.patient_name}</Table.Cell>
                                <Table.Cell>{study.modality}</Table.Cell>
                                
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