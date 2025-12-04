const input__element = document.getElementById('input')
const checkbox__element = document.getElementById('checkbox')
const select__element = document.getElementById('select')
const section__element = document.getElementById('section')
const radio_1__element = document.getElementById('radio-1')
const radio_2__element = document.getElementById('radio-2')

let apiData = []

checkbox__element.addEventListener('change', (event) => {
  const isChecked = event.target.checked
  const optionSelected = select__element.value
  const radio_1 = radio_1__element.checked
  const radio_2 = radio_2__element.checked

  if(isChecked) {
   const filteredData = filterData()

    if(optionSelected === 'alphabet') {
      const orderFilteredData = orderByAlphabet(filteredData)

      if (radio_1 === true) {
        renderCards(orderFilteredData)
      } 

      if (radio_2 === true) {
        renderCards(orderFilteredData.reverse())
      }

    }

    if (optionSelected === 'create') {
      const orderFilteredData = orderByCreation(filteredData)

      if (radio_1 === true) {
        renderCards(orderFilteredData)
      } 

      if (radio_2 === true) {
        renderCards(orderFilteredData.reverse())
      }
    }
  }
})

select__element.addEventListener('change', (event) => {
  const optionSelected = event.target.value 
  const isChecked = checkbox__element.checked
    const radio_1 = radio_1__element.checked
  const radio_2 = radio_2__element.checked

  if(isChecked) {
   const filteredData = filterData()

    if(optionSelected === 'alphabet') {
      const orderFilteredData = orderByAlphabet(filteredData)

      if (radio_1 === true) {
        renderCards(orderFilteredData)
      } 

      if (radio_2 === true) {
        renderCards(orderFilteredData.reverse())
      }
    }

    if (optionSelected === 'create') {
      const orderFilteredData = orderByCreation(filteredData)

      if (radio_1 === true) {
        renderCards(orderFilteredData)
      } 

      if (radio_2 === true) {
        renderCards(orderFilteredData.reverse())
      }
    }
  }
})

radio_1__element.addEventListener('change', (event) => {
  const radioSelected = event.target.checked 
  const isChecked = checkbox__element.checked

  if(isChecked) {
   const filteredData = filterData()

    if(radioSelected === true) {
      const orderFilteredData = orderByAlphabet(filteredData)

      renderCards(orderFilteredData)
    }
  } 
})

radio_2__element.addEventListener('change', (event) => {
  const radioSelected = event.target.checked 
  const isChecked = checkbox__element.checked

  if(isChecked) {
   const filteredData = filterData()

    if(radioSelected === true) {
      const orderFilteredData = orderByAlphabet(filteredData)

      renderCards(orderFilteredData.reverse())
    }
  } 
})

async function handleSearch() {
  if  (apiData.length === 0) {
    try {
      const response = await fetch('data.json')
      apiData = await response.json()
    } catch (error) {
      console.error('Falha ao buscar dados: ', error)
      return
    }
  }

  checkbox__element.checked = false

  const filteredData = filterData()

  renderCards(filteredData)
}

function filterData() {
  const searchTerm = input__element.value.toLowerCase()
  const filteredData = apiData.filter(data =>
    data.name.toLowerCase().includes(searchTerm) || data.description.toLowerCase().includes(searchTerm)
  )

  return filteredData
}

function orderByAlphabet(filteredData) {
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

function orderByCreation(filteredData) {
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