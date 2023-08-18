const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector(".allBooks");
const inputs = document.querySelectorAll('input');
const confirmBtn = favDialog.querySelector("#confirmBtn");
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let pages = document.querySelector('#pages');
let hasRead =  document.querySelector('#hasread');
let library = [];
let index = 0;
index ++;


function Book(title, author, pages, hasread, indexi) { 
    this.mytitle = title;
    this.myauthor = author;
    this.mypages = pages;
    this.hasReadBook = hasread;
    this.index = indexi;
}

showButton.addEventListener("click", () => {
    favDialog.showModal();
    title.value = '';
    author.value = '';
    pages.value = '';
    hasRead.checked = false;

});

let removeCard = (indexi)  => {
    for (book in library) {
        if (library[book].index === indexi) {
            delete library[book];
        };
    };
    library = library.filter(function (el) {
        return el != null;
    });
    console.log(library.length); 

    if (library.length === 0) {
        outputBox.innerHTML = '';
    }
    else {
        showBooks();
    };
};

let showBooks = () => {
    outputBox.innerHTML = '';
    for (book of library) {
        let newDiv = document.createElement('div');
        if (book.hasReadBook === 'Has Read') {
            newDiv.innerHTML = `
            <h3>"${book.mytitle}"</h3>
            <h3>${book.myauthor}</h3> 
            <h3>${book.mypages} Pages</h3>
            <button class='hasReadButton readbtn' id='${book.index}' onClick="toogleBtn(${book.index})">${book.hasReadBook}</button>
            <button class='removeCard' id='${book.index}' onClick="removeCard(${book.index})">Remove</button>
            `;
            newDiv.classList.add('cards');
            outputBox.appendChild(newDiv);
        }
        else if (book.hasReadBook === "Hasn't Read") {
            newDiv.innerHTML = `
            <h3>"${book.mytitle}"</h3>
            <h3>${book.myauthor}</h3> 
            <h3>${book.mypages} Pages</h3>
            <button class='hasNotReadButton readbtn' id='${book.index}' onClick="toogleBtn(${book.index})">${book.hasReadBook}</button>
            <button class='removeCard' onClick="removeCard(${book.index})">Remove</button>
            `;
            newDiv.classList.add('cards');
            outputBox.appendChild(newDiv);
        };

    };
};


let toogleBtn = (e) => {
    let cardIndex = e;
    for (book of library) {

        if (book.index === cardIndex) {
            if (book.hasReadBook === 'Has Read') {
                book["hasReadBook"] = "Hasn't Read";
            }
            else {
                book["hasReadBook"] = "Has Read";
            };

            showBooks();

        };
    };
};


favDialog.addEventListener("close", (e) => {

    if (favDialog.returnValue === 'submitted') {

        let readStatus = '';
        if (hasRead.checked) {
            readStatus = 'Has Read';
        }
        else {
            readStatus = "Hasn't Read";
        }
        let newBook = new Book(title.value, author.value, pages.value, readStatus, index);
        index++;

        library.push(newBook);
        showBooks();

    }
    else {
        console.log('user canceled the button') 
    };


});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); 
  favDialog.close('submitted'); 
});

