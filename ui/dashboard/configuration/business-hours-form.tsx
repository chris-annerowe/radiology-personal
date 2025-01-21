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
    configurationData?: any 
}

export default  function BusinessHoursForm(props: ConfigurationFormProps) {

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
                            <Label htmlFor="open_hrs" value="Opening Time" />
                        </div>
                        <TextInput id="open_hrs" name="open_hrs" type="number" placeholder="In 24hr format" color={errors?.open_hrs ? "failure" : "gray"} onChange={()=>resetField("open_hrs")} defaultValue={props.configurationData?.openHrs} required shadow
                            helperText={
                               'Hour only e.g 9 not 9:00'
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="close_hrs" value="Closing Time" />
                        </div>
                        <TextInput id="close_hrs" name="close_hrs" type="number" placeholder="In 24hr format" color={errors?.close_hrs ? "failure" : "gray"} onChange={() => resetField("close_hrs")} defaultValue={props.configurationData?.closeHrs} required shadow
                            helperText={
                                'Hour only e.g 17 not 17:00'
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="interval" value="Business Hour Interval" />
                        </div>
                        <TextInput id="interval" name="interval" type="number" placeholder="In minutes" color={errors?.interval ? "failure" : "gray"} onChange={() => resetField("interval")} defaultValue={props.configurationData?.interval} required shadow
                            helperText={
                                'Example: 30 for half hour intervals'
                            } />
                    </div>
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