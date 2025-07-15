export interface Appointment {
    first_name: string | null,
    last_name: string | null,
    appointment_id: number | null,
    dob: Date | null,
    tel: string | null,
    sex: string | null,
    modality?: string | null,
    appointment_time: Date | null,
    description: string | null,
    patient_id: string | null,
    index: number | null,
    duration: string | null
}

export const getBgColour = (modality:string) => {
    let colour = ""

    switch(modality){
        case 'Mammogram': 
            colour = 'bg-pink-100 dark:bg-fuchsia-900'
            break;
        case 'MRI':
            colour = 'bg-blue-100 dark:bg-indigo-900'
            break;
        case 'CT':
            colour = 'bg-red-100 dark:bg-rose-900'
            break;
        case 'UltraSound':
            colour = 'bg-green-100 dark:bg-emerald-900'
            break;
        case 'Xray':
            colour = 'bg-yellow-100 dark:bg-amber-900'
            break;
    }
        
    return colour
}


