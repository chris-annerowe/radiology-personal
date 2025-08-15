export interface ClientProvider {
    clientprov_id:     number | undefined,
    clientprov_name:   string,
    clientprov_desc:   string,
    clientprov_type:   number | undefined,
    active:  Boolean
}

export interface PaymentType {
    abbreviation: string,
    name: string,
    id_required: boolean
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

export interface PaymentData {
    amt:number,
    paidBy: string,
    paymentType: string,
    provider: string
}

export interface POSTransaction {
    transaction_id        :string,  
    order_id              :string,  
    patient_last_name     :string , 
    patient_first_name    :string ,    
    patient_id            :string ,    
    numOfStudies          :number,
    items                 :string,
    totalBillable         :number,
    totalCost             :number,
    discountAmt           :number,
    insuranceAmt          :number,
    taxPaid               :number,
    amountPaid            :number,
    outstanding_balance    :number,
    paidBy                :string | null,
    paymentType           :string | null,
    clientProvider        :string | null,
    insuranceProvider     :string | null,
    timestamp             :Date
}

export interface POSOrder {  
    orderno               :string,  
    patient_id            :string ,    
    balance_outstanding   :number,
    payment_status        :string,
    last_modified         :Date
}