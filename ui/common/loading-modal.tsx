'use client';

import { Modal, Spinner } from "flowbite-react";
import { useFormStatus } from "react-dom";



interface LoadingModalProps{
    show: boolean
    onClose?: ()=>void
    message: string

};

export default function LoadingModal(props: LoadingModalProps) {



    return (
        <Modal show={props.show} size={"sm"} onClose={props.onClose}  popup>
            <Modal.Body>
                    
                    <div className="text-center p-16">
                        <Spinner aria-label="Center-aligned spinner example" size={'xl'} />
                    </div>
                    
            </Modal.Body>

        </Modal>
    )
}