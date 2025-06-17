"use client";

import { ActionResponse } from "@/types/action";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";

const initialState: ActionResponse = {
    success: false,
    message: ''
}

interface ConfigurationFormProps{
    configurationData?: any
}
export default  function BusinessHoursForm(props: ConfigurationFormProps) {

    const [errors, setErrors] = useState<{[key:string]:any}>({});

    const [showModal, setShowModal] = useState(false);


    const saveBusinessHours = async (data:FormData) => {
        let opening_time = data.get('opening_time')?.valueOf()
        let closing_time = data.get('closing_time')?.valueOf()
        let interval = data.get('interval')?.valueOf()

        opening_time = typeof opening_time === 'string' ? parseFloat(opening_time) : opening_time
        closing_time = typeof closing_time === 'string' ? parseFloat(closing_time) : closing_time
        interval = typeof interval === 'string' ? parseInt(interval) : interval

        if (typeof opening_time !== 'number' ) {
            throw new Error("Invalid Opening Time")
        }
        if (typeof closing_time !== 'number') {
            throw new Error("Invalid Closing Time")
        }
        if (typeof interval !== 'number') {
            throw new Error("Invalid Interval")            
        }
        
        const resp = await fetch('/api/getBusinessHours',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              opening_time,
              closing_time,
              interval
            }),
        })
        console.log("Business hours resp: ", resp)
    }

    const resetField = (fieldName: string) => {
        let err = {...errors}
        if (err?.[fieldName]) {
            delete err[fieldName]
        }

        setErrors(err);
    }

    
    

    return (
        <>
            <form action={saveBusinessHours} autoComplete="off">
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="opening_time" value="Opening Time" />
                        </div>
                        <TextInput id="opening_time" name="opening_time" type="number" placeholder="In 24hr format" color={errors?.opening_time ? "failure" : "gray"} onChange={()=>resetField("opening_time")} defaultValue={props.configurationData?.opening_time} required shadow
                            helperText={
                               'Hour only e.g 9 not 9:00'
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="closing_time" value="Closing Time" />
                        </div>
                        <TextInput id="closing_time" name="closing_time" type="number" placeholder="In 24hr format" color={errors?.closing_time ? "failure" : "gray"} onChange={() => resetField("closing_time")} defaultValue={props.configurationData?.closing_time} required shadow
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