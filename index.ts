import { RequestLoginBooks, ResponseLoginBooks  }from "./src/models/authentication"
import { BooksController }from "./src/controllers/books.controller"

const form = document.querySelector("form") as HTMLFormElement;
const email = document.querySelector("#email") as HTMLInputElement;
const password = document.querySelector("#password") as HTMLInputElement;

form.addEventListener("submit", async(e:Event) => {
    e.preventDefault();
    const dataToLogin: RequestLoginBooks = {
        email: email.value,
        password: password.value
    }
    const booksController: BooksController = new BooksController()
    try{
        const resultLogin: ResponseLoginBooks = await booksController.postLogin(dataToLogin)
        localStorage.setItem('token', resultLogin.data.token)
        window.location.href = '/books.html'
            form.reset() 
    }catch(error){
        alert(error.message)
    }
})
