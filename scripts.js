const cardContainer__element = document.getElementById('card-container')
const input__element = document.getElementById('search-input')

let apiData = []

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

  const searchTerm = input__element.value.toLowerCase()
  const filteredData = apiData.filter(data =>
    data.name.toLowerCase().includes(searchTerm) || data.description.toLowerCase().includes(searchTerm)
  )

  renderCards(filteredData)
}

function renderCards(filteredData) {
  for (let data of filteredData) {
    const article__element = document.createElement('article')

    article__element.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.year}</p>
      <p>${data.description}</p>
      <a href="${data.link}" target="_blank">Saiba mais</a>
    `

    cardContainer__element.appendChild(article__element)
  }
}