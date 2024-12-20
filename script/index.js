import { CourseInfo, AssignmentGroup, result, getDate } from "./data.js";

let title = document.getElementById("title");
title.style.textAlign = "center";
title.textContent = CourseInfo.name;

let chapter = document.querySelector("#chapter");
chapter.textContent = AssignmentGroup.name;
chapter.style.textAlign = "center";



let titleDiv = true;

let assignmentTable = createTable(AssignmentGroup.assignments)

function createTable(data) {
    let assignmentTableFragment = document.createDocumentFragment();

    data.forEach((assignment) => {
        //create div for row
        if (titleDiv) {
            let titleRow = createTitleRow(assignment);
            titleRow.classList.add("dataCell");
            titleRow.style.borderTop = "1px solid black";
    
            assignmentTableFragment.appendChild(titleRow);
            titleDiv = false;
    
        }
    
        let row = createDataRow(assignment);
        row.classList.add("dataCell");
        // console.log(screen);
    
    
        assignmentTableFragment.appendChild(row);
    })
    return assignmentTableFragment
}

// console.log(assignmentTableFragment)
function createTitleRow(dataPerRow) {
    const divRow = document.createElement("div");
    for (let cell in dataPerRow) {
        let assign = ""
        const listItem = document.createElement("p");
        if (Number(cell)) {
            assign = "assignment "
        }
        listItem.textContent = assign + cell.replace("_", " ");

        divRow.appendChild(listItem);
    }
    return divRow
}

function createDataRow(dataPerRow) {
    const divRow = document.createElement("div");
    for (let cell in dataPerRow) {
        const listItem = document.createElement("p");
        listItem.textContent = dataPerRow[cell];
        divRow.appendChild(listItem);
    }
    return divRow;
}

chapter.nextElementSibling.appendChild(assignmentTable);

// get the width when the window loads
window.addEventListener("load", resizeTable);

// create a listener to the window with do that it rearenget if the screen changes
window.addEventListener("resize", resizeTable);

function resizeTable() {
    let rowCell = document.querySelectorAll(".dataCell > p");
    rowCell.forEach((pTag) => {
        pTag.style.width = `${window.innerWidth / 5}px`;
    })

    let studetRow = document.querySelectorAll(".studentTable p");
    // console.log(rowCell)
    // console.log(studetRow)
    studetRow.forEach((pTag) => {
        pTag.style.width = `${window.innerWidth / 7}px`;
    })

}

// display input that will take the date
let searchForm = document.createElement("form");
searchForm.id = "table";
searchForm.classList.add("form");

//create a check back for all student or search single student
let checkButtons = document.createElement("div");
checkButtons.style.padding = "20px"

let searchAll = document.createElement("button");
searchAll.textContent = "All Students"
searchAll.classList.add("selectedSearch")
searchAll.classList.add("optBnt")
searchAll.style.height = "20px"

let searchStudent = document.createElement("button");
searchStudent.textContent = "Student ID"
searchStudent.classList.add("optBnt")
searchStudent.style.height = "20px"

checkButtons.appendChild(searchAll);
checkButtons.appendChild(searchStudent);
let checked = searchAll.textContent

searchAll.addEventListener("click", toggleButtons)

function toggleButtons(e) {
    e.preventDefault();
    let button

    if (e.target.nextElementSibling) {
        button = e.target.nextElementSibling
    } else {
        button = e.target.previousSibling
    }

    e.target.classList.add("selectedSearch")
    button.classList.remove("selectedSearch")
    checked = e.target.textContent

    if (checked !== "Student ID") {
        studentID.disabled = true
    } else {
        studentID.disabled = false

    }

}

searchStudent.addEventListener("click", toggleButtons)




// TODO: crete an input for searching the student
let studentID = document.createElement("input");
studentID.disabled = true
studentID.placeholder = "Student ID"

studentID.addEventListener("change", (e) => {

})

//give the data a dateof submittion and loook back
let dateInput = document.createElement("input");
dateInput.type = "date";
let currentDate = new Date();
dateInput.value = currentDate.toISOString().substring(0, 10);

let submit = document.createElement("button");
submit.textContent = "submit";

let table = document.createElement("div")
table.classList.add("studentTable")

submit.addEventListener("click", (e) => {
    e.preventDefault();

    let result2 = getDate(dateInput.value);

    if (studentID.value) {
        result2 = result2.filter((e) => {
            if (e.id == studentID.value) {
                return true
            }
            return false

        })
    }
    

    table.innerHTML = ""
    titleDiv = true
    let studentTable = createTable(result2)
    table.appendChild(studentTable)
    
    classCoriculum.appendChild(table)
    resizeTable()

})


searchForm.appendChild(checkButtons);
searchForm.appendChild(studentID);
searchForm.appendChild(dateInput);
searchForm.appendChild(submit);
classCoriculum.appendChild(searchForm);

// console.log(result);

// check for validation if the input is not correct
// add a submit listener so that it changes the table display below

//create a table do display the report