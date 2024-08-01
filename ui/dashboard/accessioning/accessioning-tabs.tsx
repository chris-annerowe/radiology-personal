"use client";

import { Tabs, TabsRef } from "flowbite-react";
import { HiUserCircle, HiAdjustments, HiClipboardList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import DemographicsTab from "./demographics/demographics-tab";
import { useRef, useState } from "react";
import { Study } from "@/types/studies";
import StudiesTab from "./studies/studies-tab";
import { Patient } from "@/types/patient";
import { findStudyByPatientId } from "@/actions/studies";



export default function AccessioningTabs() {
    const tabsRef = useRef<TabsRef>(null);
    const [activeTab, setActiveTab] = useState(0);

    const [studies, setStudies] = useState<Study[]>([]);

    const patientStudies = () => {
        findStudyByPatientId('patientid').then(res=>{
            console.log('Patient study: ',res);
            // setStudies(res)
        })
    }

    return (
        <Tabs aria-label="Default tabs" style="default" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
            <Tabs.Item active title="Demographics" icon={HiUserCircle}>
                <div className="p-4">
                    <DemographicsTab tabsRef={tabsRef} activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            </Tabs.Item>
            <Tabs.Item title="Studies" icon={MdDashboard}>
                <div className="p-4">
                    <StudiesTab tabsRef={tabsRef} activeTab={activeTab} setActiveTab={setActiveTab} studies={patientStudies()} setStudies={setStudies}/>
                </div>
            </Tabs.Item>
            <Tabs.Item title="Payment" icon={HiAdjustments}>
                This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                control the content visibility and styling.
            </Tabs.Item>
            <Tabs.Item title="Contacts" icon={HiClipboardList}>
                This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
                Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                control the content visibility and styling.
            </Tabs.Item>
            <Tabs.Item disabled title="Disabled">
                Disabled content
            </Tabs.Item>
        </Tabs>
    )

}