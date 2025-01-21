"use client";

import { saveConfiguration } from "@/actions/configuration";
import { ActionResponse } from "@/types/action";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import { Prisma } from "@prisma/client";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState: ActionResponse = {
    success: false,
    message: ''
}

export default  function DoctorForm() {

    const [state, formAction] = useFormState(saveConfiguration, initialState)   //TODO: create action to saveDoctor

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
            <form action={formAction} autoComplete="off">
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="first_name" value="First Name" />
                        </div>
                        <TextInput id="first_name" name="first_name" type="" placeholder="" color={errors?.first_name ? "failure" : "gray"} onChange={()=>resetField("first_name")} required shadow
                            helperText={
                                errors?.first_name && errors?.first_name[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="last_name" value="Last Name" />
                        </div>
                        <TextInput id="last_name" name="last_name" type="" placeholder="" color={errors?.last_name ? "failure" : "gray"} onChange={() => resetField("last_name")} required shadow
                            helperText={
                                errors?.last_name && errors?.last_name[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput id="email" name="email" type="" placeholder="" color={errors?.email ? "failure" : "gray"} onChange={() => resetField("email")} required shadow
                            helperText={
                                errors?.email && errors?.email[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Address" />
                        </div>
                        <TextInput id="address" type="" name="address" placeholder="" color={errors?.address ? "failure" : "gray"} onChange={() => resetField("address")} required shadow
                            helperText={
                                errors?.address && errors?.address[0]
                            } />
                    </div>

                    {/* <div>
                        <div className="mb-2 block">
                            <Label htmlFor="receiver_email" value="Receiver Email" />
                        </div>
                        <TextInput id="receiver_email" type="" name="receiver_email" placeholder="" color={errors?.receiverEmail ? "failure" : "gray"} onChange={()=>resetField("receiverEmail")} defaultValue={props.configurationData?.receiverEmail} required shadow
                            helperText={
                                errors?.receiverEmail && errors?.receiverEmail[0]
                            } />
                    </div>

                    <div></div>

                    <div >
                        <div className="mb-2 block">
                            <Label htmlFor="subject" value="Subject" />
                        </div>
                        <TextInput id="subject" type="" name="subject" placeholder="" color={errors?.subject ? "failure" : "gray"} onChange={()=>resetField("subject")} defaultValue={props.configurationData?.subject} required shadow
                            helperText={
                                errors?.subject && errors?.subject[0]
                            } />
                    </div>

                    <div className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="message" value="Message" />
                        </div>
                        <Textarea id="message" name="message" rows={8} placeholder="Enter your message..." color={errors?.message ? "failure" : "gray"} onChange={()=>resetField("message")} defaultValue={props.configurationData?.message} required shadow
                            helperText={
                                errors?.message && errors?.message[0]
                            } />
                    </div> */}
                </div>
                <div className="flex my-8 justify-end">
                    <Button className="w-40" type="submit" color="blue">Submit</Button>
                </div>

                <FormLoadingModal />

                <BasicModal show={showModal} message="Doctor Saved" onClose={()=>setShowModal(false)} />
            </form>


        </>
    )
}