window.addEventListener("load", envio);

/*
Função que abre a janela modal ao clicar na imagem para buscar as informações.
O primeiro if serve para evitar que caso não tenha o id modal-conteudo o código seja executado.
O segundo if é caso o id seja igual ao id do modal-conteudo, ele remove a classe mostrar
*/ 

function iniciaModal(modalId){
  const modal = document.getElementById(modalId);
  if(modal){
    modal.classList.add("mostrar");
    btn= document.createElement("button");
    btn.classList.add("mostrar");
    modal.addEventListener('click', function(e){
      if(e.target.id == modalId || e.target.className ==='fechar'){
        modal.classList.remove('mostrar')
      }
    })
  }
}

const imagens = document.querySelector(".imagens");
imagens.addEventListener("click", function(){
  iniciaModal("modal-conteudo");
})

//Função para enviar a solicitação para o servidor.

async function envio(){

  /* Criei a variavel elemento, para poder selecionar a seção que pega todas as imagens.
  Em seguida no elemento, inseri o evento de click, como uma função que pega o valor do accesKey da imagem em que cliquei. Valor esse definito no tag button, para auxiliar na identificação dos filmes.
  */

  let elemento = document.getElementById("imgFilmes");
  elemento.addEventListener("click", 
  async function(e){
  idElemento =(e.target.accessKey);
  
  /* A função vai tentar solicitar uma resposta junto a api, no endereço que foi definido a variavel resposta.
  Como cada filme possui um id para ser acessado, usei Template String para passar o valor do id do filme.
  Utilizei o accessKey, para "criar" um valor de id do filme.
  */

  try {
    const resposta = await fetch(`https://swapi.dev/api/films/${idElemento}`);
    
    /*Verifiquei as propriedades do filme e criei variaveis correspondentes a cada uma delas.
    Assim poderia usar Template String, para inserir o conteudo no HTML.
    */
    // pega os dados dos filmes e transforma em um objeto JSON.

    const dadosFilmes = await resposta.json();
    let titulo = dadosFilmes.title;
    let diretor = dadosFilmes.director;
    let produtor = dadosFilmes.producer;
    let episodio = dadosFilmes.episode_id;
    let lancamento = dadosFilmes.release_date;

    /* 
    Transformei a data em formato americado, para brasileiro. Primeiro utilizei o split para retirar o separador "-", em seguida inverti a ordem de exibição e logo após usei o join para inserir o separaro "/"
    */

    let data= lancamento.split('-').reverse().join('/');

    /*
    Selecionei o campo onde o resultado será exibido e usei template string para exibir cada propriedade do filme no HTML.
    */
    document.getElementById("modal-resultado").innerHTML = `
    
    <li class="escuro primeiro">Titulo: <p>${titulo}</p></li>
    <li class="claro">Episodio: <p>${episodio}</p></li>
    <li class="escuro">Data de lançamento: <p>${data}</p></li>
    <li class="claro">Diretor:<p> ${diretor}</p></li>
    <li class="escuro ultimo">Produtor: <p>${produtor}</p></li>
    <button class="fechar">x</button>
    ` ;
   
    /*
    Caso retorne algum erro será exbido no console.
    */
  } catch (error) {
    console.error(error);
  }
  
})
}





