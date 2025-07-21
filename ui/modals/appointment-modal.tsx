'use client';

import { findPatientByName } from "@/actions/patient";
import { createAppointment, deleteAppointment, updateAppointment } from "@/data/appointment";
import { Appointment } from "@/types/appointment";
import { add, format } from "date-fns";
import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
    const router = useRouter()
    console.log("Appointment to update: ",props.appt)
    const [errors, setErrors] = useState<{[key:string]:any}>({});
    const [dob, setDOB] = useState<Date>()
    const [time, setTime] = useState<Date>()
    const [businessHrs, setBusinessHrs] = useState(0)

    useEffect(()=>{
        if(errors){
            setErrors(errors)
        }

    },[errors])

    useEffect(()=>{
        getBusinessHours()

    },[])

    const getBusinessHours = async () => {
        const resp = await fetch('/api/getBusinessHours',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await resp.json();
        console.log("Appointments: ",data.config)
        setBusinessHrs(data.config.opening_time);
    }

    const getIndex = (hour: number, mins: number, baseHour: number = businessHrs) => {
        console.log("Opening hour ",businessHrs)
        if (hour < baseHour || hour > 23 || (mins !== 0 && mins !== 30)) {
            console.log("Invalid time input");
        }
    
        const hourOffset = hour - baseHour;
        const minuteOffset = mins === 0 ? 0 : 1;
    
        return hourOffset * 2 + minuteOffset;
    };

    
    async function handleSave(e) {
        try{
            e.preventDefault();
            const data = getFormData();
            console.log("Handling save")

            const lastName = data.lastName
            const firstName = data.firstName
            const description = data.description          
            const tel = data.tel
            const dobString = data.dob
            const timeString = data.appt_time
            const sex = data.sex
            const duration = data.duration

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
            let patient = await findPatientByName(lastName,1,5).then(res=>{
                console.log("Patient res ",res)
            })
            console.log("Patient: ",patient)
            //verify patient is correct using dob
            patient?.map(p => {
                    if(p.dob.getDate() === dob.getDate() && p.dob.getMonth() === dob.getMonth() && p.dob.getFullYear() === dob.getFullYear()){
                        console.log("Patient dob verified: ", p)
                    }
             })

            //check if appointment already exists
            if(props.appt?.appointment_id){
                console.log("Update existing appointment")
                await updateAppointment(props.appt.appointment_id, patient?.patient_id, time, lastName,firstName, description, tel, dob, sex, index, duration)
            }else{
                await createAppointment(lastName,firstName, description, props.date, props.modality, tel, dob, sex, props.index, duration)
            }
           // close modal and return to /dashboard/daybook page
           router.push("/dashboard/daybook")
            props.onClose()
        }catch(e){
            console.log(e)
        }
    }

    const handleDelete = () => {
        deleteAppointment(props.appt?.appointment_id)
        props.onClose()
    }

    const handleAccessioning = () => {
        const data = getFormData();
        console.log('Accessioning:', data);
    
        // router.push(`/dashboard/accessioning?id=${props.appt?.patient_id}`)
    }

    const formRef = useRef(null);

    const getFormData = () => {
      const formData = new FormData(formRef.current);
      return Object.fromEntries(formData.entries());
    };
  
  
      
      

    return (
        <Modal show={props.show} size="md" onClose={props.onClose} popup>
            <Modal.Header>
                <div  className="justify-center">Appointment Details {props.holiday ? `: ${props.holiday}` : null}</div>
            </Modal.Header>
            <Modal.Body>
            <>
            <form autoComplete="off" ref={formRef} onSubmit={handleSave}>
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstName" value="First Name" />
                        </div>
                        <TextInput id="firstName" name="firstName" type="" placeholder="" defaultValue={typeof props.appt?.first_name === 'string' ? props.appt?.first_name : ""} required shadow
                            helperText={
                                errors?.firstName && 'Required'
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastName" value="Last Name" />
                        </div>
                        <TextInput id="lastName" name="lastName" type="" placeholder="" defaultValue={typeof props.appt?.last_name === 'string' ? props.appt?.last_name : ""} required shadow
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

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="duration" value="Duration" />
                        </div>
                        <TextInput id="duration" name="duration" type="" placeholder="30 mins" defaultValue={typeof props.appt?.duration === 'string' ? props.appt?.duration : ""} shadow
                            
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
                        <Button type="button" onClick={handleAccessioning}>Accession</Button>
                    </div>
                    </Modal.Footer>
                </div>
            </form>


        </>
            </Modal.Body>
        </Modal>
    )
}