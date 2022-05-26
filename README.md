# Pokedex
This website replicates a pokedex from pokemon. You can search a pokemon and it's info will be displayed on both the front and back of the card. 

**Link to project:** https://ld-pokedex.netlify.app

![alt tag](https://i.imgur.com/itKqjw3.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, pokemonapi.co

Two fetch requests are made to the pokemon api (pokemonapi.co). The first fetch request grabs the json file containing generic pokemon information, while the second fetch request grabs more specific info i.e. the "dex-entry" (generic description of a pokemon). Helper functions created in Javascript then display and clear pokemon info once json is parsed. 

## Lessons Learned:

One of the most important lessons I learned was how to read and understand the documentation of an API. I learned to get comfortable getting lost in the doc and to play around with examples provided. It's extremely helpful to use postman.co before programming anything to see what different queries / search parameters give back. 

Working with api's and the objects they return is actually quite amazing and still blows my mind. What can be difficult is accessing the right information when data is heavily nested, e.g. grabbing an item in a array, that is nested within an object, which is nested within another object. It's easy to get lost. 

.replace() combinbed with regex is a very powerful tool for formatting strings. 

