import { RequestLoginBooks, ResponseLoginBooks } from "../models/authentication"

export class BooksController {

    private accessToken: string | null = null

    constructor(private urlApi: string) {


    }

    async postLogin(data: RequestLoginBooks): Promise<ResponseLoginBooks> {
        const endpointLogin: string = 'api/v1/auth/login';
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        }

        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }

        const url: string = this.urlApi + endpointLogin;
        const result: Response = await fetch(url, reqOptions)

        if (result.status !== 201) {
            console.log(`Response body: ${(await result.json()).message}`)
            throw new Error('Username or Password incorrect')
        }

        const responseBodyLogin: ResponseLoginBooks = await result.json();
        this.accessToken = responseBodyLogin.data.token
        return responseBodyLogin;
    }
}
