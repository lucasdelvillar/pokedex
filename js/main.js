//Example fetch using pokemonapi.co

// edit code so that it only works with first 151 pokemon
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


// On enter key to a search
 document.querySelector('.search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      getFetch()
    }
});


document.querySelector('.flip-card-front').addEventListener('click', turnOver)

// turns over card
function turnOver() {
  document.querySelector('.flip-card-inner').style.transform = 'rotateY(-180deg)'
}

document.querySelector('.flip-card-back').addEventListener('click', turnBack)

// turns back card
function turnBack() {
  document.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)'
}


document.querySelector('button').addEventListener('click', getFetch)

// fetches pokemon information
function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase()
  const url = `https://pokeapi.co/api/v2/pokemon/${choice}`

  const image = document.querySelector('img.pokemon-image')
  const image2 = document.querySelector('img.pokemon-image2')
  const number =  document.querySelector('#number')
  const name = document.querySelector('#name')
  const type1 = document.querySelector('#type1')
  const type2 = document.querySelector('#type2')

  const typeContainer = document.querySelector('.type-container')
  const type1Container = document.querySelector('.type1-container')
  const type2Container = document.querySelector('.type2-container')

  // clear previous card info and hide previous containers
  clear(image, image2, number, name, type1, type2)
  hide(type1Container)
  hide(type2Container)
  clearContainer(typeContainer)

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        // displays pokemon information
        fillCardInfo(image, image2, number, name, type1, data)
        document.querySelector('.title').innerText = 'Pokemon Entry'
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

  // second fetch request for a pokemon dex entry description.
  const url2 = `https://pokeapi.co/api/v2/pokemon-species/${choice}`
  fetch(url2)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        let dexEntry = ''
        let deArr = data.flavor_text_entries
        // grab entry if language is english
        for (let i = 0; i < deArr.length; i++) {
          if (deArr[i].language.name === 'en') {
            dexEntry = deArr[i].flavor_text
            break
          }
        }

        // formats dexEntry to look like a proper sentence.
        dexEntry = dexEntry.replace(/\f/g, ' ')
        //capitilize pokemon name
        dexEntry = dexEntry.replace(choice.toUpperCase(), choice[0].toUpperCase() + choice.slice(1).toLowerCase())
        // get rid of upper case letters
        dexEntry = dexEntry.replace('POKéMON', 'pokémon')
        document.querySelector('.dex-entry').innerHTML= dexEntry
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

//HELPER FUNCTIONS

// Fills general card info
function fillCardInfo(image1, image2, number, name, type1, data) {
  image1.src = data.sprites.front_default
  image2.src = ''//data.sprites.front_default
  number.innerText = `N*${data.id}`
  name.innerText = data.name
  type1.innerText = data.types[0].type.name
}

// Fills card info with second typing
function fillType2(type2, data) {
  type2.innerText = data.types[1].type.name
}

// Clears card information
function clear(image1, image2, number, name, type1, type2) {
  image1.src = ''
  image2.src = ''
  number.innerText = ''
  name.innerText = ''
  type1.innerText = ''
  type2.innerText = ''
}

// unhides element container that has flex
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
