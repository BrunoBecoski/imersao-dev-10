const url = new URL(window.location)

const result__element = document.getElementById('results')
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

window.addEventListener('popstate', (event) => {

  if (event.state?.search) {
    input__element.value = event.state.search
  } else {
    input__element.value = ''
    document.title = 'Base de Conhecimento'
  }

  handleSearch()
})

const searchParam = new URLSearchParams(url.search).get('search')

if (searchParam) {
  document.title = `${searchParam} - Base de Conhecimento`
  input__element.value = searchParam
  handleSearch()
}

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

function handleTag(tag) {
  input__element.value = tag
  handleSearch()
}

function filterData() {
  const searchTerm = input__element.value.toLowerCase()
  const isChecked = checkbox__element.checked

  if (searchTerm) {
    document.title = `${searchTerm} - Base de Conhecimento`
    url.searchParams.set('search', searchTerm)
    window.history.pushState({ search: searchTerm }, '', url)
  } else {
    url.searchParams.delete('search')
    window.history.pushState({ search: '' }, '', url)
    document.title = 'Base de Conhecimento'
  }

  let filteredData = apiData.filter(data =>
    data.name.toLowerCase().includes(searchTerm) || data.tags.some(tag => tag.includes(searchTerm))
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
  return filteredData.sort((data1, data2) => {
    switch (valueRadio) {
      case 'increase':
        if (data1.name < data2.name) return -1
        if (data1.name > data2.name) return 1
        return 0

      case 'decrease':
        if (data1.name > data2.name) return -1
        if (data1.name < data2.name) return 1
        return 0

      default:
        return 0
    }
  })
}

function orderByCreation(filteredData, valueRadio) {
  return filteredData.sort((data1, data2) => {
    switch (valueRadio) {
      case 'increase':
        if (data1.year < data2.year) return -1
        if (data1.year > data2.year) return 1
        return 0
    
      case 'decrease':
        if (data1.year > data2.year) return -1
        if (data1.year < data2.year) return 1
        return 0

      default:
        return 0
    }
  })
}

function renderCards(filteredData) {
  section__element.innerHTML = ''
  section__element.scrollTop = 0

  if (filteredData.length === 0) {
    const i__element = document.createElement('i')
    result__element.innerText = `0 resultados`
    i__element.innerText = 'Nenhuma linguagem de programação encontrada'
    section__element.appendChild(i__element)
  } else {
    result__element.innerText = `${filteredData.length} resultados`

    for (let data of filteredData) {
      const article__element = document.createElement('article')
  
      article__element.innerHTML = `
        <h2>${data.name}</h2>
        <div>
          <strong>${data.year}</strong>
          <p>${data.description}</p>
          <a href="${data.link}" target="_blank">Saiba mais</a>
        </div>
        <span></span>
      `
          
      data.tags.forEach(tag => {
        const i__element = document.createElement('i')
        i__element.innerText = `# ${tag}`
        i__element.onclick = () => handleTag(tag)
  
        const span__element = article__element.querySelector('span')
  
        span__element.appendChild(i__element)
      })
  
      section__element.appendChild(article__element)
    }
  }
}