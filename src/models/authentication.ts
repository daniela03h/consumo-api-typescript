export interface RequestLoginBooks {
    email: string,
    password: string
}

export interface ResponseLoginBooks {
    message: string,
    data: Record<string, string>
}