showNotes();

//if user adds a note add it to local storage(add notes button)
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addNote);

//function to add notes to the local storage
function addNote(e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObject = [];
    } else {
        notesObject = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObject.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObject));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
}

//function to show notes from the local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObject = [];
    } else {
        notesObject = JSON.parse(notes);
    }
    let html = "";
    notesObject.forEach(function(element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Notes</button>
        </div>
    </div>`
    });
    let notesElements = document.getElementById("notes");
    if (notesObject.length != 0) {
        notesElements.innerHTML = html;
    } else {
        notesElements.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

//function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObject = [];
    } else {
        notesObject = JSON.parse(notes);
    }

    notesObject.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObject));
    showNotes();
}

//function to search
function search() {
    let inputVal = searchTxt.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }

    });
}

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener("input", search)