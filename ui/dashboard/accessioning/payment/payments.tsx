import { ClientProvider } from "@/types/pos";
import { Label, Select, TextInput } from "flowbite-react";

interface PaymentProps {
    clientProviders: ClientProvider[]
}

export default function Payments(props:PaymentProps) {
    
    console.log("Insurance modal client prov ",props.clientProviders)
    return (
        <div>
            <div>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-3">Payments</h3>
                        <div className="mb-2 block">
                            <Label htmlFor="provider" value="Client Provider" />
                        </div>
                        <Select id="provider" name="provider" defaultValue={'P'}  sizing='sm' disabled={false} required>
                        {props.clientProviders.map(prov=> (
                            <option value={prov.clientprov_name}>{prov.clientprov_desc}</option>
                        ))}
                        </Select>
                        
            </div>
            <div>
                        <div className="mb-2 block">
                            <Label htmlFor="method" value="Method" />
                        </div>
                        <Select id="method" name="method" defaultValue={''}  sizing='sm' disabled={false} required>
                            <option value={'cs'}>Cash</option>
                            <option value={'cc'}>Credit Card</option>
                            <option value={'db'}>Debit Card</option>
                            <option value={'cq'}>Cheque</option>
                        </Select>
            </div>
                   
            <div className="grid grid-flow-row grid-cols-2 justify-stretch gap-3">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="paidby" value="Paid By" />
                        </div>
                        <TextInput id="paidby" name="paidby" type="" sizing='sm' placeholder="" color={"gray"} defaultValue={""} disabled={false} required shadow  />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="amount" value="Amount" />
                        </div>
                        <TextInput id="amount" name="amount" type="number" sizing='sm' placeholder="0.00" color={"gray"} defaultValue={""} disabled={false} required shadow  />
                    </div>
            </div>
        </div>
    )
}