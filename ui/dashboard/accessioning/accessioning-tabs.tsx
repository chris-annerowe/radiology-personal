"use client";

import { Tabs, TabsRef } from "flowbite-react";
import { HiUserCircle, HiAdjustments, HiClipboardList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import DemographicsTab from "./demographics/demographics-tab";
import { useEffect, useRef, useState } from "react";
import { PatientStudy, Study } from "@/types/studies";
import StudiesTab from "./studies/studies-tab";
import { Patient } from "@/types/patient";
import { findStudyById, findStudyByPatientId } from "@/actions/studies";
import PaymentTab from "./payment/payment-tab";

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


export default function AccessioningTabs() {
    let temp:any[] = [];
    const tabsRef = useRef<TabsRef>(null);
    const [activeTab, setActiveTab] = useState(0);

    const [studies, setStudies] = useState<Study[]>([]);

    const [selectedStudy, setSelectedStudy] = useState<PatientStudy[]>([])
    const [selectedPatient, setSelectedPatient] = useState<Patient>(patientInitialState)

    const patientStudies = () => {
        console.log("Finding studies for patient with id: ",selectedPatient.patient_id)
        findStudyByPatientId(selectedPatient.patient_id).then(res=>{
            console.log('Patient study: ',res);
            setSelectedStudy(res)
        })
    }

    useEffect(()=>{
        patientStudies()

    },[selectedPatient])

    useEffect(()=>{
        console.log("selected study: ",selectedStudy)
        selectedStudy.map(study=>{
            findStudyById(study.study_id).then(res=>{
                console.log("Response for study by id: ",res)
                temp.push(res[0])
                setStudies(temp)
            })
        })

    },[selectedStudy])

    return (
        <Tabs aria-label="Default tabs" style="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
            <Tabs.Item active title="Particulars" icon={HiUserCircle}>
                <div className="p-4">
                    <DemographicsTab tabsRef={tabsRef} activeTab={activeTab} setActiveTab={setActiveTab} setSelectedPatient={setSelectedPatient}/>
                </div>
            </Tabs.Item>
            <Tabs.Item title="Studies" icon={MdDashboard}>
                <div className="p-4">
                    <StudiesTab tabsRef={tabsRef} activeTab={activeTab} setActiveTab={setActiveTab} studies={studies} setStudies={setStudies} patient={selectedPatient}/>
                </div>
            </Tabs.Item>
            {/* <Tabs.Item title="Payment" icon={HiAdjustments}>
                <div className="p-4">
                    <PaymentTab tabsRef={tabsRef} activeTab={activeTab} setActiveTab={setActiveTab} studies={studies} patient={selectedPatient}/>
                </div>
            </Tabs.Item> */}
        </Tabs>
    )

}