
//refreshing page adds a third book to library because it adds
    //a "false" for "read/unread".

//Array to hold books
let myLibrary = [];

//Constructor
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}
//Starting books for test purposes
/*
let book1 = new Book("J.K. Simmons", "Tobey Potter and the Arm", 500, true);
let book2 = new Book("Allen Iverson", "I Didn't Write This", 50, false);
myLibrary.push(book1);
myLibrary.push(book2);
*/
//localStorage.clear();
/*
//Test local storage
localStorage.setItem("author0", "J.R. Smithons");
localStorage.setItem("title0", "Balls");
localStorage.setItem("pages0", "5000");
localStorage.setItem("read0", "false");
//Other Entry
localStorage.setItem("author1", "Bill Daughtrive");
localStorage.setItem("title1", "Tell Ya What");
localStorage.setItem("pages1" , "5");
localStorage.setItem("read1", "true");
*/
console.log(localStorage.length);
//Load local storage
/*
if (!(localStorage.getItem('author0'))) {
    console.log("No saved data to load");
    //THIS MIGHT CAUSE AN ISSUE WHEN DELETING FIRST BOOK ONLY

} else {
    //Use localStorage.length/4 for iterating
    //this keeps adding one because it gets an extra "read/unread"
        //from somewhere for an extra book entry
        //keep this in mind if it becomes an issue
    for (let i = 0; i <= ((localStorage.length / 4) - 1); i++) {

        let book = new Book(localStorage.getItem("author" + i),
        localStorage.getItem("title" + i), parseInt(localStorage.getItem("pages" + i)),
        localStorage.getItem("read" + i));
        //JSON.parse breaks program
    
        myLibrary.push(book);
        console.log(i);
        console.log(localStorage.getItem('author2'));
    }
}
*/
//if statement that sets i. If "author" + i is false, increase
    //i until it's true. start from that i for loading local
    //storage
    //THIS DOESN'T WORK. IF IT'S EMPTY, IT NEVER ENDS


for (let i = 0; i <= ((localStorage.length / 4) - 1); i++) {

    let book = new Book(localStorage.getItem("author" + i),
    localStorage.getItem("title" + i), parseInt(localStorage.getItem("pages" + i)),
    localStorage.getItem("read" + i));
    //JSON.parse breaks program

    myLibrary.push(book);
    console.log(i);
    console.log(localStorage.getItem('title1'));
}

//Creates form element for user to enter book
function displayForm(){
    if (document.getElementById("author")) {
        //This prevents multiple forms from being created
    }

    else {

    let form = document.createElement("form");
    form.setAttribute("id", "entryForm");
    document.body.appendChild(form);

    let author = document.createElement("input");
    author.setAttribute("type", "text");
    author.setAttribute("placeholder", "Author");
    author.setAttribute("id", "author");
    document.getElementById("entryForm").appendChild(author);

    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "Book Title");
    title.setAttribute("id", "title");
    document.getElementById("entryForm").appendChild(title);

    let pages = document.createElement("input");
    pages.setAttribute("type", "number");
    pages.setAttribute("placeholder", "Pages");
    pages.setAttribute("id", "pages");
    document.getElementById("entryForm").appendChild(pages);
    /*Old button
    let read = document.createElement("input");
    read.setAttribute("type", "checkbox");
    read.setAttribute("id", "read");
    read.setAttribute("value", "Read");
    document.getElementById("entryForm").appendChild(read);
    */
    let read = document.createElement("input");
    read.setAttribute("type", "button");
    read.setAttribute("id", "read");
    read.setAttribute("value", "Read");
    document.getElementById("entryForm").appendChild(read);

    let save = document.createElement("input");
    save.setAttribute("type", "button");
    save.setAttribute("id", "save");
    save.setAttribute("value","Save");
    document.getElementById("entryForm").appendChild(save);
    }
}

//Adds and displays new books
function addBookToLibrary(author, title, pages, read) {
    let userEntry = new Book(author, title, pages, read);
    myLibrary.push(userEntry);

    //Add book to displayed library
    let container = document.getElementById("library");
    let card = document.createElement("div");
    card.className = "card";
    card.id = "card" + (myLibrary.length - 1);
    card.innerHTML = "Author: " + JSON.stringify(myLibrary[myLibrary.length - 1].author).replace(/['"]+/g, '') + "<br />" +
    "Title: " + JSON.stringify(myLibrary[myLibrary.length - 1].title) + "<br />" +
    "Pages: " + JSON.stringify(myLibrary[myLibrary.length - 1].pages).replace(/['"]+/g, '') + "<br />";
    container.append(card);

    //Adds "read" button to div
    let readBook = document.createElement("button");
    readBook.className = "readBook";
    readBook.id = "readBook" + (myLibrary.length - 1);
    //If/else controls what innerHTML of button says
    /*if (myLibrary[myLibrary.length - 1]["read"] == "Read") {
        readBook.value = "Read";
        } else if (!(myLibrary[myLibrary.length - 1]["read"] == "Unread")) {
            readBook.value = "Unread";
        }
    */
    readBook.innerHTML = JSON.stringify(myLibrary[myLibrary.length - 1].read).replace(/['"]+/g, '')
        card.append(readBook);
    
    //Inserts line break between buttons
    let lineBreak = document.createElement("br");
    card.append(lineBreak);
    
    //Adds delete button to div
    let deleteBook = document.createElement("button");
    deleteBook.className = "deleteBook";
    deleteBook.id = "deleteBook" + (myLibrary.length - 1);
    deleteBook.innerHTML = "Delete";
    card.append(deleteBook);

    //Saves to local memory
    //Put an If-check once cloud is implemented
    localStorage.setItem("author" + (myLibrary.length - 1), author);
    localStorage.setItem("title" + (myLibrary.length - 1), title);
    localStorage.setItem("pages" + (myLibrary.length - 1), pages.toString());
    localStorage.setItem("read" + (myLibrary.length - 1), read.toString());

    //Saves to firebase cloud
    //Put if check
    //Tutorial's rootRef = database.ref('users');
    /*
    rootRef.child(myLibrary.length - 1).set({
        author: author,
        title: title,
        pages: pages,
        read: read
    });
    */
}

//Displays stored books
function displayLibrary (myLibrary) {
    let container = document.getElementById("library");
    for (let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.id = "card" + i;
        card.innerHTML = "Author: " + JSON.stringify(myLibrary[i].author).replace(/['"]+/g, '') + "<br />" +
         "Title: " + JSON.stringify(myLibrary[i].title) + "<br />" +
         "Pages: " + JSON.stringify(myLibrary[i].pages).replace(/['"]+/g, '') + "<br />";
        container.append(card);

        //Adds "read" button to div
        let readBook = document.createElement("button");
        readBook.className = "readBook";
        readBook.id = "readBook" + i;
        //If/else controls what innerHTML of button says
        if (myLibrary[i]["read"] == "Read") {
        readBook.innerHTML = "Read";
        console.log('book is read');
        console.log(myLibrary[i]["read"]);
        } else if (myLibrary[i]["read"] == "Unread") {
            readBook.innerHTML = "Unread";
            console.log('book is not read');
        }
        card.append(readBook);

        //Inserts line break between buttons
        let lineBreak = document.createElement("br");
        card.append(lineBreak);

        //Adds "delete" button to div
        let deleteBook = document.createElement("button");
        deleteBook.className = "deleteBook";
        deleteBook.id = "deleteBook" + i;
        deleteBook.innerHTML = "Delete";
        card.append(deleteBook);
        console.log(myLibrary[i]);

    }
}

//Executes when user clicks "Erase Library" button
function eraseLibrary() {
    localStorage.clear();
    myLibrary = [];

    let libraryDiv = document.getElementById('library');
    while(libraryDiv.firstChild){
        libraryDiv.removeChild(libraryDiv.firstChild);
    }

    displayLibrary(myLibrary);
}

//This function makes sure that the Local Storage number
//corresponds with the element's id number

//Array updates. 1 moves to 0 if 0 is deleted
//Cards do not update but they move over visually
//Local Storage names need to start at 0 to work correctly

//Get number of current books in library
function reorderLocalStorage() {
    localStorage.clear();
    //loop through array reassigning data to local storage
    //user two iterating numbers one goes up for each loop
        //one only goes up when the array is truthy (this number
        //is for the local storage key)
    //POSSIBLE CAUSE OF ERROR:
        //After pressing delete, 
    let i = 0;

    do {
        console.log("THE LOOP IS AT: " + i);
        console.log(i - 1);
        console.log(myLibrary.length);
        let author = JSON.stringify(myLibrary[i]["author"]).replace(/['"]+/g, '');
        let title = JSON.stringify(myLibrary[i]["title"]).replace(/['"]+/g, '');
        let pages = JSON.stringify(myLibrary[i]["pages"]).replace(/['"]+/g, '');
        let read = JSON.stringify(myLibrary[i]["read"]).replace(/['"]+/g, '');

        localStorage.setItem("author" + i, author);
        localStorage.setItem("title" + i, title);
        localStorage.setItem("pages" + i, pages);
        localStorage.setItem("read" + i, read);

        i++;

    } while (i < (myLibrary.length - 1));
}

//Set variables for entries
let author = '';
let title = '';
let pages = 0;
let read = false;

//Display initial Library
console.log('displaying library');
displayLibrary(myLibrary);

//Executed when user clicks "save" or "read" when adding new book
document.getElementById('entryForm').addEventListener("click", function(event) {
    let target = event.target;
    console.log(target.id);

    if (target.id == "save") {
    author = document.getElementById('author').value;
    title = document.getElementById('title').value;
    pages = document.getElementById('pages').value;
    //read will have to be changed to a button for continuity
    read = document.getElementById('read').value;
    
    //Adds book to library
    addBookToLibrary(author, title, pages, read);
 
    //delete all child divs after saving
    let entryFormDiv = document.getElementById("entryForm");
    while (entryFormDiv.lastElementChild) {
        entryFormDiv.removeChild(entryFormDiv.lastElementChild);
        }
    }

    if (target.id == "read") {
        if (target.value == "Read") {
            //toggle between read or unread
            document.getElementById("read").setAttribute("value", "Unread");
        } else if (target.value == "Unread") {
            document.getElementById("read").setAttribute("value", "Read");
        }

    }

    return false
});

//Executed when user clicks "Delete" or "Read"/"Unread" in library
document.getElementById('library').addEventListener("click", function(event) {
    let target = event.target;
    console.log(target.id);

    //This if statement makes it so only buttons are clickable
    if (target.id.includes("deleteBook")) {
        //Remove targeted div
        target.parentNode.remove();

        //Empties myLibrary array if there is only one entry
        if (myLibrary.length == 1) {
            myLibrary = [];
            //Add if statements to delete from local storage
                //and cloud
        }

        //Remove target from array
        let arrayLocation = target.id.replace(/\D/g,'');
        myLibrary.splice(arrayLocation, 1);

        //Put reorder local storage function here
        reorderLocalStorage();

        //Remove from localStorage. Make this an if statement
            //after adding cloud storage option
        //OLD METHOD
        /*
        localStorage.removeItem("author" + arrayLocation);
        localStorage.removeItem("title" + arrayLocation);
        localStorage.removeItem("pages" + arrayLocation);
        localStorage.removeItem("read" + arrayLocation);
        */

        //Removes from firebase cloud
        //rootRef.child(arrayLocation).remove();

        } 
        //This toggles the read status of the books
        else if (target.id.includes("readBook")) {
            let arrayLocation = target.id.replace(/\D/g,'');
            console.log(arrayLocation);
            if (myLibrary[arrayLocation]["read"] == "Read") {
                myLibrary[arrayLocation]["read"] = "Unread";

                document.getElementById("readBook" + arrayLocation)
                .innerHTML = "Unread";
                console.log(myLibrary[arrayLocation]["read"]);

                //Edits localStorage
                localStorage.setItem("read" + arrayLocation, "Unread");

                //Edits cloud storage
                /*let newData = {
                    read: 'false'
                }
                rootRef.child(arrayLocation).update(newData);*/

            } else if (!(myLibrary[arrayLocation]["Unread"])) {
                myLibrary[arrayLocation]["read"] = "Read";

                document.getElementById("readBook" + arrayLocation)
                .innerHTML = "Read";
                console.log(myLibrary[arrayLocation]["read"]);

                //Edits localStorage
                localStorage.setItem("read" + arrayLocation, "Read");

                //Edits cloud storage
                /*let newData = {
                    read: 'true'
                }
                rootRef.child(arrayLocation).update(newData);*/
            }

        }
    
    

    

    //TEST THIS: delete everthing, add one, then delete that one
    // "referenceerror i is not defined??"
    //it works either way *shrugs*

    //if variable && delete are clicked, delete entry from array
    //Issues: Erases full library if you click anywhere but the button
        //Solution: If/else. Make else blank
});

//Takes user input when "Add Book" is clicked
/*
document.getElementById('entryForm').onsubmit = function() {
    author = document.getElementById('author').value;
    title = document.getElementById('title').value;
    pages = document.getElementById('pages').value;
    read = document.getElementById('read').checked;
    
    addBookToLibrary(author, title, pages, read);
    
    //Reset Value after submission
    document.getElementById('author').value = '';
    document.getElementById('title').value = '';
    document.getElementById('pages').value = null;
    document.getElementById('read').checked = false;

    //Display new entry
    //displayLibrary(myLibrary);

    return false
}
*/
