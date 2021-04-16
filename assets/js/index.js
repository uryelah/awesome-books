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

bookCollection.addBook({ title: '100 years of solitude', author: 'Juan' });

bookCollection.books.forEach(book => bookList.innerHTML += bookPartial(book));