import { BooksController } from "../controllers/books.controller"
import { IBooksInfo } from "../models/books.models"

const controller = new BooksController()

const booksList = document.querySelector('.books-list') as HTMLDivElement
const updateButton = document.querySelector('.btn-update-submit') as HTMLButtonElement
const createButton = document.querySelector('.btn-create') as HTMLButtonElement

let modalAction: 'save' | 'edit' = 'save'

//Funcion guardian
function loginGuard() {
    const token = localStorage.getItem('token')
    if (token === null) {
        window.location.href = './index.html'
        return
    }
}

// DOMCon... se ejecuta cuando todo el contenido se cargo en el navegador
window.addEventListener('DOMContentLoaded', () => {
    loginGuard()
    renderBooksList()
    updateButton.addEventListener('click', async () => {
        const bookId = document.querySelector('#book-id') as HTMLInputElement
        const title = document.querySelector('#title') as HTMLInputElement
        const author = document.querySelector('#author') as HTMLInputElement
        const description = document.querySelector('#description') as HTMLInputElement
        const summary = document.querySelector('#summary') as HTMLInputElement

        const dataToBooks = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value
        }

        if (modalAction === 'save') {
            const result = await controller.postCreateBooks(dataToBooks)
            if (result) {
                renderBooksList()
            }

        } else {
            const respuesta = await controller.updateBooks(bookId.value, dataToBooks)
            if (respuesta) {
                renderBooksList()
            }
        }

        bookId.value = ""
        title.value = ""
        author.value = ""
        description.value = ""
        summary.value = ""
        const closeModalButton = document.querySelector('.btn-close-modal') as HTMLButtonElement
        closeModalButton.click()
    })

    createButton.addEventListener('click', () => {
        modalAction = 'save'
    })
})

async function renderBooksList() {
    const booksResult: IBooksInfo = await controller.getListBooks()
    console.log(booksResult);
    booksList.innerHTML = `<table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
        ${booksResult.data.map(book => {
        const row = `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.description}</td>
                <td class="action-buttons">
                    <button id="${book.id}" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button id="${book.id}" class="btn btn-danger"r>
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>`
        return row
    }).join('\n')}
        </tbody>
    </table>`

    const deleteButtons = document.querySelectorAll('.btn-danger')

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const bookId = btn.id
            const deleteBookResult = await controller.deleteBooks(bookId)
            if (deleteBookResult === true) {
                renderBooksList()
            }
        })
    })

    const updateButtons = document.querySelectorAll('.btn-info')

    updateButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            modalAction = 'edit'
            const response = await controller.getBook(btn.id)
            const book = await response.data
            console.log('book', book)

            const bookId = document.querySelector('#book-id') as HTMLInputElement
            const title = document.querySelector('#title') as HTMLInputElement
            const author = document.querySelector('#author') as HTMLInputElement
            const description = document.querySelector('#description') as HTMLInputElement
            const summary = document.querySelector('#summary') as HTMLInputElement

            bookId.value = book.id ? book.id : ''
            title.value = book.title
            author.value = book.author
            description.value = book.description
            summary.value = book.summary
        })
    })

}
