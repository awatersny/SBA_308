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
      id: '2',
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: '150'
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
      score: '150'
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
    learner_id: '132',
    assignment_id: '1',
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: '2',
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];
// End of provided data

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const getLearnerData = function(info, group, submissions){
  // If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.
  // TODO Actually wrap this try...catch blocks around your code
  try {
    if (parseInt(group.course_id) !== parseInt(info.id)) {
      throw "This assignment group does not belong in this course. (mismatching course_id)"
    }
  } catch (error) {
    return error
  }
  // Error messages
  const invalidMaxScoreError = "The the possible points for one of you assignments is invalid.\nPlease ensure that every value in this category is greater than 0 or remove the assignment"
  
  // Helper functions
  // Deprecated.  Use find.
  const findAssignment = id => {
    for(assignment of group.assignments){
      if(assignment.id === id){
        return assignment
      }
    }
    return {}
  }

  const find = (objArr, targetId) => {
    // return objArr.find(obj => obj.id === targetId) <= I just remembered this was a thing.
    for(obj of objArr){
      obj.id = parseInt(obj.id)
      if(obj.id === parseInt(targetId)){
        return obj
      }
    }
    return -1
  }

  const getWeightedMax = assignments => {
    try {
      let i = 0
      let sum = 0
      while(i < assignments.length){
        let maxScore = parseInt(assignments[i].points_possible)
        if(maxScore > 0) {
          const dateDue = Date.parse(assignments[i].due_at + "T11:59:59Z")
          if(dateDue < Date.now()) {
            sum += maxScore
          }
        } 
        else {
          throw invalidMaxScoreError
        }
        i++
      }
      return sum
    } 
    catch (error) {
      return error
    }
  }
  // End of helper functions

  const learners = []

  try {
    if(submissions.length > 0) {
      learners.push(
        {
          id: parseInt(submissions[0].learner_id),
          avg: 0
        }
      )
      if(submissions.length > 1) {
        let learnerIds = [learners[0].id]
        for(let i = 1; i < submissions.length; i++) {
          // Cache boolean value in a variable
          let idExists = learnerIds.includes(submissions[i].learner_id)
          let learnerId = parseInt(submissions[i].learner_id)
          if(!idExists){
            learners.push(
              {
                id: learnerId,
                avg: 0
              }
            )
            learnerIds.push(learnerId)
          }
        }
      }
    }
    else {
      throw "There are no submissions."
    }
  } catch (error) {
    console.log(error)
    return -1
  }
  
  try {
    submissions.forEach(submission => {
      // Store function result in variable to run the function as few times as possible
      const assignment = find(group.assignments, submission.assignment_id)
      if(assignment === -1){
        throw "You have a submission without a corresponding assignment\nPlease add an assignment to correspond with this."
      }
      if(parseInt(assignment.points_possible) > 0) {
        const dateSubmittedStr = submission.submission.submitted_at
        const dateDueStr = assignment.due_at
        const dateSubmitted = Date.parse(dateSubmittedStr + "T00:00:00Z")
        const dateDue = Date.parse(dateDueStr + "T11:59:59Z")
        // Has the due date passed?
        if(dateDue < Date.now()){
          const learner = find(learners, submission.learner_id)
          const propsInLearner = Object.keys(learner).length
          // 10% penalty for lateness
          if(dateSubmitted > dateDue) {
            submission.submission.score *= 0.9
          }
          const score = parseInt(submission.submission.score)
          // // TODO Add scores to learner object
          learner[propsInLearner - 1] = score/assignment.points_possible
          learner.avg += score
        }
      } else {
        throw invalidMaxScoreError
      }
    })
    learners.forEach(learner => {
      learner.avg /= getWeightedMax(group.assignments)
    })
  } catch (error) {
    return error
  } 
  
  return learners
}
// You may use as many helper functions as you see fit.

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions))

// REQUIREMENTS!!!
// // TODO Declare variables properly using let and const where appropriate.
// // TODO Use operators to perform calculations on variables and literals.
// // TODO Use strings, numbers, and Boolean values cached within variables.
// // TODO Use at least two if/else statements to control program flow. Optionally, use at least one switch statement.
// // TODO Use try/catch statements to manage potential errors in the code, such as incorrectly formatted or typed data being fed into your program.
// // TODO Utilize at least two different types of loops.
// TODO Utilize at least one loop control keyword such as break or continue.
// // TODO Create and/or manipulate arrays and objects.
// TODO Demonstrate the retrieval, manipulation, and removal of items in an array or properties in an object.
// // TODO Use functions to handle repeated tasks.
// // TODO Program outputs processed data as described above. Partial credit will be earned depending on the level of adherence to the described behavior.
// TODO Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).
// TODO Include a README file that contains a description of your application.