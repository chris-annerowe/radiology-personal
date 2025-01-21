'use client'

import { addPatientStudy, findAllStudies } from "@/actions/studies";
import { Patient } from "@/types/patient";
import { Study } from "@/types/studies";
import EditStudyModal from "@/ui/dashboard/accessioning/studies/edit-study-modal";
import { AutoComplete } from "antd";
import { Modal, Pagination, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";



export default function EditStudy() {

    //const patients: Patient[] = [];

    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedStudy, setSelectedStudy] = useState<Study>({
        study_id: 2n,
        cpt_code: '',
        study_name: null, 
        study_description: null,
        modality_code: '',       
        price: null,
        isInsurable: null,
        isTaxable: null
    })
    // const [errors, setErrors] = useState<{ [key: string]: any }>({});

    // const [options, setOptions] = useState<{ value: string }[]>([{ value: "Apple" }, { value: "Orange" }]);

    // const limit = 5;


    // const [studySearch, setStudySearch] = useState<{
    //     cptCode: string,
    //     studyName: string,
    //     modality: string
    // }>({
    //     cptCode: "",
    //     studyName: "",
    //     modality: ""
    // })


    const [activePage, setActivePage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [studies, setStudies] = useState<Study[]>([])

    useEffect(()=>{
        getStudiesList();
    },[])



    // const searchPatients = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     const search = e.currentTarget.value;
    //     /* if (e.key === "Enter") {
    //          let result = await findPatientByName(search, activePage, limit);
 
    //          if (result.data) {
    //              setPatients(result.data);
    //              setTotalPages(result.pagination.count / limit);
    //          }
    //      }*/


    // };

    const closeEditModal = () => {
        setOpenEditModal(false);
    }

    const onPageChange = (page: number) => {
        setActivePage(page);
    }

    const getStudiesList = () => {
        console.log("Called");
        findAllStudies().then(res=>{
            console.log(res);
            setStudies(res)
        })
    }



    const handleSelectedStudy = (study: Study) => {
        console.log("Study selected: ",study)

        //open modal to edit study?
        setSelectedStudy(study)
        setOpenEditModal(true)
        
        
    }


    return (
        <>
            <EditStudyModal open={openEditModal} onClose={closeEditModal} study={selectedStudy} />
               <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Study</h3>


                        {/* <div className="flex space-x-2">
                            <TextInput id="cpt_code" type="text" placeholder="CPT Code" className="" />
                            <TextInput id="study_name" type="text" placeholder="Study Name" className="" />
                            <AutoComplete id="modality_code_ac" options={options}  className="">
                                <TextInput id="modality_code" type="text" placeholder="Modality" className="" />
                            </AutoComplete>
                            {/*<TextInput id="first_name" name="first_name" type="" placeholder="First Name" color={errors?.last_name ? "failure" : "gray"} onChange={handlePatientSearchChange} className="" />
                            <TextInput id="last_name" name="last_name" type="" placeholder="Last Name" color={errors?.first_name ? "failure" : "gray"} onChange={handlePatientSearchChange} className="" />*/}
                            {/*<Datepicker name="dob" value={patientSearch.dob.toDateString()} onSelectedDateChanged={(date) => handleDOBDateChange(date)}  />*/}
                            {/*<Button onClick={() => { searchPatients(patientSearch.firstName) }}>
                                <HiSearch className="mr-2 h-5 w-5" />
                                Search
                        </Button>*/}
                        {/* </div>  */}

                        <Table striped hoverable>
                            <Table.Head>
                                <Table.HeadCell>CPT Code</Table.HeadCell>
                                <Table.HeadCell>Study Name</Table.HeadCell>
                                <Table.HeadCell>Modality Code</Table.HeadCell>
                                <Table.HeadCell>Price</Table.HeadCell>

                                <Table.HeadCell>
                                    <span className="sr-only">Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {studies.map((study, index)=>{
                                    return (
                                        <Table.Row key={index} className='hover:bg-slate-400' onClick={()=>handleSelectedStudy(study)}>
                                            <Table.Cell>{study.cpt_code}</Table.Cell>
                                            <Table.Cell>{study.study_name}</Table.Cell>
                                            <Table.Cell>{study.modality_code}</Table.Cell>
                                            <Table.Cell>{study.price}</Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination currentPage={activePage} totalPages={totalPages < 1 ? 1 : totalPages} onPageChange={onPageChange} />
                        </div>

                    </div>
        </>
    )
}