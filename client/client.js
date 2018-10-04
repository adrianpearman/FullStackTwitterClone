console.log('connected')

const form = document.querySelector('form')
const loadingElement = document.querySelector('.loading')

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
  console.log(bark)

  form.style.display = 'none'
  loadingElement.style.display = ''
})