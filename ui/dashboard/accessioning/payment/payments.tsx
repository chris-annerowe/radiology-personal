import { ClientProvider } from "@/types/pos";
import { Button, Label, Select, TextInput } from "flowbite-react";

interface PaymentData {
    amt: number,
    paidBy: string
}
interface PaymentProps {
    clientProviders: ClientProvider[],
    setPaymentData: (data:PaymentData) => void
}

export default function Payments(props:PaymentProps) {
    const savePayment = (data:FormData) => {
        let paidBy = data.get('paidBy')?.valueOf()
        let amtPaid = data.get('amount')?.valueOf()

        paidBy = typeof paidBy === 'string' ? paidBy : ""
        amtPaid = typeof amtPaid === 'string' ? parseFloat(amtPaid) : amtPaid
        if (typeof amtPaid !== 'number' ) {
            throw new Error("Invalid Amount")
        }
        if (typeof paidBy !== 'string') {
            throw new Error("Invalid Text")
        }

        props.setPaymentData({amt:amtPaid,paidBy:paidBy})
        console.log("Payment Data ",amtPaid,paidBy)
    }

    
    return (
        <div>
            <form action={savePayment} autoComplete="off" >
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
                        <TextInput id="amount" name="amount" type="number" sizing='sm' placeholder="0.00" color={"gray"} defaultValue={0} disabled={false} required shadow  />
                    </div>
            </div>
            <div className="flex my-8 justify-end">
                        <Button className="w-40" type="submit" color="blue">Save</Button>
                    
                </div>
            </form>
        </div>
    )
}