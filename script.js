let allPokemon = [];
let pokemonDetailJSONs = [];
let start = 1;
let currentNumberOfPokemon = 21;


async function init() {
    await loadPokemon();
    removeLoader();
}


async function loadPokemon() {
    for (i = start; i < currentNumberOfPokemon; i++) { //api link starts with 1
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let loadedPokemonAsJSON = await response.json();
        allPokemon.push(loadedPokemonAsJSON);
    }
    collectPokemonDetails();
    renderPokemon();
}


function collectPokemonDetails() {
    for (i = start - 1; i < allPokemon.length; i++) { //array starts with 0, api link with 1
        let currentPokemon = allPokemon[i];
        let id = currentPokemon['id'];
        let name = currentPokemon['name'];
        let sprite = currentPokemon['sprites']['other']['dream_world']['front_default'];
        let types = [];
        let stats = [];
        let height = currentPokemon['height'] / 10; //divide height by ten to get correct decimal place
        let weight = currentPokemon['weight'] / 10; //divide weight by ten to get correct decimal place
        getPokemonTypes(currentPokemon, types); //get and push pokemon types into array 'types'
        getPokemonStats(currentPokemon, stats); //get and push pokemon basetats into array 'stats'
        createPokemonDetailJSON(id, name, sprite, types, stats, height, weight);
        //  console.log(id, sprite, name, types, stats, height, weight);
    }
}


function getPokemonTypes(currentPokemon, types) { //helpfunction for collectPokemonDetails()
    for (j = 0; j < currentPokemon['types'].length; j++) {// some pokemon have more than one type
        let type = currentPokemon['types'][j]['type']['name'];
        types.push(type);
    }
}


function getPokemonStats(currentPokemon, stats) { //helpfunction for collectPokemonDetails()
    for (j = 0; j < currentPokemon['stats'].length; j++) {// get pokemon 'hp', 'atk', 'def', 's-atk', 's-def', 'speed'
        let baseStat = currentPokemon['stats'][j]['base_stat'];
        stats.push(baseStat);
    }
}


//create own JSON-array using the data we got from collectPokemonDetails()
function createPokemonDetailJSON(id, name, sprite, types, stats, height, weight) {
    let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    pokemonDetailJSONs.push({
        'id': id,
        'name': nameCapitalized,
        'sprite': sprite,
        'types': {
            'first-type': types[0],
            'second-type': types[1],
        },
        'stats': {
            'hp': stats[0],
            'attack': stats[1],
            'defense': stats[2],
            'special-attack': stats[3],
            'special-defense': stats[4],
            'speed': stats[5],
        },
        'height': height,
        'weight': weight,
    })
}

async function renderPokemon() {
    let contentRef = document.getElementById('pokemonCardContainer');
    for (let i = start - 1; i < pokemonDetailJSONs.length; i++) {
        let currentPokemon = pokemonDetailJSONs[i];
        contentRef.innerHTML += pokemonCardTemplate(i, currentPokemon);
        addColorToPreviewCard(i);
    }
}


/*function renderPokemonTemplate() {
    let contentRef = document.getElementById('content');
    for (let i = 0; i < allPokemon.length; i++) {
        contentRef.innerHTML += pokemonImageTemplate(i);
    }
}*/

function showPokemonOverlay(i) {
    document.body.style.overflow = 'hidden';
    let currentPokemon = pokemonDetailJSONs[i];
    let contentRef = document.getElementById('pokemonDetailContainer');
    contentRef.innerHTML = '';
    contentRef.innerHTML = pokemonOverlayTemplate(i, currentPokemon);

    checkIfSecondTypeExist(i, currentPokemon);
    addColorToDetailCard(i);
    if (i == 0) {
        hidePreviousPokemonButton();
    }
    if (i == pokemonDetailJSONs.length - 1) {
        hideNextPokemonButton();
    }
}

function closePokemonOverlay(i) {
    document.getElementById('pokemonOverlayContainer' + i).classList.add('d-none');
    document.body.style.overflow = 'scroll';
}


function stopAutoClose(event) {
    event.stopPropagation();
}

function previousPokemon(i) {
    i--;
    showPokemonOverlay(i);
}

function nextPokemon(i) {
    i++;
    showPokemonOverlay(i);
}

function hidePreviousPokemonButton() {
    document.getElementById("previous__img__button").classList.add("hidden");
}

function hideNextPokemonButton() {
    document.getElementById("next__img__button").classList.add("hidden");
}

function checkIfSecondTypeExist(i, currentPokemon) {
    if (!currentPokemon['types']['second-type']) {
        document.getElementById('pokemonTypeSecond' + i).classList.add('d-none');
    }
}

function addColorToDetailCard(i) {//first type colour is used as cardcolour
    let firstTypeColor = pokemonDetailJSONs[i]['types']['first-type']; //name of the type is identical to the name of the CSS class
    document.getElementById('pokemonSpriteContainer' + i).classList.add(firstTypeColor); //Card background
}

function addColorToPreviewCard(i) {//first type colour is used as cardcolour
    let firstTypeColor = pokemonDetailJSONs[i]['types']['first-type']; //name of the type is identical to the name of the CSS class
    document.getElementById('pokemon__container' + i).classList.add(firstTypeColor + `Preview`); //Card background
}

function removeLoader() {
    document.getElementById('loaderStart').classList.add('d-none');
}

function loadMorePokemon() {
    /*showLoadingScreen();*/
    if (allPokemonLoaded()) {
        if (currentNumberOfPokemon == 141 && start == 121) {
            start = 142;
            currentNumberOfPokemon = 152;
            loadPokemon();
        }
        else {
            start += 20;
            currentNumberOfPokemon += 20;
            loadPokemon();
        }
    }
}

function allPokemonLoaded() {
    return currentNumberOfPokemon <= 152;
}

// function showLoadingScreen() {
//     document.getElementById('loadingScreenContainer').classList.remove('d-none');

// }


