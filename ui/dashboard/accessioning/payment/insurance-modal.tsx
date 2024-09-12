"use client"
import { InsuranceData, InsuranceProvider } from "@/types/pos";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";

interface InsuranceModalProps {
    open: boolean,
    onClose: () => void,
    setInsurance: (insurance:InsuranceData) => void,
    insuranceProviders: InsuranceProvider[]
}

export default function InsuranceModal (props: InsuranceModalProps) {
    
    console.log("Insurance modal insurance prov ",props.insuranceProviders)
        
    
    async function handleSave(data: FormData) {
        console.log("Handling save")

        let cardNo = data.get('cardNo')?.valueOf()
        const insuranceProv = data.get('insurance')?.valueOf()
        const policyNo = data.get('policyNo')?.valueOf()           
        let amt = data.get('amt')?.valueOf()
        // const insPercent = data.get('insPercent')?.valueOf()
        let ceiling = data.get('ceiling')?.valueOf()

        cardNo = typeof cardNo === 'string' ? parseInt(cardNo) : cardNo
        amt = typeof amt === 'string' ? parseFloat(amt) : amt
        ceiling = typeof ceiling === 'string' ? parseFloat(ceiling) : ceiling
        
        //TODO: check for 4 digits 
        if (typeof cardNo !== 'number' ) {
            throw new Error("Invalid Card Number")
        }
        if (typeof insuranceProv !== 'string') {
            throw new Error("Invalid Insurance Provider")
        }
        if (typeof policyNo !== 'string' || policyNo?.length === 0) {
            throw new Error("Invalid Policy Number")
        }
        if (typeof amt !== 'number') {
            throw new Error("Invalid Amount")
        }
        if (typeof ceiling !== 'number') {
            throw new Error("Invalid Ceiling")
        }

        //save insurance data
        const insurance: InsuranceData = {
            cardNo: cardNo,
            insuranceProv: insuranceProv,
            policyNo: policyNo,
            amt: amt,
            ceiling: ceiling
        }
        props.setInsurance(insurance)
        props.onClose()
    }

    return (
        <>
        <Modal show={props.open} size="md" onClose={props.onClose} popup>
            <Modal.Header>Apply Insurance</Modal.Header>
                <Modal.Body>
                    <form autoComplete="off" action={handleSave}>
                    <div className="grid grid-flow-row justify-stretch gap-3 pt-4">
                        <div className="flex">
                            <Label className="m-2" htmlFor="cardNo" value="Card" />
                           <TextInput className="m-1" id="cardNo" name="cardNo" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                
                            />
                        </div>
                        <div className="flex">
                            <Label className="m-2" htmlFor="insurance" value="Insurance" />
                            <Select id="insurance" name="insurance" defaultValue={''}  sizing='sm' disabled={false} required>
                            {props.insuranceProviders.map((prov,index) => 
                                <option value={prov.ins_abbreviation !== null ? prov.ins_abbreviation : prov.insurance_name} id={`insProvider-${index}`}>{prov.insurance_name}</option>  
                                // TODO: save insurance info to db
                            )}
                            </Select>
                        </div> 
                        <div className="flex">
                            <Label className="m-2" htmlFor="policyNo" value="Policy No" />
                           <TextInput className="m-1" id="policyNo" name="policyNo" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                
                            />
                        </div> 
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-2">Coverage</h3>
                        <div className="grid grid-cols-3">
                            <div>
                                <Label className="m-2" htmlFor="amt" value="Amount" />
                                <TextInput className="m-1" id="amt" name="amt" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                    
                                />
                            </div>
                            {/* <div>
                                <Label className="m-2" htmlFor="insPercent" value="Covered %" />
                                 <TextInput className="m-1" id="insPercent" name="insPercent" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                    
                                /> 
                                {insuranceAmt !== null ? insuranceAmt * 0.1 : ""}
                            </div> */}
                            <div>
                                <Label className="m-2" htmlFor="ceiling" value="Ceiling" />
                                <TextInput className="m-1" id="ceiling" name="ceiling" type="" sizing='xs' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow
                                    
                                />
                            </div>
                        </div>
                        <div className="flex my-2 justify-end">
                            <Button className="w-40" color="blue" size="xs" type="submit">Apply</Button>
                        </div>
                    </div>
                    </form>          
                </Modal.Body>
        </Modal>
        </>
    )
}