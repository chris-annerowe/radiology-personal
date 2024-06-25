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
            colour = 'bg-pink-100 dark:bg-pink-900'
            break;
        case 'MRI':
            colour = 'bg-blue-100 dark:bg-blue-900'
            break;
        case 'CT':
            colour = 'bg-red-100 dark:bg-red-900'
            break;
        case 'UltraSound':
            colour = 'bg-green-100 dark:bg-green-900'
            break;
        case 'Xray':
            colour = 'bg-yellow-100 dark:bg-yellow-900'
            break;
    }
    console.log("Bg colour ",colour)
        
    return colour
}


