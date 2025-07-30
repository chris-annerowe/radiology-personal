import { db } from "@/lib/db"

export const findWorklists = async (page: number, limit: number) => {
   
    const [worklists, count] = await db.$transaction([
        db.worklist.findMany({
            skip: ((page - 1) * limit),
            take: limit
        }),
        db.patient.count()
    ])

    const data = {
        pagination: {
            count: count
        },
        data: worklists
    }

    //return JSON.parse(JSON.stringify(data)) 
    return data;

}