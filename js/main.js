//Example fetch using pokemonapi.co
const pokemonTypeColors = {
  'normal': 'rgba(168, 167, 125)',
  'fire': 'rgba(226, 113, 68)',
  'water': 'rgba(111, 145, 233)',
  'grass': 'rgba(159, 236, 125)',
  'electric': 'rgba(242, 208, 84)',
  'ice': 'rgba(165, 214, 215)',
  'fighting': 'rgba(177, 60, 49)',
  'poison': 'rgba(148, 72, 155)',
  'ground': 'rgba(219, 192, 117)',
  'flying': 'rgba(163, 147, 234)',
  'pyschic': 'rgba(230, 100, 136)',
  'bug': 'rgba(171, 182, 66)',
  'rock': 'rgba(181, 160, 75)',
  'ghost': 'rgba(108, 90, 148)',
  'dark': 'rgba(108, 89, 74)',
  'dragon': 'rgba(103, 68, 239)',
  'steel': 'rgba(184, 184, 206)',
  'fairy': 'rgba(231, 184, 189)'
 }

document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase()
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`

  const image = document.querySelector('img.pokemon-image')
  const number =  document.querySelector('#number')
  const name = document.querySelector('#name')
  const type1 = document.querySelector('#type1')
  const type2 = document.querySelector('#type2')

  const typeContainer = document.querySelector('.type-container')
  const type1Container = document.querySelector('.type1-container')
  const type2Container = document.querySelector('.type2-container')

  // clear previous card info and hide previous containers
  clear(image, number, name, type1, type2)
  hide(type1Container)
  hide(type2Container)
  clearContainer(typeContainer)

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        fillCardInfo(image, number, name, type1, data)
        changeColor(data, pokemonTypeColors, type1Container, type2Container)
        unhide(type1Container)

        // if pokemon has two types add the second typing to card
        if (data.types.length === 2) {
          fillType2(type2, data)
          unhide(type2Container)
          modifyContainer(typeContainer)
          }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// Fills general card info
function fillCardInfo(image, number, name, type1, data) {
  image.src = data.sprites.front_default
  number.innerText = `N*${data.id}`
  name.innerText = data.name
  type1.innerText = data.types[0].type.name
}

// Fills card info with second typing
function fillType2(type2, data) {
  type2.innerText = data.types[1].type.name
}

// Clears card information
function clear(image, number, name, type1, type2) {
  image.src = ""
  number.innerText = ""
  name.innerText = ""
  type1.innerText = ""
  type2.innerText = ""
}

// unhides element container
function unhide(element) {
  element.style.display = 'flex'
}

// hides element container
function hide(element) {
  element.style.display = 'none'
}

// adjust flexbox to fit information for one typing
function modifyContainer(element) {
  element.style.justifyContent = 'space-around'
}

// adjust flexbox to fit information of two typings
function clearContainer(element) {
  element.style.justifyContent = 'center'
}


// sets the color of specified containers to match the pokemon type
function changeColor(data, pokemonTypes, container1, container2) {
  data.types.forEach((item, index) => {
    for (let key in pokemonTypes) {
      if ((item.type.name === key) && (index === 0)) {
        container1.style.backgroundColor = pokemonTypes[key]
      } else if ((item.type.name === key) && (index === 1)){
        container2.style.backgroundColor = pokemonTypes[key]
      }
    }
  })
}
