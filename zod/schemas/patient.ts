import z from "../zod";



const PatientSchema = z.object({
    first_name: z.string().max(60),
    last_name: z.string().max(60),
    other_name: z.string().max(60) || null,
    dob: z.date(),
    age: z.number(),
    sex: z.string().max(1),
    // height: z.number() || null,
    // weight: z.number() || null,
    // allergies: z.string().max(255) || null,
    nationality: z.string().max(2),
    // next_kin: z.string().max(255) || null,
    address_1: z.string().max(60),
    address_2: z.string().max(60) || null,
    city: z.string().max(20),
    parish: z.string().max(25),
    telephone_1: z.string().max(40),
    telephone_2: z.string().max(40),
    cellular: z.string().max(40),
    email: z.string().email(),
    id_type: z.string().max(3),
    idnum: z.string().max(40)
    

});

export default PatientSchema;