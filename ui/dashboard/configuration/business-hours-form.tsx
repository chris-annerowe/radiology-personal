"use client";

import { ActionResponse } from "@/types/action";
import { Appointment } from "@/types/appointment";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

const initialState: ActionResponse = {
    success: false,
    message: ''
}

interface ConfigurationFormProps{
    configurationData?: any
}
export default  function BusinessHoursForm(props: ConfigurationFormProps) {
    let index:any = ''
    let temp:Appointment = {}
    let updateAppt:Appointment[] = []
    const [errors, setErrors] = useState<{[key:string]:any}>({});

    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState<Appointment[]>([])


    useEffect(()=> {
        getAppointments()
    },[])

    const getAppointments = async () => {
        const resp = await fetch('/api/getAppointments',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json();
        console.log("Appointments: ",data.config)
        setAppointments(data.appointment);
    }

    const getIndex = (hour: number, mins: number, baseHour: number) => {
        if (hour < baseHour || hour > 23 || (mins !== 0 && mins !== 30)) {
            alert("Invalid time input");
        }
    
        const hourOffset = hour - baseHour;
        const minuteOffset = mins === 0 ? 0 : 1;
    
        return hourOffset * 2 + minuteOffset;
    };

    const saveBusinessHours = async (data:FormData) => {
        console.log("Appointments inside: ",appointments)
        
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

        
        // update existing appointments index to match new start and end times
        updateAppt = []
        for (const appt of appointments) {
            const apptTime = new Date(appt.appointment_time)
            index = getIndex(apptTime.getUTCHours(), apptTime.getMinutes(), opening_time)
            console.log("Updated index: ",index,apptTime.getUTCHours(),apptTime.getMinutes())
            temp = appt
            temp.index = index
            updateAppt.push(temp)
        }
            const res = await fetch('/api/getAppointments', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateAppt), 
            });

        console.log("Appointment update resp:", await res.json());
        
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
       
        window.location.href= '/dashboard/configuration'
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