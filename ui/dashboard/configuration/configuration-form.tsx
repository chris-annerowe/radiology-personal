"use client";

import { saveConfiguration } from "@/actions/configuration";
import { ActionResponse } from "@/types/action";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import { Prisma } from "@prisma/client";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState: ActionResponse = {
    success: false,
    message: ''
}

interface ConfigurationFormProps{
    configurationData?: Prisma.ConfigurationCreateInput | null
}

export default  function ConfigurationForm(props: ConfigurationFormProps) {

    const [state, formAction] = useFormState(saveConfiguration, initialState)

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
                            <Label htmlFor="server_host" value="Server Host" />
                        </div>
                        <TextInput id="server_host" name="server_host" type="" placeholder="" color={errors?.serverHost ? "failure" : "gray"} onChange={()=>resetField("serverHost")} defaultValue={props.configurationData?.serverHost} required shadow
                            helperText={
                                errors?.serverHost && errors?.serverHost[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="server_port" value="Server Port" />
                        </div>
                        <TextInput id="server_port" name="server_port" type="number" placeholder="" color={errors?.serverPort ? "failure" : "gray"} onChange={() => resetField("serverPort")} defaultValue={props.configurationData?.serverPort} required shadow
                            helperText={
                                errors?.serverPort && errors?.serverPort[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="sender_email" value="Sender Email" />
                        </div>
                        <TextInput id="sender_email" name="sender_email" type="" placeholder="" color={errors?.senderEmail ? "failure" : "gray"} onChange={() => resetField("senderEmail")} defaultValue={props.configurationData?.senderEmail} required shadow
                            helperText={
                                errors?.senderEmail && errors?.senderEmail[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="sender_password" value="Sender Password" />
                        </div>
                        <TextInput id="sender_password" type="password" name="sender_password" placeholder="" color={errors?.senderPassword ? "failure" : "gray"} onChange={() => resetField("senderPassword")} defaultValue={props.configurationData?.senderPassword} required shadow
                            helperText={
                                errors?.senderPassword && errors?.senderPassword[0]
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

                <BasicModal show={showModal} message="Configurations Saved" onClose={()=>setShowModal(false)} />
            </form>


        </>
    )
}