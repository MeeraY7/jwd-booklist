// Define UI Vars
const form = document.querySelector('#book-form');
const bookList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-books');
const bookInput = document.querySelector('#book');
const authInput = document.querySelector('#author');

// Store book
function storebookInLocalStorage(book) {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));

  console.log('data added to local storage');
}

// Get books from local storage
function getbooks() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  // Generate book list from data in localstorage
  // books.forEach((book) => {
  books.map((book) => {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create string literal from title and author
    const textNode = `${book.title} by ${book.author}`;
    // Create text node and append to li element
    li.appendChild(document.createTextNode(textNode));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-times"></i>';
    // Append the link to the li
    li.appendChild(link);
    // Append li to ul
    bookList.appendChild(li);
  });

  console.log('data retrieved from local storage');
}

// Remove from local storage
function removebookFromLocalStorage(bookItem) {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.forEach(function (book, index) {
    if (bookItem.textContent === book) {
      books.splice(index, 1);
    }
  });

  localStorage.setItem('books', JSON.stringify(books));

  console.log('data removed from local storage');
}

// Clear local storage
function clearbooksFromLocalStorage() {
  localStorage.clear();
}

// Add book
function addbook(e) {
  e.preventDefault();
  if (bookInput.value === '') {
    alert('Add a book');
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    const title = bookInput.value;
    const author = authInput.value;
    const textNode = `${title} by ${author}`;
    // Create text node and append to li element
    li.appendChild(document.createTextNode(textNode));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-times"></i>';
    // Append the link to the li
    li.appendChild(link);
    // Append li to ul
    bookList.appendChild(li);

    // Store book in local storage
    storebookInLocalStorage({
      title: bookInput.value,
      author: authInput.value,
    });

    // Clear inputs
    bookInput.value = '';
    authInput.value = '';
    console.log('book added');
  }
}

// Remove book
function removebook(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove book from local storage
      removebookFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  console.log('book removed');
}

// Clear books
function clearbooks() {
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }

  // Erase local storage
  clearbooksFromLocalStorage();

  console.log('all books removed');
  console.log('local storage cleared');
}

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getbooks);
  // Add book event
  form.addEventListener('submit', addbook);
  // Remove book event
  bookList.addEventListener('click', removebook);
  // Clear book event
  clearBtn.addEventListener('click', clearbooks);
}

//Load all event listeners
loadEventListeners();
