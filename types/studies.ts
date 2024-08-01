export interface Study{
    study_id: bigint        
    cpt_code: string         
    study_name: string | null      
    study_description: string | null
    modality_code: string       
    price: number | null
  }

  export interface PatientStudy{
    id: bigint
    patient_id: string
    study_name: string | null
    study_id: bigint
    cpt_code: string | null
  }