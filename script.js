function calcular(){

let km = document.getElementById("destino").value;

if(!km){

document.getElementById("resultado").innerHTML =
"Escolha um destino.";

return;

}

let precoKm = 4;

let total = km * precoKm;

document.getElementById("resultado").innerHTML =
"Valor estimado: R$ " + total.toFixed(2);

}