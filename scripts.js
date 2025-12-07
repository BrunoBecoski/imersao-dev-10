const form__element = document.getElementById('form')
const button__element = document.getElementById('button')
const input__element = document.getElementById('input')
const checkbox__element = document.getElementById('checkbox')
const select__element = document.getElementById('select')
const radio_1__element = document.getElementById('radio-1')
const radio_2__element = document.getElementById('radio-2')
const section__element = document.getElementById('section')

let apiData = []
let hasTriggered = false

form__element.addEventListener('submit', (event) => event.preventDefault())
input__element.addEventListener('keydown', (event) => event.key === 'Enter' && handleSearch())
button__element.addEventListener('click', handleSearch)
checkbox__element.addEventListener('change', handleSearch)
select__element.addEventListener('change', handleSearch)
radio_1__element.addEventListener('change', handleSearch)
radio_2__element.addEventListener('change', handleSearch)

async function handleSearch() {
  if (hasTriggered) return

  hasTriggered = true

  if  (apiData.length === 0) {
    try {
      const response = await fetch('data.json')
      apiData = await response.json()
    } catch (error) {
      console.error('Falha ao buscar dados: ', error)
      return
    }
  }
  
  const filteredData = filterData()

  renderCards(filteredData)
        
  hasTriggered = false
}

function filterData() {
  const searchTerm = input__element.value.toLowerCase()
  const isChecked = checkbox__element.checked

  let filteredData = apiData.filter(data =>
    data.name.toLowerCase().includes(searchTerm) || data.description.toLowerCase().includes(searchTerm)
  )

  if (isChecked) {
    const selectValue = select__element.value
    const radioValue = radio_1__element.checked && radio_1__element.value || radio_2__element.checked && radio_2__element.value

    if(selectValue === 'alphabet') {
      filteredData = orderByAlphabet(filteredData, radioValue)
    }

    if (selectValue  === 'create') {
      filteredData = orderByCreation(filteredData, radioValue)
    } 
  }

  return filteredData
}

function orderByAlphabet(filteredData, valueRadio) {
  const orderFilteredData = filteredData.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }

    if (a.name > b.name) {
      return 1
    }
    return 0
  })

  return orderFilteredData
}

function orderByCreation(filteredData, valueRadio) {
  const orderFilteredData = filteredData.sort((a, b) => {
    if (a.year < b.year) {
      return -1
    }
    
    if (a.year > b.year) {
      return 1
    }
    
    return 0
  })

  return orderFilteredData
}

function renderCards(filteredData) {
  section__element.innerHTML = ''
  section__element.scrollTop = 0

  for (let data of filteredData) {
    const article__element = document.createElement('article')

    article__element.innerHTML = `
      <h2>${data.name}</h2>
      <div>
        <i>${data.year}</i>
        <p>${data.description}</p>
        <a href="${data.link}" target="_blank">Saiba mais</a>
      </div>
    `

    section__element.appendChild(article__element)
  }
}