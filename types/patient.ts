


export interface Patient {
    patient_id: string
    patient_uid?: string | null
    internalid?: string | null
    id_type?: string | null
    idnum?: string | null
    first_name: string
    last_name: string
    other_name?: string | null
    dob?: Date | string | null
    address_1?: string | null
    address_2?: string | null
    city?: string | null
    post_code?: string | null
    parish?: string | null
    height?: number | string | null
    height_unit?: string | null
    weight?: number | string | null
    weight_unit?: string | null
    telephone_1?: string | null
    telephone_2?: string | null
    fax?: string | null
    cellular?: string | null
    entry_date?: Date | string | null
    next_kin?: string | null
    guardian?: string | null
    sex?: string | null
    age?: number | null
    months?: number | null
    days?: number | null
    branchcode?: string | null
    title?: string | null
    nationality?: string | null
    inuse?: number | null
    userid?: number | null
    last_modified?: Date | string | null
    race?: number | null
    email?: string | null
    allergies?: string | null
  }