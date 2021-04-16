// Classes definition and application logic

class Book {
  constructor({ title, author }) {
    this.title = title;
    this.author = author;
  }
}

class Collection {
  constructor() {
    this.books = [];
  }

  addBook(bookData) {
    const newBook = new Book(bookData);
    this.books.push(newBook);
  }

  removeBook(bookId) {
    this.filter = this.books.filter((book) => {
      if (book.id !== bookId) {
        return true;
      }

      return false;
    })
  }
}

const bookCollection = new Collection();

// User Interaction and DOM related code

const bookPartial = (book) => (`
<article id="book-${book.id}">
  <h4>${book.title}</h4>
  <p>${book.author}</p>
</article>
<hr/>
`);

const bookList = document.getElementById('booksList');
const addBookForm = document.getElementById('addBookForm');

const addBookToList = ({title, author}) => {
  bookCollection.addBook({ title, author });
  clearBooks();
  renderBooks();
}

const renderBooks = () => {
  bookCollection.books.forEach(book => bookList.innerHTML += bookPartial(book));
}

const clearBooks = () => {
  bookList.innerHTML = '';
}

addBookForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target[0].value;
  const author = e.target[1].value;

  addBookToList({ title, author });
})

window.onload = () => {
  renderBooks();
}