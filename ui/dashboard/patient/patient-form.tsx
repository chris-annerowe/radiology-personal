'use client';

import { savePatient, updatePatient } from "@/actions/patient";
import { telephoneMask } from "@/lib/masks";
import { ActionResponse } from "@/types/action";
import { Patient } from "@/types/patient";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import { useMaskito } from "@maskito/react";
import { Prisma } from "@prisma/client";
import { Button, Datepicker, Label, Select, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";


const initialState: ActionResponse = {
    success: false,
    message: ''
}

interface PatientFormProps {
    patient?: Patient | null
}

export default function PatientForm(props: PatientFormProps) {

    const router = useRouter();

    const patient = props.patient;

    const patientDOB = (patient && patient.dob) ?
        (patient.dob instanceof Date ? patient.dob : new Date(patient.dob))
        : null;

    const isEdit: boolean = (patient ? (patient.patient_id ? patient.patient_id.length > 0 : false) : false);

    const updatePatientWithId = updatePatient.bind(null, patient?.patient_id ? patient.patient_id : "");

    const patientAction = isEdit ? updatePatientWithId : savePatient;

    const [state, formAction] = useFormState(patientAction, initialState)

    const [errors, setErrors] = useState<{ [key: string]: any }>({});

    const [showModal, setShowModal] = useState(false);


    const tel1InputRef = useMaskito({options: {mask: telephoneMask}});
    const tel2InputRef = useMaskito({options: {mask: telephoneMask}});
    const cel1InputRef = useMaskito({options: {mask: telephoneMask}});







    useEffect(() => {
        if (state.errors) {
            setErrors(state.errors)
            console.log(window);

            setTimeout(()=>{
                window.scrollTo(0,0);
            }, 500)
            

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

    const closeModal = () => {

        setShowModal(false);
        router.back();
    }


    return (
        <>
            <form action={formAction} autoComplete="off">
                {/** Demographics Section */}
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-3">Demographics</h3>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="first_name" value="First Name" />
                        </div>
                        <TextInput id="first_name" name="first_name" type="" placeholder="" color={errors?.first_name ? "failure" : "gray"} onChange={() => resetField("first_name")} defaultValue={patient ? patient.first_name : ""} required shadow
                            helperText={
                                errors?.first_name && errors?.first_name[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="last_name" value="Last Name" />
                        </div>
                        <TextInput id="last_name" name="last_name" type="" placeholder="" color={errors?.last_name ? "failure" : "gray"} onChange={() => resetField("last_name")} defaultValue={patient ? patient.last_name : ""} required shadow
                            helperText={
                                errors?.last_name && errors?.last_name[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="other_name" value="Other Name" />
                        </div>
                        <TextInput id="other_name" name="other_name" type="" placeholder="" color={errors?.other_name ? "failure" : "gray"} onChange={() => resetField("other_name")} defaultValue={(patient && patient.other_name) ? patient.other_name : ""}  shadow
                            helperText={
                                errors?.other_name && errors?.other_name[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Title" />
                        </div>
                        <Select id="title" name="title" defaultValue={(patient && patient.title) ? patient.title : ''} required>
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
                        <Datepicker name="dob" maxDate={new Date()} defaultDate={patientDOB ? patientDOB : undefined} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="sex" value="Gender" />
                        </div>
                        <Select id="sex" name="sex" defaultValue={(patient && patient.sex) ? patient.sex : ''} required>
                            <option value={'M'}>Male</option>
                            <option value={'F'}>Female</option>
                            <option value={'MTF'}>Trans-Woman</option>
                            <option value={'FTM'}>Trans-Man</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nationality" value="Nationality" />
                        </div>
                        <TextInput id="nationality" name="nationality" type="" placeholder="" color={errors?.nationality ? "failure" : "gray"} onChange={() => resetField("nationality")} defaultValue={(patient && patient.nationality) ? patient.nationality : ""} required shadow
                            helperText="Country Code eg JM"  />
                    </div>

                    {/* <div>
                        <div className="mb-2 block">
                            <Label htmlFor="next_kin" value="Next Of Kin" />
                        </div>
                        <TextInput id="next_kin" name="next_kin" type="" placeholder="" color={errors?.next_kin ? "failure" : "gray"} onChange={() => resetField("next_kin")} defaultValue={(patient && patient.next_kin) ? patient.next_kin : ""} shadow
                            helperText={
                                errors?.next_kin && errors?.next_kin[0]
                            } />
                    </div> */}


                </div>
                <div className="border-t border-2 border-gray-200 my-7"></div>

                {/** Address Section */}
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-3">Address</h3>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="address_1" value="Address 1" />
                        </div>
                        <TextInput id="address_1" name="address_1" type="" placeholder="" color={errors?.address_1 ? "failure" : "gray"} onChange={() => resetField("address_1")} defaultValue={(patient && patient.address_1) ? patient.address_1 : ""} required shadow
                            helperText={
                                errors?.address_1 && errors?.address_1[0]
                            }
                        />
                    </div>

                    <div className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="address_2" value="Address 2" />
                        </div>
                        <TextInput id="address_2" name="address_2" type="" placeholder="" color={errors?.address_2 ? "failure" : "gray"} onChange={() => resetField("address_2")} defaultValue={(patient && patient.address_2) ? patient.address_2 : ""} shadow
                            helperText={
                                errors?.address_2 && errors?.address_2[0]
                            }
                        />
                    </div>

                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="city" value="City" />
                        </div>
                        <TextInput id="city" name="city" type="" placeholder="" color={errors?.city ? "failure" : "gray"} onChange={() => resetField("city")} defaultValue={(patient && patient.city) ? patient.city : ""} required shadow
                            helperText={
                                errors?.city && errors?.city[0]
                            }
                        />
                    </div>

                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="parish" value="Parish" />
                        </div>
                        <TextInput id="parish" name="parish" type="" placeholder="" color={errors?.parish ? "failure" : "gray"} onChange={() => resetField("parish")} defaultValue={(patient && patient.parish) ? patient.parish : ""} required shadow
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
                        <TextInput ref={tel1InputRef} id="telephone_1" name="telephone_1" type="" placeholder="" color={errors?.telephone_1 ? "failure" : "gray"} onChange={() => resetField("telephone_1")} defaultValue={(patient && patient.telephone_1) ? patient.telephone_1 : ""} required shadow
                            helperText={
                                errors?.telephone_1 && errors?.telephone_1[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="telephone_2" value="Telephone 2" />
                        </div>
                        <TextInput ref={tel2InputRef} id="telephone_2" name="telephone_2" type="" placeholder="" color={errors?.telephone_2 ? "failure" : "gray"} onChange={() => resetField("telephone_2")} defaultValue={(patient && patient.telephone_2) ? patient.telephone_2 : ""} shadow
                            helperText={
                                errors?.telephone_2 && errors?.telephone_2[0]
                            }
                        />
                    </div>

                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="cellular" value="Mobile" />
                        </div>
                        <TextInput ref={cel1InputRef} id="cellular" name="cellular" type="" placeholder="" color={errors?.cellular ? "failure" : "gray"} onChange={() => resetField("cellular")} defaultValue={(patient && patient.cellular) ? patient.cellular : ""} required shadow
                            helperText={
                                errors?.cellular && errors?.cellular[0]
                            }
                        />      
                    </div>

                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput id="email" name="email" type="" placeholder="" color={errors?.email ? "failure" : "gray"} onChange={() => resetField("email")} defaultValue={(patient && patient.email) ? patient.email : ""} required shadow
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
                        <Select id="id_type" name="id_type" defaultValue={(patient && patient.id_type) ? patient.id_type : ''} required>
                            <option value={'DL'}>Driver's License</option>
                            <option value={'PP'}>Passport</option>
                            <option value={'NI'}>National ID</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="idnum" value="ID Number" />
                        </div>
                        <TextInput id="idnum" name="idnum" type="" placeholder="" color={errors?.idnum ? "failure" : "gray"} onChange={() => resetField("idnum")} defaultValue={(patient && patient.idnum) ? patient.idnum : ""} required shadow
                            helperText={
                                errors?.idnum && errors?.idnum[0]
                            }
                        />
                    </div>


                </div>


                <div className="flex my-8 justify-end">
                    <Button className="w-40" type="submit" color="blue">Submit</Button>
                </div>

                <FormLoadingModal />

                <BasicModal show={showModal} message={isEdit ? "Patient Updated" : "Patient Saved"} onClose={closeModal} />
            </form>
        </>
    )
}