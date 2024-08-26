import { Button, Label, Modal, Select, TextInput } from "flowbite-react";

interface InsuranceModalProps {
    open: boolean,
    onClose: () => void,
}

export default function InsuranceModal (props: InsuranceModalProps) {
    const save = () => {
        console.log("Save insurance")
        //TODO: save to db
    }

    return (
        <>
        <Modal show={props.open} size="md" onClose={props.onClose} popup>
            <Modal.Header>Apply Insurance</Modal.Header>
                <Modal.Body>
                    <div className="grid grid-flow-row justify-stretch gap-3 pt-4">
                        <div className="flex">
                            <Label className="m-2" htmlFor="cardNo" value="Card" />
                           <TextInput className="m-1" id="cardNo" name="cardNo" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                
                            />
                        </div>
                        <div className="flex">
                            <Label className="m-2" htmlFor="insurance" value="Insurance" />
                            <Select id="insurance" name="insurance" defaultValue={''}  sizing='sm' disabled={false} required>
                                <option value={'M'}>Sagicor</option>
                                <option value={'F'}>Medecus</option>
                                <option value={'Other'}>NHF</option>    TODO: add table for insurance and pull values from db
                            </Select>
                        </div> 
                        <div className="flex">
                            <Label className="m-2" htmlFor="policyNo" value="Policy No" />
                           <TextInput className="m-1" id="policyNo" name="policyNo" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                
                            />
                        </div> 
                        <div className="grid grid-cols-3">
                            <div>
                                <Label className="m-2" htmlFor="amt" value="Amount" />
                                <TextInput className="m-1" id="amt" name="amt" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                    
                                />
                            </div>
                            <div>
                                <Label className="m-2" htmlFor="insPercent" value="Covered %" />
                                <TextInput className="m-1" id="insPercent" name="insPercent" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                    
                                />
                            </div>
                            <div>
                                <Label className="m-2" htmlFor="ceiling" value="Ceiling" />
                                <TextInput className="m-1" id="ceiling" name="ceiling" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                    
                                />
                            </div>
                        </div>
                        <div className="flex my-2 justify-end">
                            <Button className="w-40" color="blue" size="xs" onClick={()=>save()}>Apply</Button>
                        </div>
                    </div>          
                </Modal.Body>
        </Modal>
        </>
    )
}