let data = []

async function handleSearch() {
  const response = await fetch('data.json')

  data = await response.json()

  console.log(data)
}