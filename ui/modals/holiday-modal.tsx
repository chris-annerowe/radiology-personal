'use client';

import { createAppointment } from "@/data/appointment";
import { format } from "date-fns";
import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface ModalProps{
    show: boolean
    onClose: ()=>void
    holiday: string
};

export default function HolidayModal(props: ModalProps) {
    
    return (
        <Modal show={props.show} size="md" onClose={props.onClose} popup>
            <Modal.Header>
                <div  className="justify-center items-center ">Note:</div>
            </Modal.Header>
            <Modal.Body>
            <>
            <div className="flex items-center justify-center mb-2 block">
                <p>The selected date is a public holiday: {props.holiday}. Would you like to proceed?</p>
            </div>
            <Modal.Footer>
                <div className="flex gap-2 justify-center">
                    <Button onClick={()=>{props.onClose()}}>OK</Button>
                </div>
            </Modal.Footer>

        </>
            </Modal.Body>
        </Modal>
    )
}