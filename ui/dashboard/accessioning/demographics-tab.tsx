"use client";

import { savePatient } from "@/actions/patient";
import { telephoneMask } from "@/lib/masks";
import { ActionResponse } from "@/types/action";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import patient from "@/zod/schemas/patient";
import { useMaskito } from "@maskito/react";
import { Label, TextInput, Select, Datepicker, Button, TabsRef } from "flowbite-react";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { HiSearch, HiX } from "react-icons/hi";
import PatientSearchModal from "./patient-search-modal";
import { Patient } from "@/types/patient";


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

export default function DemographicsTab(props: {tabsRef: RefObject<TabsRef>,activeTab: number, setActiveTab:Dispatch<SetStateAction<number>>}) {

    const [state, formAction] = useFormState(savePatient, initialState)

    const [errors, setErrors] = useState<{ [key: string]: any }>({});

    const [showModal, setShowModal] = useState(false);

    const [openSearchModal, setOpenSearchModal] = useState(false);

    const [patient, setPatient] = useState<Patient>(patientInitialState);

    const [patientFormDisabled, setPatientFormDisabled] = useState(false);

    const patientDOB = (patient && patient.dob) ?
        (patient.dob instanceof Date ? patient.dob : new Date(patient.dob))
        : null;

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

    const selectPatient = (patient: Patient) => {
        setPatient(patient);
        setPatientFormDisabled(true)
        closeSearchModal();
        console.log(patient);
    }

    const clearPatient = () => {
        setPatient(patientInitialState);
        setPatientFormDisabled(false)
        console.log(patient);
    }

    const goToNext = () => {
        props.tabsRef.current?.setActiveTab(props.activeTab+1)
    }


    return (
        <>
            <PatientSearchModal open={openSearchModal} onClose={closeSearchModal} onSelect={selectPatient} />
            <div className="flex space-x-4">
                {patient.patient_id && <Button className="mb-4" onClick={() => clearPatient()}>
                    <HiX className="mr-2 h-5 w-5" />
                    Clear Patient
                </Button>}

                <Button className="mb-4" onClick={() => setOpenSearchModal(true)}>
                    <HiSearch className="mr-2 h-5 w-5" />
                    Search Patients
                </Button>
            </div>
            <form action={formAction} autoComplete="off">

                {/** Demographics Section */}
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-3">Demographics</h3>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="first_name" value="First Name" />
                        </div>
                        <TextInput id="first_name" name="first_name" type="" placeholder="" color={errors?.first_name ? "failure" : "gray"} onChange={() => resetField("first_name")} defaultValue={patient ? patient.first_name : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.first_name && errors?.first_name[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="last_name" value="Last Name" />
                        </div>
                        <TextInput id="last_name" name="last_name" type="" placeholder="" color={errors?.last_name ? "failure" : "gray"} onChange={() => resetField("last_name")} defaultValue={patient ? patient.last_name : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.last_name && errors?.last_name[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="other_name" value="Other Name" />
                        </div>
                        <TextInput id="other_name" name="other_name" type="" placeholder="" color={errors?.other_name ? "failure" : "gray"} onChange={() => resetField("other_name")} defaultValue={(patient && patient.other_name) ? patient.other_name : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.other_name && errors?.other_name[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Title" />
                        </div>
                        <Select id="title" name="title" defaultValue={(patient && patient.title) ? patient.title : ''} disabled={patientFormDisabled} required>
                            <option value={'Mr.'}>Mr.</option>
                            <option value={'Mrs.'}>Mrs.</option>
                            <option value={'Ms.'}>Ms.</option>
                            <option value={'Dr.'}>Dr.</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="dob" value="Date Of Birth" />
                        </div>
                        <Datepicker name="dob" maxDate={new Date()} defaultDate={patientDOB ? patientDOB : undefined} disabled={patientFormDisabled} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="sex" value="Gender" />
                        </div>
                        <Select id="sex" name="sex" defaultValue={(patient && patient.sex) ? patient.sex : ''} disabled={patientFormDisabled} required>
                            <option value={'M'}>Male</option>
                            <option value={'F'}>Female</option>
                        </Select>
                    </div>


                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="height" value="Height" />
                        </div>
                        <TextInput id="height" name="height" type="number" step={'0.01'} placeholder="" color={errors?.last_name ? "failure" : "gray"} onChange={() => resetField("height")} defaultValue={(patient && patient.height) ? patient.height.toString() : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.height && errors?.height[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="weight" value="Weight" />
                        </div>
                        <TextInput id="weight" name="weight" type="number" step={'0.01'} placeholder="" color={errors?.last_name ? "failure" : "gray"} onChange={() => resetField("weight")} defaultValue={(patient && patient.weight) ? patient.weight.toString() : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.height && errors?.height[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="allergies" value="Allergies" />
                        </div>
                        <TextInput id="allergies" name="allergies" placeholder="" color={errors?.allergies ? "failure" : "gray"} onChange={() => resetField("allergies")} defaultValue={(patient && patient.allergies) ? patient.allergies.toString() : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.allergies && errors?.allergies[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nationality" value="Nationality" />
                        </div>
                        <TextInput id="nationality" name="nationality" type="" placeholder="" color={errors?.nationality ? "failure" : "gray"} onChange={() => resetField("nationality")} defaultValue={(patient && patient.nationality) ? patient.nationality : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.nationality && errors?.nationality[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="next_kin" value="Next Of Kin" />
                        </div>
                        <TextInput id="next_kin" name="next_kin" type="" placeholder="" color={errors?.next_kin ? "failure" : "gray"} onChange={() => resetField("next_kin")} defaultValue={(patient && patient.next_kin) ? patient.next_kin : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.next_kin && errors?.next_kin[0]
                            } />
                    </div>


                </div>
                <div className="border-t border-2 border-gray-200 my-7"></div>

                {/** Address Section */}
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-3">Address</h3>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="address_1" value="Address 1" />
                        </div>
                        <TextInput id="address_1" name="address_1" type="" placeholder="" color={errors?.address_1 ? "failure" : "gray"} onChange={() => resetField("address_1")} defaultValue={(patient && patient.address_1) ? patient.address_1 : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.address_1 && errors?.address_1[0]
                            }
                        />
                    </div>

                    <div className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="address_2" value="Address 2" />
                        </div>
                        <TextInput id="address_2" name="address_2" type="" placeholder="" color={errors?.address_2 ? "failure" : "gray"} onChange={() => resetField("address_2")} defaultValue={(patient && patient.address_2) ? patient.address_2 : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.address_2 && errors?.address_2[0]
                            }
                        />
                    </div>

                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="city" value="City" />
                        </div>
                        <TextInput id="city" name="city" type="" placeholder="" color={errors?.city ? "failure" : "gray"} onChange={() => resetField("city")} defaultValue={(patient && patient.city) ? patient.city : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.city && errors?.city[0]
                            }
                        />
                    </div>

                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="parish" value="Parish" />
                        </div>
                        <TextInput id="parish" name="parish" type="" placeholder="" color={errors?.parish ? "failure" : "gray"} onChange={() => resetField("parish")} defaultValue={(patient && patient.parish) ? patient.parish : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.parish && errors?.parish[0]
                            }
                        />
                    </div>




                </div>
                <div className="border-t border-2 border-gray-200 my-7"></div>

                {/** Contact Section */}
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-3">Contact</h3>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="telephone_1" value="Telephone 1" />
                        </div>
                        <TextInput ref={tel1InputRef} id="telephone_1" name="telephone_1" type="" placeholder="" color={errors?.telephone_1 ? "failure" : "gray"} onChange={() => resetField("telephone_1")} defaultValue={(patient && patient.telephone_1) ? patient.telephone_1 : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.telephone_1 && errors?.telephone_1[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="telephone_2" value="Telephone 2" />
                        </div>
                        <TextInput ref={tel2InputRef} id="telephone_2" name="telephone_2" type="" placeholder="" color={errors?.telephone_2 ? "failure" : "gray"} onChange={() => resetField("telephone_2")} defaultValue={(patient && patient.telephone_2) ? patient.telephone_2 : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.telephone_2 && errors?.telephone_2[0]
                            }
                        />
                    </div>

                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="cellular" value="Mobile" />
                        </div>
                        <TextInput ref={cel1InputRef} id="cellular" name="cellular" type="" placeholder="" color={errors?.cellular ? "failure" : "gray"} onChange={() => resetField("cellular")} defaultValue={(patient && patient.cellular) ? patient.cellular : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.cellular && errors?.cellular[0]
                            }
                        />
                    </div>

                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput id="email" name="email" type="" placeholder="" color={errors?.email ? "failure" : "gray"} onChange={() => resetField("email")} defaultValue={(patient && patient.email) ? patient.email : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.email && errors?.email[0]
                            }
                        />
                    </div>

                </div>
                <div className="border-t border-2 border-gray-200 my-7"></div>

                {/** Identification Section */}
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-3">Identification</h3>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="id_type" value="ID Type" />
                        </div>
                        <Select id="id_type" name="id_type" defaultValue={(patient && patient.id_type) ? patient.id_type : ''} disabled={patientFormDisabled} required>
                            <option value={'DL'}>Driver's License</option>
                            <option value={'PP'}>Passport</option>
                            <option value={'NI'}>National ID</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="idnum" value="ID Number" />
                        </div>
                        <TextInput id="idnum" name="idnum" type="" placeholder="" color={errors?.idnum ? "failure" : "gray"} onChange={() => resetField("idnum")} defaultValue={(patient && patient.idnum) ? patient.idnum : ""} disabled={patientFormDisabled} required shadow
                            helperText={
                                errors?.idnum && errors?.idnum[0]
                            }
                        />
                    </div>


                </div>


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