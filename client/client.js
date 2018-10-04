console.log('connected')

const form = document.querySelector('form')
const loadingElement = document.querySelector('.loading')
const barksElement = document.querySelector('.barks')
const API_URL = 'http://localhost:4000/barks'

loadingElement.style.display = ''

listAllBarks()

form.addEventListener('submit', (e)=> {
  e.preventDefault()
  const formData = new FormData(form)
  const name = formData.get('name')
  const content = formData.get('content')

  const bark = {
    name: name,
    content: content
  }

  form.style.display = 'none'
  loadingElement.style.display = ''

  // Handles the submission to the database
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(bark),
    headers:{
      'content-type': 'application/json'
    }
  }).then((response) => { return response.json() })
    .then((createdBark) => { 
      // Clears the values inside of the form
      form.reset()
      // Delays the input form reappearing on the screen
      setTimeout(() => {
       form.style.display = ''        
      }, 30000)
      listAllBarks()
      loadingElement.style.display = 'none'
    })
})

// Retrieves all of the barks from the database
function listAllBarks () {
  barksElement.innerHTML = '' // Used to clear out the barks container
  fetch(API_URL)
    .then(res => res.json())
    .then(barks => {
      barks.reverse()
      barks.forEach(bark => {
        const div = document.createElement('div')

        const header = document.createElement('h1')
        header.textContent = bark.name

        const contentTag = document.createElement('p')
        contentTag.textContent = bark.content

        const dateTag = document.createElement('p')
        dateTag.textContent = new Date(bark.created)

        div.appendChild(header)
        div.appendChild(contentTag)
        div.appendChild(dateTag)

        loadingElement.style.display = 'none'
        barksElement.appendChild(div)
      })
    })
}