const URL = new URLSearchParams(window.location.search)


 
 fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`)
 .then(function (response) {
    if (response.status === 200) {
        return response.json()
    } else {
        document.body.innerText += "Ups,noget gik galt.Prøv igen"
    }
})
.then(function(data){
  console.log(data)
    //sprites.front_default
  const DIV =document.querySelector(".pokemon")
  DIV.innerHTML= `
<h1>${data.name}</h1>
<img claas="Moon" src="${data.sprites.other["official-artwork"].front_default}">
<p class="højde">Height</p>
<p class="ability">Abilities</p>

<p class="type">Types</p>

<ul class="list_types">
${data.types.map (elem => `<li>${elem.type.name}</li>`).join("")}
</ul>
<ul class="list_height">
<li>${data.height}</li>
</ul>

<ul class="list_Ability">${data.abilities.map
    (elem => `<li>${elem.ability.name}</li>`
).join("")}</ul>`


})