'use client'

import { Study } from "@/types/studies";
import { Button, Table, TabsRef, } from "flowbite-react";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { HiPlus, HiSearch } from "react-icons/hi";
import AddStudyModal from "./add-study-modal";




interface StudiesTabProps {
    studies: void,
    setStudies: Dispatch<SetStateAction<Study[]>>,
    tabsRef: RefObject<TabsRef>,
    activeTab: number, 
    setActiveTab:Dispatch<SetStateAction<number>>
}

export default function StudiesTab(props: StudiesTabProps) {


    const [openSearchModal, setOpenSearchModal] = useState(false);
    

    const closeSearchModal = () => {
        setOpenSearchModal(false);
    }



    return (
        <>
            <div>
                <AddStudyModal open={openSearchModal} onClose={closeSearchModal} onSelect={()=>{}}/>
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
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Accession</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {/* {
                            props.studies.map((study, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{study.cpt_code}</Table.Cell>
                                    <Table.Cell>{study.study_name}</Table.Cell>
                                    <Table.Cell>{study.modality_code}</Table.Cell>

                                </Table.Row>
                            ))
                        } */}

                    </Table.Body>
                </Table>
            </div>
        </>
    )
}