export interface ActionResponse<Type=void> {
    success: boolean;
    message?: string;
    data?: Type;
    errors?: { [key: string]: any };
}