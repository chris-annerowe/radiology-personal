export interface ClientProvider {
    clientprov_id:     BigInt | undefined,
    clientprov_name:   string,
    clientprov_desc:   string,
    clientprov_type:   number | undefined,
    active:  Boolean
}