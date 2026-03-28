const GOOGLE_API_KEY = "AIzaSyC6M_XhgT-xqltyObVbmanmzSiqCH_AlD0";
const ORIGEM = "Juiz de Fora, MG, Brasil";
const PRECO_KM = 4;

const cidadesFixas = [
  { nomes: ["aeroporto zona da mata", "iza", "aeroporto iza", "aeroporto itamar franco", "goiana", "goianá", "aeroporto de goiana", "aeroporto de goianá", "aeroporto goiana"], especial: { avista: 200, parcelado: 220, parcela: 22 } },
];

function arredondarParaMultiploDe10(valor) {
  if (valor < 10) return 10;
  return Math.ceil(valor / 10) * 10;
}

function buscarCidadeFixa(texto) {
  const t = texto.toLowerCase().trim();
  return cidadesFixas.find(c => c.nomes.some(n => t.includes(n) || n.includes(t)));
}

function montarResultadoHTML(valorTotal, valorVista, parcelaDisplay) {
  const economia = valorTotal - valorVista;
  return `
    <div class="calc-sucesso">
      <hr class="calc-divider">
      <div class="calc-opcao avista">
        <div class="calc-opcao-titulo">💰 À vista</div>
        <div class="calc-opcao-valor"><span>R$ ${valorVista},00</span></div>
        <div class="calc-opcao-economia">Economia de R$ ${economia},00 (10% de desconto)</div>
        <div class="calc-pedagio-destaque">⚠️ + pedágios, se houver</div>
      </div>
      <div class="calc-ou">ou</div>
      <div class="calc-opcao parcelado">
        <div class="calc-opcao-titulo">💳 Parcelado</div>
        <div class="calc-opcao-valor">10x de <span>${parcelaDisplay}</span></div>
        <div class="calc-opcao-total">Total: R$ ${valorTotal},00</div>
        <div class="calc-pedagio-destaque">⚠️ + pedágios, se houver</div>
      </div>
    </div>
  `;
}

function calcularComKm(km) {
  const valorTotal = arredondarParaMultiploDe10(km * PRECO_KM);
  const valorVista = arredondarParaMultiploDe10(valorTotal * 0.9);
  const valorParcela = valorTotal / 10;
  const parcelaDisplay = `R$ ${valorParcela.toFixed(2).replace('.', ',')}`;
  return { valorTotal, valorVista, parcelaDisplay };
}

async function buscarDistanciaAPI(destino) {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(ORIGEM)}&destinations=${encodeURIComponent(destino + ", Brasil")}&key=${GOOGLE_API_KEY}&language=pt-BR&units=metric`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;

  const resp = await fetch(proxyUrl);
  const data = await resp.json();

  if (data.rows && data.rows[0].elements[0].status === "OK") {
    const metros = data.rows[0].elements[0].distance.value;
    return Math.round(metros / 1000);
  }
  return null;
}

function htmlWhatsApp() {
  return `
    <div class="calc-nao-encontrado">
      <p>⚠️ Não foi possível calcular para este destino.</p>
      <p>Consulte o Marcelo diretamente pelo WhatsApp:</p>
      <a class="calc-wa-btn" href="https://wa.me/5532991161391?text=Ola%20Marcelo%2C%20gostaria%20de%20agendar%20uma%20corrida" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Chamar seu táxi pelo WhatsApp
      </a>
    </div>
  `;
}

async function exibirValor() {
  const destino = document.getElementById("destino-texto").value.trim();
  const resultadoDiv = document.getElementById("resultado-calc");

  if (!destino) {
    resultadoDiv.innerHTML = '<span class="calc-erro">Digite uma cidade de destino.</span>';
    return;
  }

  const cidadeFixa = buscarCidadeFixa(destino);

  if (cidadeFixa && cidadeFixa.especial) {
    const { avista, parcelado, parcela } = cidadeFixa.especial;
    const parcelaDisplay = `R$ ${parcela.toFixed(2).replace('.', ',')}`;
    resultadoDiv.innerHTML = montarResultadoHTML(parcelado, avista, parcelaDisplay);
    return;
  }

  // Consulta API
  resultadoDiv.innerHTML = '<span class="calc-erro">🔍 Calculando distância...</span>';

  try {
    const km = await buscarDistanciaAPI(destino);
    if (km && km > 0) {
      const { valorTotal, valorVista, parcelaDisplay } = calcularComKm(km);
      resultadoDiv.innerHTML = montarResultadoHTML(valorTotal, valorVista, parcelaDisplay);
    } else {
      resultadoDiv.innerHTML = htmlWhatsApp();
    }
  } catch (e) {
    resultadoDiv.innerHTML = htmlWhatsApp();
  }
}
