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