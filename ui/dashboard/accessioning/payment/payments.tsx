import { ClientProvider, PaymentData, PaymentType } from "@/types/pos";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { HiPlus } from "react-icons/hi";


interface PaymentProps {
    clientProviders: ClientProvider[],
    paymentTypes: PaymentType[],
    setPaymentData: (data:PaymentData) => void
}

export default function Payments(props:PaymentProps) {
    console.log("Payments props", props.paymentTypes,props.clientProviders)
    const savePayment = (data:FormData) => {
        let paidBy = data.get('paidby')?.valueOf()
        let amtPaid = data.get('amount')?.valueOf()
        let method = data.get('method')?.valueOf()
        let provider = data.get('provider')?.valueOf()

        paidBy = typeof paidBy === 'string' ? paidBy : ""
        amtPaid = typeof amtPaid === 'string' ? parseFloat(amtPaid) : amtPaid
        method = typeof method === 'string' ? method : ""
        provider = typeof provider === 'string' ? provider : ""
        if (typeof amtPaid !== 'number' ) {
            throw new Error("Invalid Amount")
        }
        if (typeof paidBy !== 'string') {
            throw new Error("Invalid Text")
        }
        if (typeof method !== 'string') {
            throw new Error("Invalid Payment Type")
        }
        if (typeof provider !== 'string') {
            throw new Error("Invalid Client Provider")
        }

        props.setPaymentData({amt:amtPaid,paidBy:paidBy,paymentType:method, provider: provider})
    }

    
    return (
        <div>
            <form action={savePayment} autoComplete="off" >
            <div>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-cyan-500 sm:text-2xl mb-3">Payments</h3>
                        <div className="mb-2 block">
                            <Label htmlFor="provider" value="Client Provider" />
                        </div>
                        <Select id="provider" name="provider" defaultValue={''}  sizing='sm' disabled={false} required>
                        {props.clientProviders.map((prov,index)=> (
                            <option value={prov.clientprov_name} id={`clientProvider-${index}`}>{prov.clientprov_desc}</option>
                        ))}
                        </Select>
                        
            </div>
            <div>
                        <div className="mb-2 block">
                            <Label htmlFor="method" value="Method" />
                        </div>
                        <Select id="method" name="method" defaultValue={''}  sizing='sm' disabled={false} required>
                        {props.paymentTypes.map((type,index)=> (
                            <option value={type.abbreviation} id={`paymentType-${index}`}>{type.name}</option>
                        ))}
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
                        <TextInput id="amount" name="amount" type="number" sizing='sm' placeholder="0.00" color={"gray"} defaultValue={0} disabled={false} required shadow  />
                    </div>
            </div>
            <div className="flex my-2 justify-end">
                        <Button className="w-10" type="submit" color={'grey'}><HiPlus/></Button>
                    
                </div>
            </form>
        </div>
    )
}