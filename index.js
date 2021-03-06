//Name Pool
const namePool = []

//function to generate the number of inputs

const generateNumberOfInputs = () => {
  //Get input number
  const inputNumber = document.querySelector("#generate-number input").value

  //create input names

  //get input list form from the Document
  const inputListForm = document.querySelector("#input-list")

  // Attach inputs to the form
  for (let i = 0; i < inputNumber; i++) {
    const inputName = document.createElement("div")
    inputName.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3")
    inputName.innerHTML = `<div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-default"
    />
  </div>`
    inputListForm.appendChild(inputName)
  }

  //stop showing numbers form and start showing input for names
  inputListForm.style.display = "flex"
  document.querySelector("#generate-number").style.display = "none"

  //create and append submit button
  const submitButton = document.createElement("div")
  submitButton.classList.add("col-2")
  submitButton.innerHTML = `<button type="button" class="btn btn-primary">Submit</button>`
  inputListForm.appendChild(submitButton)
  //add event listener to submit button
  submitButton.addEventListener("click", submitNames)
}

// function to push names to the array and display them in the page

const submitNames = () => {
  //Get the input fields nodes
  const inputNamesList = document.querySelectorAll("#input-list input")

  // For every input field push the value of the fieds to the Name Pool Array
  for (let i = 0; i < inputNamesList.length; i++) {
    const inputName = inputNamesList[i]
    namePool.push(inputName.value)
  }

  //get The row inside the name-pool div
  const row = document.querySelector("#name-pool div")
  //for every name create a node to append to this row
  for (let i = 0; i < namePool.length; i++) {
    const name = namePool[i]
    const nameDiv = document.createElement("div")
    nameDiv.classList.add("col-12", "col-md-4", "col-lg-3", "py-2", "names")
    nameDiv.innerText = `${name}`
    row.appendChild(nameDiv)
  }

  // create and append the input for how many teams
  const howManyTeams = document.createElement("div")
  howManyTeams.classList.add(
    "col-12",
    "col-md-4",
    "pt-2",
    "input-group-prepend"
  )
  howManyTeams.innerHTML = `
  <input
    placeholder="How Many Teams?"
    type="number"
    class="form-control"
    aria-label="Sizing example input"
    aria-describedby="inputGroup-sizing-default"
  />`

  row.appendChild(howManyTeams)
  //create and append randomize button
  const randomizeButton = document.createElement("div")

  randomizeButton.classList.add(
    "col-12",
    "col-sm-6",
    "col-md-4",
    "col-lg-3",
    "pt-2"
  )
  randomizeButton.innerHTML = `<button type="button" class="btn btn-primary">Assign</button>`
  row.appendChild(randomizeButton)
  //add event listener to randomize button
  randomizeButton.addEventListener("click", assign)

  //Show pool list and hide form section
  const namePoolContainer = document.querySelector("#name-pool")
  namePoolContainer.style.display = "block"
  document.querySelector("#form-section").style.display = "none"
}

//function to randomize people for each group

const assign = () => {
  //Initialize an array with the length of the namePool array so we can take a random index
  const randomIndexArray = []
  for (let i = 0; i < namePool.length; i++) {
    randomIndexArray.push(i)
  }

  randomIndexArray.sort(function () {
    return 0.5 - Math.random()
  })

  //Get value of how many teams input
  const howManyTeamsValue = document.querySelector("#name-pool input").value

  //get row inside the teams div
  const teamsRow = document.querySelector("#teams .row")

  //get array names row
  const namePoolNodesArray = document.querySelectorAll("#name-pool .row .names")

  //In case the groups aren't divided evenly we will use this variable
  let personsLeft = namePool.length % howManyTeamsValue

  //divide name pool for teams

  for (let i = 0; i < howManyTeamsValue; i++) {
    const teamColumn = document.createElement("div")
    teamColumn.classList.add("col-12", "col-md-4", "col-lg-3")
    teamColumn.innerHTML = `<h3>Team ${i + 1}<h3>`
    teamsRow.appendChild(teamColumn) // for each team create and append a column to the teamsRow

    const teamSize = Math.floor(namePool.length / howManyTeamsValue) // here is the team size floored to give integer

    for (let j = 0; j < teamSize; j++) {
      teamColumn.appendChild(namePoolNodesArray[randomIndexArray[0]]) // with this we'll grab the first number of the randomIndexArray
      randomIndexArray.splice(0, 1) //and eliminate it from the array so it doesn't repeat
    }

    if (personsLeft > 0) {
      // if the number of persons left is greater than zero we append another name to the current div with the same method we used above
      teamColumn.appendChild(namePoolNodesArray[randomIndexArray[0]])
      randomIndexArray.splice(0, 1)
      personsLeft-- //then we reduce the value of the persons left by one
    }
  }
}

//window on load

window.onload = () => {
  //generate Button
  const generateButton = document.querySelector("#generate-number button")
  generateButton.addEventListener("click", generateNumberOfInputs)
}
