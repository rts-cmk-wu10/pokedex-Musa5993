const URL = new URLSearchParams(window.location.search)
const OFFSET = parseInt(URL.get("offset") || 0)
const NEXT_page = document.querySelector(".nextPage")
const PREV_page = document.querySelector(".prevPage")

/*<= 0 ? 0 : OFFSET - 20*/


const DATALIST = document.querySelector("#pokemons")
const SEARCH_FIELD = document.querySelector(".pokemon__search")

SEARCH_FIELD.addEventListener("focus", getDatelist)
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


fetch(`https://pokeapi.co/api/v2/pokemon?offset=${OFFSET}`)
    .then(function (response) {
        if (response.status === 200) {
            return response.json()
        } else {
            document.body.innerText += "Ups,noget gik galt.Prøv igen"
        }
    })
    //throw new Error("fejlbedsked")
    .then(function (data) {
    console.log(data)

        const LAST_OFFSET = data.count - (data.count % 20)

        NEXT_page.href = `/?offset=${OFFSET >= LAST_OFFSET ? LAST_OFFSET : OFFSET + 20}`

        //OFFSET + 20 > data.count ? :
        PREV_page.href = `/?offset=${Math.max(OFFSET - 20, 0)}`

        const UL = document.querySelector(".pokemonList")
        data.results.forEach(function (result) {
            const LI = document.createElement("li")
            LI.classList = "List"
            LI.innerHTML = `<a href="/pokemon.html?name=${result.name}">${result.name}</a>`
            UL.append(LI)


        })
    })

    /*.catch(function(error){
        console.log(error)
        window.location.href = "/ups.html?message=" + error.message
    })*/


