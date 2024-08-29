export interface ClientProvider {
    clientprov_id:     BigInt | undefined,
    clientprov_name:   string,
    clientprov_desc:   string,
    clientprov_type:   number | undefined,
    active:  Boolean
}

export interface InsuranceProvider {
    cardNo: number,
    insuranceProv: string,
    policyNo: string,          
    amt: number,
        // const insPercent = data.get('insPercent')?.valueOf()
    ceiling: number
}