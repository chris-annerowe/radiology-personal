import z from "../zod";



const ConfigurationSchema = z.object({
    serverHost: z.string({message: "Please enter a valid Server Host"}),
    serverPort: z.number({message: "Please enter a valid Server Port"}),
    senderEmail: z.string().email(),
    senderPassword: z.string(),
    // receiverEmail: z.string().email(),
    // subject: z.string(),
    // message: z.string(),
});

export default ConfigurationSchema;