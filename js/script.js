//get the ui element
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');

//book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

//UI class
class UI {
    static addToBooklist(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr')
        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td> <a href='#' class='delete'>X</a> </td>`;
        list.appendChild(row);
    }
    static clearFields() {
        document.querySelector('#title').Value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static deleteFromBook(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            UI.showAlert('Succesfully Removed!', 'success');

        }
    }
}

//Local Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//add eventlistener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);


//Define function
function newBook(e) {
    let title = document.querySelector('#title').Value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please Fill All The fields!', 'error');
    } else {
        let book = new Book(title, author, isbn);
        UI.addToBooklist(book);
        UI.clearFields();
        UI.showAlert('Succesfully Added', 'success');
        Store.addBook(book);
    }



    e.preventDefault();
}

function removeBook(e) {
    UI.deleteFromBook(e.target);
    e.preventDefault();
}