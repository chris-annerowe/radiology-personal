import { db } from "@/lib/db"

export const getClientProviders = async () => {
    const providers = await db.pos_clientProviders.findMany()

    return providers
}

export const getInsuranceProviders = async () => {
    const providers = await db.pos_insurance.findMany()

    return providers
}