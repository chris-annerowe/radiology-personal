export interface Appointment {
    firstName: string | null,
    lastName: string | null,
    appointment_id: bigint,
    dob: Date | null,
    tel: string | null,
    sex: string,
    modality: string | null,
    appointment_time: Date | null
}

export const getBgColour = (modality:string) => {
    let colour = ""

    switch(modality){
        case 'Mammogram': 
            colour = 'pink'
            break;
        case 'MRI':
            colour = 'blue'
            break;
        case 'CT':
            colour = 'red'
            break;
        case 'UltraSound':
            colour = 'green'
            break;
        case 'Xray':
            colour = 'yellow'
            break;
        default:
            colour = 'slate'
            break;
    }
        
    return colour
}