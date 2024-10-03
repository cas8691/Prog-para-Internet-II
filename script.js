const selectEstados = document.getElementById("estados");
const selectMunicipios = document.getElementById("municipios");

function popularEstados(){
       fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(dados=>dados.json())
    .then(dados=>{
// console.log(JSON.stringify(dados));  // imprime o json de retorno
       dados.forEach(estado=>{
        console.log(estado);
        const option = document.createElement("option");
        option.value = estado.id;
        option.innerHTML= estado.nome;
        selectEstados.appendChild(option);
       });
       popularMunicipios(selectEstados.value); //adicionado
        
    })
}
// recebe nome do estado e busca os municípios
    function popularMunicipios(estado){
        console.log(estado);
        selectMunicipios.innerHTML = "";
        
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
        .then(dados=>dados.json())
        .then(dados=>{
            dados.forEach(municipio=>{
                console.log(municipio);
                const option = document.createElement("option");
                option.value = municipio.nome;
                option.innerHTML= municipio.nome;
                selectMunicipios.appendChild(option);

        });

})
}

//quando mudar estado selecionado chama funçao popular municipios
    selectEstados.addEventListener("change",function(){
        popularMunicipios(this.value)
});


    // chmar função
popularEstados();
