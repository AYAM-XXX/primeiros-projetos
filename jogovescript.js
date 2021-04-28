const celulas= document.querySelectorAll(".celula");
let fimDeJogo = false;
const jogador_X= "X";
const jogador_O= "O";
const COBINACOES=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,8]



];

document.addEventListener("click", (event) =>{

    if(event.target.matches(".celula")){
      console.log(event.target.id);
      jogar(event.target.id, jogador_X);
     setTimeout(() => bot(),500);

}});

function bot() {

  const posicoesDisponiveis = [];

  for( index in celulas){
      if (!isNaN(index)) {
          if (

            !celulas[index].classList.contains("X")&&
            !celulas[index].classList.contains("O")

            ) {
             posicoesDisponiveis.push(index);
          }       
      }            
  }
  const posicaoAleatoria = Math.floor(
    Math.random() * posicoesDisponiveis.length
    );
    if (!fimDeJogo) {
       jogar(posicoesDisponiveis[posicaoAleatoria], jogador_O);
    };
 
           
};

function jogar(id, turno){
   const celula = document.getElementById(id)
   celula.textContent= turno;
   celula.classList.add(turno)
   
   checarVencedor(turno);

};

function checarVencedor(turno){
  const vencedor = COBINACOES.some((comb) => {
  return comb.every((index) =>{
    return celulas[index].classList.contains(turno);

});

});

if (vencedor) {
  encerraJogo(turno);
}else if (checarEmpate()){
  encerraJogo();
}
};

function checarEmpate(){
  let x = 0;
  let o = 0;

  for(index in celulas){
    if(!isNaN(index)){

      if(celulas[index].classList.contains(jogador_X)){
                 x++;
}

      if(celulas[index].classList.contains(jogador_O)){
                 o++;
       }
   }
}  
   return x + o === 9 ? true : false;
}    


function encerraJogo(vencedor = null){
  fimDeJogo = true;
  const telaEscura = document.getElementById("tela-escura");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  let mensagem = null

  telaEscura.style.display = "block";
  telaEscura.appendChild(h2)
  telaEscura.appendChild(h3)


  if (vencedor) {
   h2.innerHTML = `O player <span>${vencedor}</span> venceu`;
  } else {
    h2.innerHTML = "empatou"
  }
  
  setInterval(() => {
    h3.innerHTML = `reiniciando em 30 segundos`;
  },1000);

  setTimeout(() => location.reload(), 30000);

};

