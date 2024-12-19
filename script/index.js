import { CourseInfo, AssignmentGroup, result, getDate } from "./data.js";

let title = document.getElementById("title")
title.style.textAlign = "center"
title.textContent = CourseInfo.name

let chapter = document.querySelector("#chapter")
chapter.textContent = AssignmentGroup.name
chapter.style.textAlign = "center"



let assignmentTableFragment = document.createDocumentFragment()
let titleDiv = true

AssignmentGroup.assignments.forEach((assignment) => {
    //create div for row
    if (titleDiv) {
        let titleRow = createTitleRow(assignment)
        titleRow.classList.add("dataCell")
        titleRow.style.borderTop = "1px solid black"

        assignmentTableFragment.appendChild(titleRow)
        titleDiv = false

    }
    
    let row = createDataRow(assignment)
    row.classList.add("dataCell")
    // console.log(screen);
    

    assignmentTableFragment.appendChild(row)
})

// console.log(assignmentTableFragment)
function createTitleRow(dataPerRow) {
    const divRow = document.createElement("div")
    for (let cell in dataPerRow) {        
        const listItem = document.createElement("p")
        listItem.textContent = cell.replace("_", " ")
        divRow.appendChild(listItem)
    }
    return divRow
}

function createDataRow(dataPerRow) {
    const divRow = document.createElement("div")
    for (let cell in dataPerRow) {        
        const listItem = document.createElement("p")
        listItem.textContent = dataPerRow[cell]
        divRow.appendChild(listItem)
    }
    return divRow
}

chapter.nextElementSibling.appendChild(assignmentTableFragment)

// get the width when the window loads
window.addEventListener("load", resizeTable)

// create a listener to the window with do that it rearenget if the screen changes
window.addEventListener("resize",  resizeTable)

function resizeTable() {    
    let rowCell = document.querySelectorAll(".dataCell > p")
    rowCell.forEach((pTag) => {        
        pTag.style.width = `${window.innerWidth / 5}px`
    })
    
}

// display input that will take the date
let classCoriculum = document.getElementById("app")
let searchForm = document.createElement("form")
searchForm.id = "table"
searchForm.classList.add("form")

let dateInput = document.createElement("input")
dateInput.type = "date"
dateInput.value = "2024-12-5"

let submit = document.createElement("button")
submit.textContent = "submit"
submit.addEventListener("click", (e) => {
    e.preventDefault()
    let result2 = getDate(dateInput.value)
    console.log(dateInput.value)
    console.log(result2);

})


// searchForm.style.backgroundColor = "red"
searchForm.appendChild(dateInput)
searchForm.appendChild(submit)

classCoriculum.appendChild(searchForm)

// console.log(result);

// check for validation if the input is not correct
// add a submit listener so that it changes the table display below

//create a table do display the report