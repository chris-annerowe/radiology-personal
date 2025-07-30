"use client";

import { Tabs, TabsRef } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import DemographicsTab from "./demographics/demographics-tab";
import { useEffect, useRef, useState } from "react";
import { PatientStudy, Study } from "@/types/studies";
import StudiesTab from "./studies/studies-tab";
import { Patient } from "@/types/patient";

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

interface AccessioningProps {
    patient: Patient
}


export default function AccessioningTabs(props:AccessioningProps) {
    let temp:any[] = [];
    const tabsRef = useRef<TabsRef>(null);
    const [activeTab, setActiveTab] = useState(0);

    const [studies, setStudies] = useState<Study[]>([]);

    const [selectedStudy, setSelectedStudy] = useState<PatientStudy[]>([])
    const [selectedPatient, setSelectedPatient] = useState<Patient>(patientInitialState)
    const [addStudy, setNewStudy] = useState<PatientStudy>()
    const [deleteStudy, setDelete] = useState(false)

    useEffect(()=>{
        console.log("New study ",addStudy)
        patientStudies()
    },[addStudy])

    useEffect(()=>{
        console.log("Deleting study")
        patientStudies()
    },[deleteStudy])

    const handleDelete = async (study_id:number) => {
        //get Patient_Study using study_id from Studies
        try {
            console.log("Finding patient study by study id: ",study_id)
            const response = await fetch('/api/studies/getPatientStudyByStudyId', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  study_id
                }),
              });
            
            const data = await response.json();
            console.log("Study to delete: ",data, data.study[0].id)
            deletePatientStudy(data.study[0].study_id, data.study[0].id)
        } catch (error) {
            console.error('Error fetching Study', error);
        }
    }

    const deletePatientStudy = async (study_id:number, id:number) => {
        try {
            console.log("Deleting patient study by study id: ",study_id)
            const response = await fetch('/api/studies/getPatientStudyByStudyId', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  study_id, id
                }),
              });
            
            const data = await response.json();
            console.log("Study successfully deleted: ",data)
            setDelete(!deleteStudy)
        } catch (error) {
            console.error('Error fetching Study', error);
        }
    }

    const patientStudies = async () => {
        try {
            console.log("Finding studies for patient with id: ",selectedPatient.patient_id)
            const response = await fetch('/api/studies/getPatientStudies', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  patient_id: selectedPatient.patient_id
                }),
              });
            
            const data = await response.json();
            console.log("Patient studies: ",data.studies)
            setSelectedStudy(data.studies);

            //Attempting to map over patientStudies and call findStudyByid to get full details for each Patient Study
            setStudies([])      //ensure we are starting with a fresh array
            data.studies.map(study => {
                findStudyById(study.study_id)
            })
            console.log("Attempt successful ??", temp)
        } catch (error) {
            console.error('Error fetching Patient Studies', error);
        }
    }

    const findStudyById = async (study_id:number) => {
        try {
            console.log("Finding study by id: ",study_id)
            const response = await fetch('/api/studies/getStudyById', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  study_id
                }),
              });
            
            const data = await response.json();
            console.log("Study by id: ",data.studies)
            setStudies(prevStudies => {
                const existingIds = new Set(prevStudies.map(study => study.study_id));
                const newStudies = data.studies.filter(study => !existingIds.has(study.study_id));
                return [...prevStudies, ...newStudies];
            });
            console.log("Final accessioning studies ",studies)
        } catch (error) {
            console.error('Error fetching Study', error);
        }
    }

    useEffect(()=>{
        patientStudies()

    },[selectedPatient])

    return (
        <Tabs aria-label="Default tabs" style="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
            <Tabs.Item active title="Particulars" icon={HiUserCircle}>
                <div className="p-4">
                    <DemographicsTab tabsRef={tabsRef} activeTab={activeTab} setActiveTab={setActiveTab} setSelectedPatient={setSelectedPatient} patient={props.patient}/>
                </div>
            </Tabs.Item>
            <Tabs.Item title="Studies" icon={MdDashboard}>
                <div className="p-4">
                    <StudiesTab 
                        tabsRef={tabsRef} 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab} 
                        studies={studies} 
                        setStudies={setStudies} 
                        patient={selectedPatient}
                        setNewStudy={setNewStudy}
                        handleDelete={handleDelete}
                    />
                </div>
            </Tabs.Item>
        </Tabs>
    )

}