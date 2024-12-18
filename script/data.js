// The provided course information.

export const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
};

// The provided assignment group.
export const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50,
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150,
        },
        {
            id: 3,
            name: "Write a Class",
            due_at: "2024-11-15",
            points_possible: 200,
        },
        {
            id: 4,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500,
        },
        
    ],
};

function getAssignmentFor(curriculum, targetDate) {
    let dates = []
    let assignmentData = curriculum.assignments.filter((section) => {
        let dueDate = new Date(section.due_at)
        if (dueDate < targetDate) {
            dates.push(dueDate)
            return true
        }
    })
    return [dates, assignmentData]
}

function getAssignmentScoresFor(dates) {
    let object = {}
    for (let cell in dates) {
        object[`${dates[cell].id}`] = dates[cell].points_possible
    }
    return object
} 


// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47,
        },
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150,
        },
    },
    {

        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400,
        },
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39,
        },
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140,
        },
    },
];

function generateStudentsReports(assignments, list, dueDates) {
    let studentsArr = []
    let student = {}
    let avg = 0
    let totalPossiblePoints = 0

    for (let cell of list) {    

        let assignmentScore = assignments[cell.assignment_id]
        
        if (assignmentScore) {
            
            let submissionDate = new Date(cell.submission.submitted_at)
            let penalty = submissionDate > dueDates[cell.assignment_id - 1] ? 15 : 0
            let cellAvg = (cell.submission.score - penalty) / assignmentScore

            cellAvg = Number(cellAvg.toFixed(3));
            avg += cell.submission.score - penalty
            totalPossiblePoints += assignmentScore

            if (student["id"] === cell.learner_id) {
                student[`${cell.assignment_id}`] = cellAvg
            } else {
                student["id"] = cell.learner_id
                student[`${cell.assignment_id}`] = cellAvg
                continue
            }

            student["avg"] = Number((avg / totalPossiblePoints).toFixed(3))
            studentsArr.push(student)

            student = {}
            avg = 0
            totalPossiblePoints = 0
        }

    }

    // console.log(studentsArr);
    return studentsArr

}

function getLearnerData(course, curriculum, submissions, targetDate = new Date) {
    // here, we would process this data to achieve the desired result.
    let studentsReports

    try {
        if (course.id === curriculum.course_id) {
            let [dueDates, assignmentData] = getAssignmentFor(curriculum, targetDate)
            let assignmentScores = getAssignmentScoresFor(assignmentData)
            studentsReports = generateStudentsReports(assignmentScores, submissions, dueDates);
            
        } else {
            throw new Error("no data found")
        }
    } catch (e) {
        console.error(e)
    }

    return studentsReports
}

export const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);

const resultGiven = [
    {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0, // 150 / 150
    },
    {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833, // late: (140 - 15) / 150
    },
];
// console.log(resultGiven);