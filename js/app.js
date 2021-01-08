// Define UI Vars
const form = document.querySelector('#book-form');
const bookList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-books');
const bookInput = document.querySelector('#book');
const authInput = document.querySelector('#author');

// Get books from local storage
function getbooks() {
  // TODO:
  // 1) Declare variable for books array
  let books;
  // 2) Get books out of localstorage and parse into JS array
  // if localstorage is empty, assign books to empty array
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  let itemHTML = '';
  // Generate book list HTML including data in localstorage
  books.map((book) => {
    itemHTML += `
      <li class="collection-item">
        ${book.title} by ${book.author}
        <a class="delete-item secondary-content"><i class="fa fa-times"></i></a>
      </li>
    `;
    bookList.innerHTML = itemHTML;
  });

  console.log('data retrieved from local storage');
}

// Store book
function storebookInLocalStorage(book) {
  // TODO:
  // 1) Declare variable for books array
  let books;
  // 2) Get books out of localstorage and parse into JS array
  // if localstorage is empty, assign books to empty array
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  // 3) Push our book onto array
  books.push(book);
  // 4) Put new array back into localstorage (parse into string first)
  localStorage.setItem('books', JSON.stringify(books));
  console.log('data added to local storage');
}

// Clear local storage
function clearbooksFromLocalStorage() {
  localStorage.clear();
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

    // TODO: Store book in local storage
    // Call storebookInLocalStorage function, passing in the JS Object with variables
    const book = {
      title: title,
      author: author,
    };
    storebookInLocalStorage(book);
    // Clear inputs
    bookInput.value = '';
    authInput.value = '';
    console.log('book added');
  }
}

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getbooks);
  // Add book event
  form.addEventListener('submit', addbook);
  // Remove book event
  // bookList.addEventListener('click', removebook);
  // Clear book event
  clearBtn.addEventListener('click', clearbooks);
}

//Load all event listeners
loadEventListeners();
