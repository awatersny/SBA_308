//! This is not part of my assignment.  I am using this space to check my math with the codesandbox example

const calcAvgScore = (student) => {
  const propsInStudent = Object.keys(student).length
  let sum = 0
  let i = 1
  // // TODO Use a while loop to satisfy rubric
  while(i < propsInStudent - 1) {
    sum += student[i]
    i++
  }
  return sum / (propsInStudent - 2)
}

const learners = [
  {
    id: 125,
    avg: 0.985, // (47 + 150) / (50 + 150)
    1: 0.94, // 47 / 50
    2: 1.0 // 150 / 150
  },
  {
    id: 132,
    avg: 0.82, // (39 + 125) / (50 + 150)
    1: 0.78, // 39 / 50
    2: 0.833 // late: (140 - 15) / 150
  }
];

learners.forEach(learner => {
  console.log(calcAvgScore(learner))
})

console.log((47 + 150) / (50 + 150))
console.log((47 / 50) + (  ))