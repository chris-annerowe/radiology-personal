"use server"

import { db } from '@/lib/db'
import { ActionResponse } from '@/types/action'
import ConfigurationSchema from '@/zod/schemas/configuration'


export const saveConfiguration = async (prevState: any, formData: FormData): Promise<ActionResponse> => {

    console.log(formData);

    const configurationData = {
        configuration_id: 1,
        serverHost: formData.get('server_host') as string,
        serverPort: parseInt(formData.get('server_port') as string),
        senderEmail: formData.get('sender_email') as string,
        senderPassword: formData.get('sender_password') as string,
        receiverEmail: formData.get('receiver_email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
        modifiedBy: 5

    }

    const validatedFields = ConfigurationSchema.safeParse(configurationData)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        console.log("Validation Failed");
        console.log(validatedFields.error.flatten().fieldErrors);
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
        }
    } else {
        console.log("Validation Succeeded");
        const configuration = await db.configuration.upsert({
            where: {
                configuration_id: 1
            },
            update: configurationData,
            create: configurationData
        })

        return {
            success: true,
            data: configuration
        }

    }



}

export const getConfiguration = async () => {

    const configuration = db.configuration.findUnique({
        where: {
            configuration_id: 1
        }
    })

    return configuration;

}