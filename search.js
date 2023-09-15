const DATALIST = document.querySelector("#pokemons")
const SEARCH_FIELD = document.querySelector(".pokemon_search")

SEARCH_FIELD.addEventListener(".focus", getDatelist)
SEARCH_FIELD.addEventListener("focusout", function (event) {
    SEARCH_FIELD.removeEventListener("focus", getDatelist)
})


function getDatelist(event) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
        .then(function (response) {
            // fejl tjek, hvis I vil
            return response.json()
        })
        .then(function (data) {
            data.results.forEach(function (pokemon) {
                DATALIST.innerHTML += `<option>${pokemon.name}</option>`
            })
        })
}



