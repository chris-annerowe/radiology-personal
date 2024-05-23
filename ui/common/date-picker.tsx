import { se } from "date-fns/locale"
import { TextInput } from "flowbite-react"
import { useRef, useState } from "react"
import Datepicker from "tailwind-datepicker-react"
import { IDatePickerProps } from "tailwind-datepicker-react/types/Components/DatePicker"

const defaultOptions = {
	inputNameProp: "date",
	inputIdProp: "date",
}

const DatePicker = (props: Omit<IDatePickerProps,"show" | "setShow">) => {
	const [show, setShow] = useState<boolean>(false)
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const {onChange, options: customOptions, ...rest} = props

    const datePickerRef = useRef(null);

	const handleChange = (selectedDate: Date) => {
        if(onChange){
            onChange(selectedDate)
        }
		
	}
	const handleClose = (state: boolean) => {
		setShow(state)

        const datePickerInputId = (props.options && props.options.inputIdProp) ? props.options.inputIdProp : defaultOptions.inputIdProp

        
        const inputElement = document.getElementById(datePickerInputId);
        const inputElementValue = inputElement?.getAttribute("value");

        if(!inputElementValue){
            if(onChange){
                onChange(new Date())
            }
        }
      
        
       
        
	}


	return (
		<div>
			<Datepicker options={{...defaultOptions,...customOptions}} onChange={handleChange} show={show} setShow={handleClose}  {...rest} />
		</div>
	)
}

const CalendarIcon = () => {
	return (
		<svg aria-hidden="true" className={"w-5 h-5 text-gray-500 dark:text-gray-400"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
				clipRule="evenodd"
			></path>
		</svg>
	)
}

export default DatePicker;