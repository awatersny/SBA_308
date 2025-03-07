// Provided data below

// Schema
// const CourseInfo = {
//   "id": number,
//   "name": string,
// }

// Data
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// Schema
// const AssignmentGroup = {
//   "id": number,
//   "name": string,
  // the ID of the course the assignment group belongs to
//   "course_id": number,
  // the percentage weight of the entire assignment group
//   "group_weight": number,
//   "assignments": [AssignmentInfo],
// }

// Data
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// Schema
// const AssignmentInfo = {
//   "id": number,
//   "name": string,
//   the due date for the assignment
//   "due_at": Date string,
//   the maximum points possible for the assignment
//   "points_possible": number,
// }

// Schema
// const learnerSubmission = 
// {
//     "learner_id": number,
//     "assignment_id": number,
//     "submission": {
//       "submitted_at": Date string,
//       "score": number
//     }
// }

// Data
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];
// End of provided data

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getLearnerData = function(info, group, submissions){
  
  // Helper functions
  const findAssignment = id => {
    for(assignment of group.assignments){
      if(assignment.id === id){
        return assignment
      }
    }
    return {}
  }
  //-------------------

  console.log("Assignment 1:", findAssignment(1))
  // End of helper functions

  // Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
  const learners = []
  try {
    if(submissions.length > 0) {
      learners.push(
        {
          id: submissions[0].learner_id,
          avg: 1.0
        }
      )
      if(submissions.length > 1) {
        let learnerIds = [learners[0].id]
        for(let i = 1; i < submissions.length; i++) {
          if(!learnerIds.includes(submissions[i].learner_id)){
            learners.push(
              {
                id: submissions[i].learner_id,
                avg: 1.0
              }
            )
            learnerIds.push(submissions[i].learner_id)
          }
        }
      }
    }
    else {
      throw "There are no submissions."
    }
  } catch (error) {
    console.log(error)
  }

  console.log("\nLearners\n", learners)

  // {
  // the ID of the learner for which this data has been collected“
  //     "id": number,

  // the learner’s total, weighted average, in which assignments
  // with more points_possible should be counted for more
  // e.g. a learner with 50/100 on one assignment and 190/200 on another
  // would have a weighted average score of 240/300 = 80%.
  //     "avg": number,

  // each assignment should have a key with its ID,
  // and the value associated with it should be the percentage that
  // the learner scored on the assignment (submission.score / points_possible)
  //     <assignment_id>: number,

  // if an assignment is not yet due, it should not be included in either
  // the average or the keyed dictionary of scores
  // }

  // If an assignment is not yet due, do not include it in the results or the average. Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
  //Find
    // due date: AssignmentGroup.assignments[i].due_at
    // results: LearnerSubmissions[i].submission.score
    // average:
    // submitted: LearnerSubmissions[i].submission.submitted_at
  
  console.log("\n-------------------------------")
  submissions.forEach(submission => {
    const dateSubmittedStr = submission.submission.submitted_at
    const dateDueStr = findAssignment(submission.assignment_id).due_at
    const dateSubmitted = {
      year: parseInt(dateSubmittedStr.slice(0, -6)),
      month: parseInt(dateSubmittedStr.slice(5, -3)),
      day: parseInt(dateSubmittedStr.slice(8))
    }
    const dateDue = {
      year: parseInt(dateDueStr.slice(0, -6)),
      month: parseInt(dateDueStr.slice(5, -3)),
      day: parseInt(dateDueStr.slice(8))
    }
    // console.log(dateSubmitted)
    // console.log(dateDue, "\n-------------------------------")

    console.log("-------------------------------\nDate submitted: ", dateSubmittedStr)
    console.log("Date due: ", dateDueStr)
    console.log("Before lateness check:", submission)
    // Check year
    if(dateSubmitted.year > dateDue.year){
      submission.submission.score *= 0.9
    } 
    // Check month
    else if(dateSubmitted.month > dateDue.month) {
      submission.submission.score *= 0.9
    }
    // Check day
    else if(dateSubmitted.day > dateDue.day) {
      submission.submission.score *= 0.9
    }
    console.log("After lateness check:", submission)

    // console.log("Date submitted: ", dateSubmitted)
    // console.log("Due date: ", dateDue, "\n-------------------------------")

    // if(assignment.due_at later than today) {
    // }
  })

  // console.log(submissions.filter(submission => submission.learner_id === 132))
  
  // TODO What if a value that you are expecting to be a number is instead a string? 
  // parseInt()
  
  // If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.
  try {
    if (group.course_id === CourseInfo.id) {
  
      // You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero.
      try {
        group.assignments.forEach(assignment => {
          if (assignment.points_possible > 0) {
            // console.log(assignment.points_possible)
          } else {
            throw "Invalid maximum score"
          }
  
        })
      } catch (error) {
        console.log(error)
      }
  
    } else {
      throw "This assignment group does not belong in this course. (mismatching course_id)"
    }
  } catch (error) {
    console.log(error)
  }
  // Use try/catch and other logic to handle these types of errors gracefully.


  return learners
}
// You may use as many helper functions as you see fit.

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)

// REQUIREMENTS!!!
// TODO Declare variables properly using let and const where appropriate.
// TODO Use operators to perform calculations on variables and literals.
// TODO Use strings, numbers, and Boolean values cached within variables.
// TODO Use at least two if/else statements to control program flow. Optionally, use at least one switch statement.
// TODO Use try/catch statements to manage potential errors in the code, such as incorrectly formatted or typed data being fed into your program.
// TODO Utilize at least two different types of loops.
// TODO Utilize at least one loop control keyword such as break or continue.
// TODO Create and/or manipulate arrays and objects.
// TODO Demonstrate the retrieval, manipulation, and removal of items in an array or properties in an object.
// TODO Use functions to handle repeated tasks.
// TODO Program outputs processed data as described above. Partial credit will be earned depending on the level of adherence to the described behavior.
// TODO Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
// TODO Include a README file that contains a description of your application.