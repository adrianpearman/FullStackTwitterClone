console.log('connected')

const form = document.querySelector('form')

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
})