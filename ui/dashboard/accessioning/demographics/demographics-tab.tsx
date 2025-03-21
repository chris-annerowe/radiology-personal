"use client";

import { savePatient, isExistingPatientAndSave } from "@/actions/patient";
import { telephoneMask } from "@/lib/masks";
import { ActionResponse } from "@/types/action";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import { useMaskito } from "@maskito/react";
import { Label, TextInput, Select, Datepicker, Button, TabsRef } from "flowbite-react";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { HiSearch, HiX } from "react-icons/hi";
import PatientSearchModal from "./patient-search-modal";
import { Patient } from "@/types/patient";
import DatePickerField from "./dob-datepicker";
import GenderDropdown from "./gender-dropdown";
import PatientForm from "../../patient/patient-form";
import PatientFormModal from "@/ui/modals/patient-form-modal";


const initialState: ActionResponse = {
    success: false,
    message: ''
}

const patientInitialState = {
    patient_id: "",
    first_name: "",
    last_name: "",
    other_name: "",
    title: "",
    dob: undefined,
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

export default function DemographicsTab(props: {
    tabsRef: RefObject<TabsRef>,
    activeTab: number, 
    setActiveTab:Dispatch<SetStateAction<number>>,
    setSelectedPatient:(patient:Patient)=>void,
    patient: Patient
}) {
    console.log("Patient prop from patient list ",props.patient)
    const [state, formAction] = useFormState(savePatient, initialState)

    const [errors, setErrors] = useState<{ [key: string]: any }>({});

    const [showModal, setShowModal] = useState(false);

    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [openPatientForm, setOpenPatientForm] = useState(false)
    const [patientFormData, setPatientFormData] = useState({
        first_name: '',
        last_name: '',
        other_name: '',
        sex: '',
        dob: undefined
    })

    const [patient, setPatient] = useState<Patient>(props.patient.patient_id !== '' ? props.patient : patientInitialState);
    const [patientDOB, setDOB] = useState<Date>(props.patient.patient_id !== '' ? new Date(props.patient.dob) : new Date(patient.dob))
    const [patientSex, setSex] = useState(props.patient.patient_id !== '' && props.patient.sex !== undefined && props.patient.sex !== null ? props.patient.sex : (patient.sex !== undefined && patient.sex !== null ? patient.sex : ''))

    const [patientFormDisabled, setPatientFormDisabled] = useState(false);
    const [file, setFile] = useState<File>()

    
    useEffect(() => {
        if (state.errors) {
            setErrors(state.errors)
            window.scrollTo(0, 0);

        }

        setShowModal(state.success);
    }, [state])

    const resetField = (fieldName: string) => {
        let err = { ...errors }
        if (err?.[fieldName]) {
            delete err[fieldName]
        }

        setErrors(err);
    }

    const tel1InputRef = useMaskito({ options: { mask: telephoneMask } });
    const tel2InputRef = useMaskito({ options: { mask: telephoneMask } });
    const cel1InputRef = useMaskito({ options: { mask: telephoneMask } });

    const closeModal = () => {
        setShowModal(false);
        goToNext();
    }

    const closeSearchModal = () => {
        setOpenSearchModal(false);
    }

    const closePatientForm = () => {
        setOpenPatientForm(false);
        console.log("Closing patient modal. ",patient)
        // goToNext()
    }

    const sendEmail = async (emailData:any) => {
        try {
          const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
          });
      
          const result = await response.json();
          console.log(result.message);
        } catch (error) {
          console.error('Error sending email:', error);
        }
    };

    const selectPatient = (patient: Patient) => {
        console.log("Selected patient ",patient)
        setPatient(patient);
        setDOB(new Date(patient.dob))
        setSex(patient.sex)
        props.setSelectedPatient(patient);
        setPatientFormDisabled(true)
        closeSearchModal();
        console.log(patient);
        // Usage example
       sendEmail({
        to: 'chrisannerowe@gmail.com',
        subject: 'Hello from Next.js',
        text: 'This is a test email sent from Next.js!',
      });
    }

    const clearPatient = () => {
        setPatient(patientInitialState);
        setPatientFormDisabled(false)
        console.log(patient);
    }

    const goToNext = () => {
        console.log("Active Tab: "+props.activeTab);
        props.tabsRef.current?.setActiveTab(props.activeTab+1)
    }

    const saveFile = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!file) return
        
      // Example usage
      if(patient.patient_id !== ''){
        await createFolder(patient.patient_id)
        try{
                const data = new FormData()
                data.set("file",file)
                data.set("patientId", patient.patient_id)
            
                const response = await fetch("/api/uploadReferral",{
                    method: "POST",
                    body: data
                })

                if(!response.ok) throw new Error (await response.text())
            }catch(e){
                console.error(e)
            }
        }else { alert("No patient selected")}
    }

    async function createFolder(folderName:string) {
        const response = await fetch('/api/createFolder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ folderName }),
        });
      
        const data = await response.json();
        console.log(data.message);
      }
      
    const checkIsExisting = async (formData: FormData) => {
        const resp = await isExistingPatientAndSave(formData, patient.first_name, patient.last_name)
        console.log("Resp from patient check ",resp)
        if(!resp?.success){
            setPatientFormData({
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                other_name: formData.get('other_name'),
                sex: formData.get('sex'),
                dob: formData.get('dob')
            })
            setOpenPatientForm(true)
        }
        goToNext()
    }

    return (
        <>
            <PatientSearchModal open={openSearchModal} onClose={closeSearchModal} onSelect={selectPatient} />
            <PatientFormModal selectedPatient={selectPatient} show={openPatientForm} onClose={closePatientForm} patient={patientFormData}/>
            <div className="flex space-x-4">
                {patient.patient_id && <Button className="mb-4" onClick={() => clearPatient()}>
                    <HiX className="mr-2 h-5 w-5" />
                    Clear Patient
                </Button>}

                <Button className="mb-4" onClick={() => setOpenSearchModal(true)}>
                    <HiSearch className="mr-2 h-5 w-5" />
                    Search Patients
                </Button>
                <input type="file" name="image" onChange={(e)=>setFile(e.target.files?.[0])} />
                <form onSubmit={saveFile}>
                    <Button className="mb-4" type="submit">
                        Upload Referral
                    </Button>
                </form>
            </div>
            <form action={checkIsExisting} autoComplete="off">

                {/** Demographics Section */}
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-3">Patient Data</h3>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="first_name" value="First Name" />
                        </div>
                        <TextInput id="first_name" name="first_name" type="" sizing='xs' placeholder="" color={errors?.first_name ? "failure" : "gray"} onChange={() => resetField("first_name")} defaultValue={patient ? patient.first_name : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.first_name && errors?.first_name[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="last_name" value="Last Name" />
                        </div>
                        <TextInput id="last_name" name="last_name" type="" placeholder="" sizing='xs' color={errors?.last_name ? "failure" : "gray"} onChange={() => resetField("last_name")} defaultValue={patient ? patient.last_name : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.last_name && errors?.last_name[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="other_name" value="Other Name" />
                        </div>
                        <TextInput id="other_name" name="other_name" type="" placeholder="" sizing='xs' color={errors?.other_name ? "failure" : "gray"} onChange={() => resetField("other_name")} defaultValue={(patient && patient.other_name) ? patient.other_name : ""} disabled={patientFormDisabled} shadow
                            helperText={
                                errors?.other_name && errors?.other_name[0]
                            } />
                    </div>

                    {patient.patient_id === "" ? (
                        <div>
                        <div className="mb-2 block">
                            <Label htmlFor="sex" value="Gender" />
                        </div>
                        <Select id="sex" name="sex" defaultValue={''} sizing='sm' disabled={patientFormDisabled} required>
                            <option value={'M'}>Male</option>
                            <option value={'F'}>Female</option>
                            <option value={'Other'}>Other</option>
                        </Select>
                    </div>
                    ) : (
                    <GenderDropdown sex={patientSex} disabled={patientFormDisabled} />
                    )}

                    {patient.patient_id === "" ? (
                        <div>
                        <div className="mb-2 block">
                            <Label htmlFor="dob" value="Date Of Birth" />
                        </div>
                        <Datepicker id='dob' name="dob" maxDate={new Date()}  size={8} defaultDate={undefined} disabled={patientFormDisabled} required/>
                    </div>
                    ) : (
                        <DatePickerField dob={patientDOB} disabled={patientFormDisabled} />
                    )}

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="date" value="Accession Date" />
                        </div>
                        <Datepicker name="date" maxDate={new Date()}  sizing='xs' defaultDate={undefined} disabled={patientFormDisabled} />
                    </div>

                </div>

                <div className="border-t border-2 border-gray-200 my-7"></div>

                {/** Contact Section */}
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-3">Referring Doctor</h3>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                <div>
                        <div className="mb-2 block">
                            <Label htmlFor="doctor_name" value="Name" />
                        </div>
                        <TextInput id="doctor_name" name="doctor_name" type="" sizing='xs' placeholder="" color={errors?.first_name ? "failure" : "gray"} onChange={() => resetField("doctor_name")} defaultValue={""} disabled={false} required shadow
                            helperText={
                                errors?.doctor_name && errors?.doctor_name[0]
                            }
                        />
                    </div>
                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="doc_tel" value="Telephone" />
                        </div>
                        <TextInput ref={tel1InputRef} id="doc_tel" name="doc_tel" type="" sizing='xs' placeholder="" color={errors?.doc_tel ? "failure" : "gray"} defaultValue={""} disabled={false} shadow
                            helperText={
                                errors?.doc_tel && errors?.doc_tel[0]
                            }
                        />
                    </div>
                    <div className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="doc_address" value="Address" />
                        </div>
                        <TextInput id="doc_address" name="doc_address" type="" sizing='xs' placeholder="" color={errors?.doc_address ? "failure" : "gray"} defaultValue={""} disabled={false} shadow
                            helperText={
                                errors?.doc_address && errors?.doc_address[0]
                            }
                        />
                    </div>
                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="fax" value="Fax" />
                        </div>
                        <TextInput ref={tel1InputRef} id="fax" name="fax" type="" sizing='xs' placeholder="" color={errors?.fax ? "failure" : "gray"} onChange={() => resetField("fax")} defaultValue={""} disabled={false} shadow
                            helperText={
                                errors?.fax && errors?.fax[0]
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="doc_id" value="Doc ID" />
                        </div>
                        <TextInput id="doc_id" name="doc_id" type="" placeholder="" sizing='xs' color={errors?.doc_id ? "failure" : "gray"} onChange={() => resetField("doc_id")} defaultValue={""} disabled={false} shadow
                            helperText={
                                errors?.doc_id && errors?.doc_id[0]
                            } />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="ref_date" value="Referral Date" />
                        </div>
                        <Datepicker name="ref_date" maxDate={new Date()}  sizing='xs' defaultDate={undefined} disabled={false} />
                    </div>
                    <div  className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="diagnosis" value="Differential Diagnosis" />
                        </div>
                        <TextInput id="diagnosis" name="diagnosis" sizing='lg' placeholder="Differential Diagnosis" defaultValue={""} shadow
                            helperText=''
                        />
                    </div>
                </div>
                <div className="border-t border-2 border-gray-200 my-7"></div>

                {/** Identification Section */}
                {/* <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-3">Examination Required</h3>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    
                <div >
                        <div className="mb-2 block">
                            <Label htmlFor="priority" value="Priority" />
                        </div>
                        <Select id="priority" name="priority" defaultValue={'RT'} disabled={patientFormDisabled} required>
                            <option value={'RT'}>Routine</option>
                            <option value={'URG'}>Urgent</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="study" value="Study Name" />
                        </div>
                        <TextInput id="study" name="study" type="" placeholder="" color={errors?.idnum ? "failure" : "gray"} onChange={() => resetField("study")} defaultValue={""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.study && errors?.study[0]
                            }
                        />
                    </div>

                </div>
 */}

                <div className="flex my-8 justify-end">
                    {patient.patient_id ?
                    (<Button className="w-40" color="blue" onClick={()=>goToNext()}>Continue</Button>)
                    :
                    (
                        <Button className="w-40" type="submit" color="blue">Continue</Button>
                    )
                    }
                    
                </div>

                <FormLoadingModal />

                <BasicModal show={showModal} message={"Patient Saved"} onClose={closeModal} />
            </form>

        </>
    )
}