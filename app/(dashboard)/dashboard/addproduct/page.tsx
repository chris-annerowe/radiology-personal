'use client'
import { saveConfiguration } from "@/actions/configuration";
import { ActionResponse } from "@/types/action";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import DoctorForm from "@/ui/dashboard/administration/doctor-form";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState: ActionResponse = {
    success: false,
    message: ''
}

export default function AddStudy() {
    const [state, formAction] = useFormState(saveConfiguration, initialState)   //TODO: create action to save

const [errors, setErrors] = useState<{[key:string]:any}>({});

const [showModal, setShowModal] = useState(false);



useEffect(()=>{
    if(state.errors){
        setErrors(state.errors)
    }

    setShowModal(state.success);
},[state])

const resetField = (fieldName: string) => {
    let err = {...errors}
    if (err?.[fieldName]) {
        delete err[fieldName]
    }

    setErrors(err);
}

return (
        <>
            <div className="px-16">
                <div className="mx-auto max-w-2xl text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add New Study</h2>
                </div>
                <form action={formAction} autoComplete="off">
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="study_name" value="Study Name" />
                        </div>
                        <TextInput id="study_name" name="study_name" type="" defaultValue={''} color={errors?.study_name ? "failure" : "gray"} onChange={()=>resetField("study_name")} shadow
                            helperText={
                                errors?.study_name && errors?.study_name[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="study_desc" value="Study Description" />
                        </div>
                        <TextInput id="study_desc" name="study_desc" type="" defaultValue={''} color={errors?.study_desc ? "failure" : "gray"} onChange={() => resetField("study_desc")} shadow
                            helperText={
                                errors?.study_desc && errors?.study_desc[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="isTaxable" value="Taxable" />
                        </div>
                        <Select id="isTaxable" name="isTaxable" defaultValue={undefined}>
                            <option value={'true'}>True</option>
                            <option value={'false'}>False</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="isInsurable" value="Insurable" />
                        </div>
                        <Select id="isInsurable" name="isInsurable" defaultValue={undefined}>
                            <option value={'true'}>True</option>
                            <option value={'false'}>False</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="Price" />
                        </div>
                        <TextInput id="price" name="price" type="number" defaultValue={undefined} color={errors?.price ? "failure" : "gray"} onChange={() => resetField("price")} shadow
                            helperText={
                                errors?.price && errors?.price[0]
                            } />
                    </div>
                </div>
                <div className="flex my-8 justify-end">
                    <Button className="w-40" type="submit" color="blue">Submit</Button>
                </div>

                <FormLoadingModal />

                <BasicModal show={showModal} message="Changes Saved" onClose={()=>setShowModal(false)} />
            </form>               
            </div>
        </>

    )
}