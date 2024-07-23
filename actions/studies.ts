'use server';


import { db } from "@/lib/db";



export const findAllStudies = async () => {

    const studies = db.studies.findMany();

    return studies;

}