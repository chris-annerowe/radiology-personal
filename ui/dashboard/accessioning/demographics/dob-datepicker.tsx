import { Datepicker, Label } from "flowbite-react";

export default function DatePickerField(props: {dob?: Date, disabled: boolean}){
    return (
        <div>
            <div className="mb-2 block">
                <Label htmlFor="dob" value="Date Of Birth" />
            </div>
            <Datepicker id='dob' name="dob" maxDate={new Date()}  size={8} defaultDate={props.dob ? props.dob : undefined} disabled={props.disabled} required/>
        </div>
    )
}