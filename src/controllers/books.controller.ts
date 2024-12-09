import { RequestLoginBooks, ResponseLoginBooks } from "../models/authentication"
import { IBooksInfo, IBooks, IBookInfo } from "../models/books.models"

const HTTP_CREATED_201 = 201

export class BooksController {

    private accessToken: string | null = null
    private baseUrl: string = 'http://190.147.64.47:5155/'

    constructor() {
    }

    async postLogin(credentials: RequestLoginBooks): Promise<ResponseLoginBooks> {
        const endpointLogin: string = 'api/v1/auth/login';
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        }

        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(credentials)
        }

        const url: string = this.baseUrl + endpointLogin;
        const result: Response = await fetch(url, reqOptions)

        if (result.status !== HTTP_CREATED_201) {
            throw new Error('Username or Password incorrect')
        }

        const responseBodyLogin: ResponseLoginBooks = await result.json();
        return responseBodyLogin;
    }

    async getListBooks(): Promise<IBooksInfo> {
        const endpointList: string = 'api/v1/books';

        const headers = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        const reqOptions: RequestInit = {
            method: 'GET',
            headers
        }

        const url: string = this.baseUrl + endpointList;
        const result: Response = await fetch(url, reqOptions)

        if (!result.ok) {
            throw new Error('Unauthorized')
        }

        const booksData = await result.json() as IBooksInfo
        return booksData
    }

    async getBook(id: string): Promise<IBookInfo> {
        const endpointList: string = `api/v1/books/${id}?limit=1000&page=1`;

        const headers = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        const reqOptions: RequestInit = {
            method: 'GET',
            headers
        }

        const url: string = this.baseUrl + endpointList;
        const result: Response = await fetch(url, reqOptions)

        if (!result.ok) {
            throw new Error('Unauthorized')
        }

        const booksData = await result.json() as IBookInfo
        return booksData
    }

    async postCreateBooks(dataToBooks: IBooks): Promise<IBooksInfo> {
        const endpointCreate: string = 'api/v1/books';

        const headers = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        const reqOptions: RequestInit = {
            method: 'POST',
            headers,
            body: JSON.stringify(dataToBooks)
        }

        const url: string = this.baseUrl + endpointCreate;
        const result: Response = await fetch(url, reqOptions)

        if (!result.ok) {
            const errorResponse = await result.json();
            console.error(`Error creating book: ${errorResponse.message}`);
            throw new Error('the book could not be created')
        }
        const responseBodyBooks: IBooksInfo = await result.json();
        return responseBodyBooks;
    }

    async updateBooks(id: string, dataToBooks: IBooks): Promise<IBookInfo | undefined> {
        const endpointUpdate: string = `api/v1/books/${id}`
        const url: string = this.baseUrl + endpointUpdate;

        const headers = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        const reqOptions: RequestInit = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(dataToBooks)
        }

        try {
            const result: Response = await fetch(url, reqOptions)
            if (result.ok === false) {
                throw new Error("There was an error updating the boo");
            }

            const bookResult = await result.json()
            return bookResult
        } catch (error: any) {
            alert(error.message)
        }
    }

    async deleteBooks(id: string): Promise<boolean> {
        const endpointDelete: string = `api/v1/books/${id}`;

        const headers = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`

        }

        const reqOptions: RequestInit = {
            method: 'DELETE',
            headers,
        }

        try {
            const url: string = this.baseUrl + endpointDelete;
            const response: Response = await fetch(url, reqOptions)
            if (!response.ok) {
                throw new Error('No se pudo eliminar el libro')
            }
            return true
        } catch (error: any) {
            alert(error.message)
            return false
        }
    }
}
