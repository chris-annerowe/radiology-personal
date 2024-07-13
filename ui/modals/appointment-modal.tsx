'use client';

import { findPatientByName } from "@/actions/patient";
import { createAppointment, deleteAppointment, updateAppointment } from "@/data/appointment";
import { Appointment } from "@/types/appointment";
import { add, format } from "date-fns";
import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";

// interface Appointment{
//     date: Date | null,
//     modality: string,
//     index: number | null
// }
  
interface ApptModalProps{
    show: boolean
    onClose: ()=>void | void
    date: Date
    modality: string
    index: number | undefined
    holiday?: string
    appt?: Appointment
};

export default function AppointmentModal(props: ApptModalProps) {
    console.log("Appointment to update: ",props.appt)
    const [errors, setErrors] = useState<{[key:string]:any}>({});
    const [dob, setDOB] = useState<Date>()
    const [time, setTime] = useState<Date>()

    useEffect(()=>{
        if(errors){
            setErrors(errors)
        }

    },[errors])

    const getIndex = (hour: number, mins: number) => {
        switch(hour){
            case 9: 
                if(mins === 0)
                    return 0
                else
                    return 1
            case 10:  
                if(mins === 0)
                    return 2
                else
                    return 3
            case 11: 
                if(mins === 0)
                    return 4
                else
                    return 5
            case 12: 
                if(mins === 0)
                    return 6
                else
                    return 7
            case 13: 
                if(mins === 0)
                    return 8
                else
                    return 9
            case 14: 
                if(mins === 0)
                    return 10
                else
                    return 11
            case 15: 
                if(mins === 0)
                    return 12
                else
                    return 13
            case 16: 
                if(mins === 0)
                    return 14
                else
                    return 15
            case 17:
                return 16
        }
    }

    async function handleSave(data: FormData) {
            console.log("Handling save")

            const lastName = data.get('lastName')?.valueOf()
            const firstName = data.get('firstName')?.valueOf()
            const description = data.get('description')?.valueOf()           
            const tel = data.get('tel')?.valueOf()
            const dobString = data.get('dob')?.valueOf()
            const timeString = data.get('appt_time')?.valueOf()
            const sex = data.get('sex')?.valueOf()

            if (typeof firstName !== 'string' || firstName?.length === 0) {
                throw new Error("Invalid First Name")
            }
            if (typeof lastName !== 'string' || lastName?.length === 0) {
                throw new Error("Invalid Last Name")
            }
            if (typeof tel !== 'string' || tel?.length === 0) {
                throw new Error("Invalid Telephone Number")
            }
            if (typeof description !== 'string') {
                throw new Error("Invalid Description")
            }
            if (typeof dobString !== 'string') {
                throw new Error("Invalid DOB")
            }
            if (typeof timeString !== 'string' && timeString) {
                throw new Error("Invalid Appointment Time")
            }
            if (typeof sex !== 'string') {
                throw new Error("Invalid Sex")
            }
            if (typeof props.index !== 'number'){
                throw new Error("Invalid index")
            }

            const dob = new Date(dobString)
            const time = new Date(timeString)

            //assign index based on updated time
            const index = getIndex(time.getHours(), time.getMinutes())

            //check if patient exists
            let patient = await findPatientByName(lastName,1,5)
            console.log("Patient: ",patient[0])
            //verify patient is correct using dob
            if(patient[0]){
                {patient[0].dob === dob ? patient = patient[0] : patient = null}
            }

            //check if appointment already exists
            if(props.appt?.appointment_id){
                console.log("Update existing appointment")
                await updateAppointment(props.appt.appointment_id, patient?.patient_id, time, lastName,firstName, description, tel, dob, sex, index)
            }else{
                await createAppointment(lastName,firstName, description, props.date, props.modality, tel, dob, sex, props.index)
            }
           // close modal and return to /dashboard/daybook page
           redirect("/dashboard/daybook")
    }

    const handleDelete = () => {
        deleteAppointment(props.appt?.appointment_id)
        props.onClose()
    }


    return (
        <Modal show={props.show} size="md" onClose={props.onClose} popup>
            <Modal.Header>
                <div  className="justify-center">Appointment Details {props.holiday ? `: ${props.holiday}` : null}</div>
            </Modal.Header>
            <Modal.Body>
            <>
            <form autoComplete="off" action={handleSave}>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstName" value="First Name" />
                        </div>
                        <TextInput id="firstName" name="firstName" type="" placeholder="" defaultValue={typeof props.appt?.firstName === 'string' ? props.appt?.firstName : ""} required shadow
                            helperText={
                                errors?.firstName && 'Required'
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastName" value="Last Name" />
                        </div>
                        <TextInput id="lastName" name="lastName" type="" placeholder="" defaultValue={typeof props.appt?.lastName === 'string' ? props.appt?.lastName : ""} required shadow
                            helperText={
                                errors?.lastName && 'Required'
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="tel" value="Contact Number" />
                        </div>
                        <TextInput id="tel" name="tel" type="" placeholder="Digits only" defaultValue={typeof props.appt?.tel === 'string' ? props.appt?.tel : ""} required shadow
                            helperText={
                                errors?.tel && 'Required'
                            }
                        />
                    </div>

                    {/* Show appointment time input only if updating existing appointment */}
                    {props.appt?.appointment_id ? (
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="appt_time" value="Appointment Time" />
                        </div>
                        <TextInput id="appt_time" name="appt_time" type="" placeholder="" defaultValue={props.appt?.appointment_time ? format(add(props.appt?.appointment_time,{hours: 5}), 'MM/dd/yyyy h:mm aa') : ""} required shadow
                            helperText={
                                errors?.tel && 'Required'
                            }
                        />
                    </div>
                    ) : null }

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="sex" value="Sex" />
                        </div>
                        <TextInput id="sex" name="sex" type="" placeholder="" defaultValue={typeof props.appt?.sex === 'string' ? props.appt?.sex : ""} required shadow
                            helperText={
                                errors?.sex && 'Required'
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="dob" value="Date Of Birth" />
                        </div>
                        <Datepicker name="dob" 
                            maxDate={new Date()} 
                            defaultDate={typeof props.appt?.dob !== 'string' && typeof props.appt?.dob !== 'number' && props.appt?.dob !== null && typeof props.appt?.dob !== 'undefined' ? new Date(props.appt?.dob) : undefined} 
                            onSelectedDateChanged={()=>setDOB}
                        />
                    </div>

                    <div  className="col-span-2">
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <TextInput id="description" name="description" sizing='lg' placeholder="Description" defaultValue={typeof props.appt?.description === 'string' ? props.appt?.description : ""} shadow
                            helperText='Eg. Xray of left arm'
                        />
                    </div>

                    <Modal.Footer>
                    <div className="flex my-8 gap-2 justify-end">
                        <Button color='red' onClick={()=>{props.onClose()}}>Exit</Button>
                        {props.appt?.appointment_id ? <Button onClick={()=>{handleDelete()}}>Delete <HiTrash/></Button> : null}
                        <Button type="submit" color="blue">Save</Button>
                    </div>
                    </Modal.Footer>
                </div>
            </form>


        </>
            </Modal.Body>
        </Modal>
    )
}