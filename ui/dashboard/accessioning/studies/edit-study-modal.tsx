'use client'

import { saveConfiguration } from "@/actions/configuration";
import { addPatientStudy, findAllStudies } from "@/actions/studies";
import { ActionResponse } from "@/types/action";
import { Patient } from "@/types/patient";
import { Study } from "@/types/studies";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import { AutoComplete } from "antd";
import { Button, Label, Modal, Pagination, Select, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";


const initialState: ActionResponse = {
    success: false,
    message: ''
}

interface EditStudyModalProps {
    open: boolean,
    onClose: () => void,
    study: Study
}

export default function EditStudyModal(props: EditStudyModalProps) {
console.log("Edit modal props: ",props.study)
 
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
            <Modal show={props.open} size="4xl" onClose={props.onClose} popup>
                <Modal.Header>Edit Study</Modal.Header>
                <Modal.Body className="min-h-full">
                    <div className="space-y-6">
                    <form action={formAction} autoComplete="off">
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="study_name" value="Study Name" />
                        </div>
                        <TextInput id="study_name" name="study_name" type="" defaultValue={props.study.study_name !== null ? props.study.study_name : ''} color={errors?.study_name ? "failure" : "gray"} onChange={()=>resetField("study_name")} shadow
                            helperText={
                                errors?.study_name && errors?.study_name[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="study_desc" value="Study Description" />
                        </div>
                        <TextInput id="study_desc" name="study_desc" type="" defaultValue={props.study.study_description !== null ? props.study.study_description : ''} color={errors?.study_desc ? "failure" : "gray"} onChange={() => resetField("study_desc")} shadow
                            helperText={
                                errors?.study_desc && errors?.study_desc[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="isTaxable" value="Taxable" />
                        </div>
                        <Select id="isTaxable" name="isTaxable" defaultValue={props.study.isTaxable !== null ? (props.study.isTaxable ? 'true' : 'false') : undefined}>
                            <option value={'true'}>True</option>
                            <option value={'false'}>False</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="isInsurable" value="Insurable" />
                        </div>
                        <Select id="isInsurable" name="isInsurable" defaultValue={props.study.isInsurable !== null ? (props.study.isInsurable ? 'true' : 'false') : undefined}>
                            <option value={'true'}>True</option>
                            <option value={'false'}>False</option>
                        </Select>
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="Price" />
                        </div>
                        <TextInput id="price" name="price" type="number" defaultValue={props.study.price ? props.study.price : undefined} color={errors?.price ? "failure" : "gray"} onChange={() => resetField("price")} shadow
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
                </Modal.Body>
            </Modal>
        </>
    )
}