// Classes definition and application logic

class Book {
  constructor({ id, title, author }) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Collection {
  constructor() {
    this.books = [];
    this.nextId = 0;
  }

  addBook(bookData) {
    const newBook = new Book({...bookData, id: this.nextId});
    this.books.push(newBook);
    this.nextId += 1;
  }

  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id !== Number.parseInt(bookId, 10));
  }
}

const bookCollection = new Collection();

// User Interaction and DOM related code

const bookPartial = (book) => (`
<article class="book" id="book-${book.id}">
  <span>"${book.title}" by ${book.author}</span>
  <button class="button removeBookButton" data-id="${book.id}">Remove</button>
</article>
`);

const bookList = document.getElementById('booksList');
const addBookForm = document.getElementById('addBookForm');
const pages = document.getElementsByClassName('page');
const navToggles = document.getElementsByClassName('navButton');
const dateContainer = document.getElementById('date');

const addDate = () => {
  setInterval(() => {
    const now = new Date(Date.now());
    const options = { year: 'numeric', month: 'long', day: 'numeric', hours: 'numeric' };
    dateContainer.innerText = `${now.toLocaleString('en-US', options)} - ${now.toLocaleTimeString().toLowerCase()}`;
  }, 1000);
}

const addDeleteEvents = () => {
  [...document.getElementsByClassName('removeBookButton')].forEach(button => {
    button.addEventListener('click', e => removeBook(button.dataset.id))
  })
};

const addBookToList = ({title, author}) => {
  bookCollection.addBook({ title, author });
  clearBooks();
  renderBooks();
  addDeleteEvents();
}

const renderBooks = () => {
  bookCollection.books.forEach(book => bookList.innerHTML += bookPartial(book));
}

const clearBooks = () => {
  bookList.innerHTML = '';
}

const removeBook = (id) => {
  bookCollection.removeBook(id);
  clearBooks();
  renderBooks();
  addDeleteEvents();
  setBooksInStorage();
}

addBookForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target[0].value;
  const author = e.target[1].value;

  addBookToList({ title, author });
  setBooksInStorage();
});

[...navToggles].forEach(tab => {
  tab.addEventListener('click', () => {
    [...navToggles].forEach(t => {
      if (t.dataset.tab === tab.dataset.tab) {
        t.classList.add('selected');
      } else {
        t.classList.remove('selected');
      }
    });

    [...pages].forEach(page => {
      if (page.id === tab.dataset.tab) {
        page.classList.remove('hidden');
      } else {
        page.classList.add('hidden');
      }
    })
  })
});

// Data persistence related code

const getBooksFromStorage = () => {
  return localStorage.getItem('awesome_books');
}

const setBooksInStorage = () => {
  const parsedBooks = bookCollection.books.map(book => ({title: book.title, author: book.author}))
  localStorage.setItem('awesome_books', JSON.stringify(parsedBooks));
}

window.onload = () => {
  const storedBooks = JSON.parse(getBooksFromStorage());

  if (storedBooks) {
    storedBooks.forEach(book => {
      bookCollection.addBook(book);
    })

  }

  renderBooks();
  addDeleteEvents();

  addDate();
}