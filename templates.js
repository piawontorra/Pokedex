function pokemonCardTemplate(i, currentPokemon) {
    return `<div id="pokemon__container${i}" class="pokemon__container" onclick="showPokemonOverlay(${i})">
                <div class="pokemon__title">
                    <h3>#${currentPokemon['id']} ${currentPokemon['name']}</h3>
                </div>
                <img class="preview__img" src="${currentPokemon['sprite']}">
                <div class="pokemon__type__container">
                    <h4>Type:</h4>
                    <div class="container__types">
                        <span id="pokemonTypePrimary${i}" class="pokemon__type">${currentPokemon['types']['first-type']}</span>
                        <span id="pokemonTypeSecond${i}" class="pokemon__type">${currentPokemon['types']['second-type']}</span>
                    </div>
                </div>
            </div>`
}

function pokemonOverlayTemplate(i, currentPokemon) {
    return `<div id="pokemonOverlayContainer${i}" class="overlay__bg" onclick="closePokemonOverlay(${i})">
                <div class="pokemon__overlay__content" onclick="stopAutoClose(event)">
                    <div class="close__button__container">
                        <img id="closePokemonOverlayButton" src="./img/icons8-macos-schließen-32.png" onclick="closePokemonOverlay(${i})">
                    </div>

                    <div id="pokemonSpriteContainer${i}" class="pokemon__sprite__container">
                        <img class="pokemon__overlay__img" src="${currentPokemon['sprite']}" alt="pokemon-sprite">
                    </div>

                    <div class="pokemon__name__container">
                        <h2>#${currentPokemon['id']} ${currentPokemon['name']}</h2>
                    </div>

                    
                    <div class="container__table">
                        <table>
                            



                            <tr>
                                <td class="table__param">
                                    HP
                                </td>
                                <td> 
                                    <div id="pokemonStatHP${i}">${currentPokemon['stats']['hp']}</div> 
                                </td>
                            </tr>

                            <tr>
                                <td class="table__param">
                                    ATK
                                </td>
                                <td>
                                    <div id="pokemonStatATK${i}">${currentPokemon['stats']['attack']}</div> 
                                </td>                           
                            </tr>

                            <tr>
                                <td class="table__param">
                                    DEF
                                </td>
                                <td> 
                                    <div id="pokemonStatDEF${i}">${currentPokemon['stats']['defense']}</div>
                                </td>                           
                            </tr>
                        
                            <tr>
                                <td class="table__param">
                                    S-ATK
                                </td>
                                <td>
                                    <div id="pokemonStatSATK${i}">${currentPokemon['stats']['special-attack']}</div>
                                </td>
                            </tr>

                            <tr>
                                <td class="table__param">
                                    S-DEF
                                </td>
                                <td>
                                    <div id="pokemonStatSDEF${i}">${currentPokemon['stats']['special-defense']}</div>
                                </td>                          
                            </tr>

                            <tr>
                                <td class="table__param">
                                    SPEED
                                </td>
                                <td> 
                                    <div id="pokemonStatSPEED${i}">${currentPokemon['stats']['speed']}</div>
                                </td>
                            </tr>

                            <tr>
                                <td class="table__param">
                                    Height
                                </td>
                                <td>
                                    <span class="pokemon__height">${currentPokemon['height']} m</span>
                                </td>
                            </tr>
                        
                            <tr>
                                <td class="table__param">
                                    Weight
                                </td>
                                <td>
                                    <span class="pokemon__weight">${currentPokemon['weight']} kg</span>
                                </td>
                            </tr>   
                        </table>
                    </div>
                              
                    
                    <div>
                        <img id="previous__img__button" src="./img/icons8-eingekreist-links-2-32.png" onclick="previousPokemon(${i})">
                    </div>

                    <div>
                        <img id="next__img__button" src="./img/icons8-eingekreist-rechts-2-32.png" onclick="nextPokemon(${i})">
                    </div>
                   












                </div>



            </div>`



}



