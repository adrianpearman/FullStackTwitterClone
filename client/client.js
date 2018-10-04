console.log('connected')

const form = document.querySelector('form')
const loadingElement = document.querySelector('.loading')
const API_URL = 'http://localhost:4000/barks'

loadingElement.style.display = 'none'

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

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(bark),
    headers:{
      'content-type': 'application/json'
    }
  }).then((response) => { return response.json() })
    .then((createdBark) => { 
      console.log(createdBark) 
      form.reset()
      form.style.display = ''
      loadingElement.style.display = 'none'
    })
})