import { db } from "@/lib/db"

export const getClientProviders = async () => {
    const providers = await db.pos_clientProviders.findMany()

    return providers
}