const ORIGEM_LAT = -21.794291681271392;
const ORIGEM_LNG = -43.36389768151346;

let distanciaKmGlobal = null;
let debounceTimer = null;

function arredondarParaMultiploDe10(valor) {
  if (valor < 10) return 10;
  return Math.ceil(valor / 10) * 10;
}

function buscarTempo() {
  const destino = document.getElementById("destino-texto").value.trim();
  const tempoDiv = document.getElementById("tempo-estimado");
  const resultadoDiv = document.getElementById("resultado-calc");

  resultadoDiv.innerHTML = "";
  distanciaKmGlobal = null;
  tempoDiv.innerHTML = "";

  clearTimeout(debounceTimer);

  if (destino.length < 4) return;

  debounceTimer = setTimeout(function () {
    tempoDiv.innerHTML = '<span class="calc-loading">⏳ Buscando...</span>';

    const origem = new google.maps.LatLng(ORIGEM_LAT, ORIGEM_LNG);
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origem],
        destinations: [destino],
        travelMode: google.maps.TravelMode.DRIVING,
        language: "pt-BR",
      },
      function (response, status) {
        if (status !== "OK") {
          tempoDiv.innerHTML = "";
          return;
        }

        const element = response.rows[0].elements[0];

        if (element.status !== "OK") {
          tempoDiv.innerHTML = "";
          return;
        }

        distanciaKmGlobal = element.distance.value / 1000;
        const duracao = element.duration.text;

        tempoDiv.innerHTML = `
          <div class="calc-tempo-box">
            <div class="calc-info-row">
              <span>⏱️ Tempo estimado</span>
              <strong>${duracao}</strong>
            </div>
            <p class="calc-tempo-obs">Tempo estimado com base na distância e condições da via.</p>
          </div>
        `;
      }
    );
  }, 1000);
}

function exibirValor() {
  const resultadoDiv = document.getElementById("resultado-calc");
  const destino = document.getElementById("destino-texto").value.trim();

  if (!destino) {
    resultadoDiv.innerHTML = '<span class="calc-erro">Digite uma cidade de destino.</span>';
    return;
  }

  if (!distanciaKmGlobal) {
    resultadoDiv.innerHTML = '<span class="calc-erro">Aguarde o tempo ser calculado primeiro.</span>';
    return;
  }

  const valorBruto = distanciaKmGlobal * 4;
  const valorTotal = arredondarParaMultiploDe10(valorBruto);
  const valorVista = arredondarParaMultiploDe10(valorTotal * 0.9);
  const valorParcela = arredondarParaMultiploDe10(valorTotal / 10);

  resultadoDiv.innerHTML = `
    <div class="calc-sucesso">
      <hr class="calc-divider">

      <div class="calc-opcao parcelado">
        <div class="calc-opcao-titulo">💳 Parcelado</div>
        <div class="calc-opcao-valor">10x de <span>R$ ${valorParcela},00</span></div>
        <div class="calc-opcao-total">Total: R$ ${valorTotal},00</div>
        <div class="calc-pedagio">+ pedágios, se houver</div>
      </div>

      <div class="calc-ou">ou</div>

      <div class="calc-opcao avista">
        <div class="calc-opcao-titulo">💰 À vista</div>
        <div class="calc-opcao-valor"><span>R$ ${valorVista},00</span></div>
        <div class="calc-opcao-economia">Economia de R$ ${valorTotal - valorVista},00 (10% de desconto)</div>
        <div class="calc-pedagio">+ pedágios, se houver</div>
      </div>
    </div>
  `;
}
