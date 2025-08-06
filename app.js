const myLibrary = [];

const book1 = new Book("test1", "test1", 21);
const book2 = new Book("test2", "test2", 22);
const book3 = new Book("test3", "test3", 23);
const book4 = new Book("test4", "test4", 24);
const book5 = new Book("test5", "test5", 24);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);

const booksContainer = document.querySelector(".books");
const form = document.getElementById("book-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;

    const book = new Book(title, author, pages);
    addBookToLibrary(book);
    refreshLibrary();
    form.reset(); // Clear the form after adding
});

function refreshLibrary() {
    while (booksContainer.hasChildNodes()) {
        booksContainer.removeChild(booksContainer.firstChild);
    }

    for (let book of myLibrary) {
        booksContainer.appendChild(generateBookCard(book));
    }
}

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.seen = false;
}

Book.prototype.read = function () {
    this.seen = !this.seen;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function generateBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    const title = document.createElement("p");
    title.setAttribute("class", "book-title");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.setAttribute("class", "book-author");
    author.textContent = book.author;

    const pages = document.createElement("p");
    pages.setAttribute("class", "book-pages");
    pages.textContent = book.pages;


    const status = document.createElement("p");
    status.setAttribute("class", "book-status");

    status.textContent = book.seen ? "Seen" : "Not Seen";

    const removeBtn = document.createElement("i");
    removeBtn.setAttribute("class", "removeBtn mdi mdi-delete");
    removeBtn.dataset.id = book.id;
    removeBtn.addEventListener("click", removeBookFromLibrary);

    const readBtn = document.createElement("i");
    if (book.seen) readBtn.setAttribute("class", "removeBtn mdi mdi-eye");
    else readBtn.setAttribute("class", "removeBtn mdi mdi-eye-closed");
    readBtn.addEventListener("click", () => toggleReadStatus(book));

    const buttons = document.createElement("div");
    buttons.setAttribute("class", "card-btns");
    buttons.appendChild(removeBtn);
    buttons.appendChild(readBtn);

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(status);
    bookCard.appendChild(buttons);

    return bookCard;
}

function removeBookFromLibrary(e) {
    const bookIdToRemove = e.target.dataset.id;

    const indexToRemove = myLibrary.findIndex((ele) => ele.id === bookIdToRemove);
    if (indexToRemove !== -1) myLibrary.splice(indexToRemove, 1);
    refreshLibrary();
}

function toggleReadStatus(book) {
    book.read();
    refreshLibrary();
}

refreshLibrary();
