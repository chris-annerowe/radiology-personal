export interface ClientProvider {
    clientprov_id:     BigInt | undefined,
    clientprov_name:   string,
    clientprov_desc:   string,
    clientprov_type:   number | undefined,
    active:  Boolean
}

export interface InsuranceData {
    cardNo: number,
    insuranceProv: string,
    policyNo: string,          
    amt: number,
        // const insPercent = data.get('insPercent')?.valueOf()
    ceiling: number
}

export interface InsuranceProvider {
    insurance_id:  string,
    insurance_name:  string,
    user_id: number | null,
    last_modified: Date | null,
    in_use: number | null,
    ins_abbreviation: string | null,
    bin_nos: string | null,
    bin_codes: string | null
}