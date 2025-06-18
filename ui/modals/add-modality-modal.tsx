"use client";

import { saveConfiguration } from "@/actions/configuration";
import { ActionResponse } from "@/types/action";
import BasicModal from "@/ui/common/basic-modal";
import FormLoadingModal from "@/ui/common/form-loading-modal";
import { Prisma } from "@prisma/client";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";


interface ModalProps{
    open: boolean,
    onClose: ()=>void
};
export default  function AddModality(props:ModalProps) {

    const [errors, setErrors] = useState<{[key:string]:any}>({});

    const handleSave = async (data:FormData) => {
        const name = data.get('name')?.valueOf()
        const code = data.get('code')?.valueOf()
        const description = data.get('description')?.valueOf()

        if (typeof name !== 'string' || name?.length === 0) {
            throw new Error("Invalid Modality Name")
        }
        if (typeof code !== 'string' || code?.length === 0) {
            throw new Error("Invalid Code")
        }

        console.log("Modality form values: ",name, code, description)
        
        try {
            const response = await fetch('/api/getModalities', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code, name, description
              }),
            });
    
            if (response.ok) {
              const result = await response.json();
              console.log('New modality created', result)
            } else {
              console.error('Failed to save new modality');
            }
        } catch (e) {
            console.log(e)
        }
        props.onClose()
    }

    return (
        <Modal show={props.open} onClose={props.onClose} popup>
            <Modal.Header>
                <div  className="justify-center">Add Modality </div>
            </Modal.Header>
            <Modal.Body>
        <>
            <form action={handleSave} autoComplete="off">
                <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3 pt-10">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Modality Name" />
                        </div>
                        <TextInput id="name" name="name" type="" placeholder="" color={errors?.name ? "failure" : "gray"} required shadow
                            helperText={
                                errors?.name && errors?.name[0]
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="code" value="Modality Code" />
                        </div>
                        <TextInput id="code" name="code" type="" placeholder="" color={errors?.code ? "failure" : "gray"} required shadow
                            helperText={
                                errors?.code && errors?.code[0]
                            } />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="description" value="Description" />
                        </div>
                        <TextInput id="description" name="description" type="" placeholder="" color={errors?.description ? "failure" : "gray"} shadow
                            helperText={
                                errors?.description && errors?.description[0]
                            } />
                    </div>
                </div>
                <div className="flex my-8 justify-end">
                    <Button className="w-40" type="submit" color="blue">Submit</Button>
                </div>

                <FormLoadingModal />
            </form>


        </>
        </Modal.Body>
        </Modal>
    )
}