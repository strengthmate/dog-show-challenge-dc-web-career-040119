document.addEventListener('DOMContentLoaded', function() {
  fetchDogs()

  const submitButton = document.getElementById("submit")
  submitButton.addEventListener('click', function(e) {
    handleUpdateDog(e)
  })

})

function fetchDogs() {
  return fetch(`http://localhost:3000/dogs`)
    .then(resp => resp.json())
    .then(json => renderDogs(json));
  }

function handleClick() {
      let test = document.getElementById(`${this.id}`)
      console.log(test)
      document.getElementById('name-field').value = document.getElementById(`name-${this.id}`).innerText
      document.getElementById('breed-field').value = document.getElementById(`breed-${this.id}`).innerText
      document.getElementById('sex-field').value = document.getElementById(`sex-${this.id}`).innerText
      document.getElementById('dog-form').dataset.dogId = this.id
  }

function renderDogs(json){
  json.forEach(dog => {
    let dogContainer = document.getElementById('table-body')

    let newRow = document.createElement('tr')

    let dogName = document.createElement('td')
    dogName.id = `name-${dog.id}`
    let dogBreed = document.createElement('td')
    dogBreed.id = `breed-${dog.id}`
    let dogSex = document.createElement('td')
    dogSex.id = `sex-${dog.id}`
    let editButton = document.createElement('button')
    editButton.setAttribute("id", `${dog.id}`)

    editButton.addEventListener('click', handleClick)

    dogName.innerText = dog.name
    dogBreed.innerText = dog.breed
    dogSex.innerText = dog.sex
    editButton.innerText = "Edit Details"

    dogContainer.append(newRow)

    newRow.append(dogName)
    newRow.append(dogBreed)
    newRow.append(dogSex)
    newRow.append(editButton)
  })
}

function handleUpdateDog(e){

  e.preventDefault()

  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": document.getElementById('name-field').value,
      "breed": document.getElementById('breed-field').value,
      "sex": document.getElementById('sex-field').value
    })
  };
  let editDogId = document.getElementById('dog-form').dataset.dogId
  fetch(`http://localhost:3000/dogs/${editDogId}`, configObject)

  .then(function(response) {
    return response.json();
  })

  .then(function(json) {

    document.getElementById(`name-${json.id}`).innerText = json.name
    document.getElementById(`breed-${json.id}`).innerText = json.breed
    document.getElementById(`sex-${json.id}`).innerText = json.sex

  })

}
