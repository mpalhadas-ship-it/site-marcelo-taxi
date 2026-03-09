const cidadesFixas = [
  { nomes: ["santos dumont"], km: 43 },
  { nomes: ["lima duarte"], km: 60 },
  { nomes: ["ubá", "uba"], km: 65 },
  { nomes: ["viçosa", "vicosa"], km: 72 },
  { nomes: ["barbacena"], km: 74 },
  { nomes: ["cataguases"], km: 80 },
  { nomes: ["muriaé", "muriae"], km: 90 },
  { nomes: ["leopoldina"], km: 110 },
  { nomes: ["barra mansa"], km: 125 },
  { nomes: ["volta redonda"], km: 129 },
  { nomes: ["além paraíba", "alem paraiba"], km: 130 },
  { nomes: ["são joão del rei", "sao joao del rei", "são joão del-rei"], km: 136 },
  { nomes: ["três rios", "tres rios"], km: 144 },
  { nomes: ["ponte nova"], km: 145 },
  { nomes: ["petrópolis", "petropolis"], km: 148 },
  { nomes: ["vassouras"], km: 152 },
  { nomes: ["valença", "valenca"], km: 152 },
  { nomes: ["conselheiro lafaiete"], km: 154 },
  { nomes: ["resende"], km: 164 },
  { nomes: ["manhuaçu", "manhuacu"], km: 174 },
  { nomes: ["rio de janeiro"], km: 182 },
  { nomes: ["lavras"], km: 183 },
  { nomes: ["niterói", "niteroi"], km: 188 },
  { nomes: ["duque de caxias"], km: 192 },
  { nomes: ["nova iguaçu", "nova iguacu"], km: 193 },
  { nomes: ["são gonçalo", "sao goncalo"], km: 195 },
  { nomes: ["teresópolis", "teresopolis"], km: 197 },
  { nomes: ["nova friburgo"], km: 213 },
  { nomes: ["ouro preto"], km: 230 },
  { nomes: ["varginha"], km: 236 },
  { nomes: ["mariana"], km: 246 },
  { nomes: ["cruzeiro"], km: 247 },
  { nomes: ["lorena"], km: 248 },
  { nomes: ["caratinga"], km: 250 },
  { nomes: ["três corações", "tres coracoes"], km: 250 },
  { nomes: ["aparecida"], km: 258 },
  { nomes: ["itajubá", "itajuba"], km: 265 },
  { nomes: ["guaratinguetá", "guaratingueta"], km: 265 },
  { nomes: ["belo horizonte", "bh"], km: 272 },
  { nomes: ["contagem"], km: 278 },
  { nomes: ["angra dos reis"], km: 281 },
  { nomes: ["betim"], km: 285 },
  { nomes: ["alfenas"], km: 285 },
  { nomes: ["pindamonhangaba"], km: 290 },
  { nomes: ["ipatinga"], km: 298 },
  { nomes: ["taubaté", "taubate"], km: 305 },
  { nomes: ["mimoso do sul"], km: 305 },
  { nomes: ["macaé", "macae"], km: 312 },
  { nomes: ["alegre"], km: 315 },
  { nomes: ["caçapava", "cacapava"], km: 324 },
  { nomes: ["campos dos goytacazes", "campos"], km: 325 },
  { nomes: ["governador valadares"], km: 330 },
  { nomes: ["formiga"], km: 330 },
  { nomes: ["sete lagoas"], km: 332 },
  { nomes: ["cachoeiro de itapemirim", "cachoeiro"], km: 333 },
  { nomes: ["divinópolis", "divinopolis"], km: 334 },
  { nomes: ["são josé dos campos", "sao jose dos campos"], km: 340 },
  { nomes: ["poços de caldas", "pocos de caldas"], km: 357 },
  { nomes: ["jacareí", "jacarei"], km: 358 },
  { nomes: ["ubatuba"], km: 370 },
  { nomes: ["passos"], km: 380 },
  { nomes: ["caraguatatuba"], km: 388 },
  { nomes: ["são sebastião", "sao sebastiao"], km: 400 },
  { nomes: ["serra"], km: 428 },
  { nomes: ["vitória", "vitoria"], km: 430 },
  { nomes: ["vila velha"], km: 435 },
  { nomes: ["uberaba"], km: 450 },
  { nomes: ["colatina"], km: 460 },
  { nomes: ["campinas"], km: 475 },
  { nomes: ["linhares"], km: 480 },
  { nomes: ["são paulo", "sao paulo", "sp"], km: 485 },
  { nomes: ["uberlândia", "uberlandia"], km: 486 },
  { nomes: ["patos de minas"], km: 490 },
  { nomes: ["guarulhos"], km: 490 },
  { nomes: ["montes claros"], km: 495 },
  { nomes: ["vitória da conquista", "vitoria da conquista"], km: 498 },
  { nomes: ["aeroporto zona da mata", "iza", "aeroporto iza", "aeroporto itamar franco"], km: 50 },
  { nomes: ["aeroporto goiana", "goiana", "goianá"], km: 50 },
  { nomes: ["bicas"], km: 50 },
  { nomes: ["rio novo"], km: 60 },
  { nomes: ["são joão nepomuceno", "sao joao nepomuceno"], km: 70 },
  { nomes: ["bom jardim", "bom jardim de minas"], km: 120 },
  { nomes: ["aeroporto santos dumont"], km: 200 },
  { nomes: ["galeão", "galeao", "aeroporto galeão", "aeroporto do galeão"], km: 180 },
];

function arredondarParaMultiploDe10(valor) {
  if (valor < 10) return 10;
  return Math.ceil(valor / 10) * 10;
}

function buscarCidadeFixa(texto) {
  const t = texto.toLowerCase().trim();
  return cidadesFixas.find(c => c.nomes.some(n => t.includes(n) || n.includes(t)));
}

function exibirValor() {
  const destino = document.getElementById("destino-texto").value.trim();
  const resultadoDiv = document.getElementById("resultado-calc");

  if (!destino) {
    resultadoDiv.innerHTML = '<span class="calc-erro">Digite uma cidade de destino.</span>';
    return;
  }

  const cidadeFixa = buscarCidadeFixa(destino);

  if (cidadeFixa) {
    const valorTotal = arredondarParaMultiploDe10(cidadeFixa.km * 4);
    const valorVista = arredondarParaMultiploDe10(valorTotal * 0.9);
    const valorParcela = valorTotal / 10;

    resultadoDiv.innerHTML = `
      <div class="calc-sucesso">
        <hr class="calc-divider">
        <div class="calc-opcao avista">
          <div class="calc-opcao-titulo">💰 À vista</div>
          <div class="calc-opcao-valor"><span>R$ ${valorVista},00</span></div>
          <div class="calc-opcao-economia">Economia de R$ ${valorTotal - valorVista},00 (10% de desconto)</div>
          <div class="calc-pedagio-destaque">⚠️ + pedágios, se houver</div>
        </div>
        <div class="calc-ou">ou</div>
        <div class="calc-opcao parcelado">
          <div class="calc-opcao-titulo">💳 Parcelado</div>
          <div class="calc-opcao-valor">10x de <span>R$ ${valorParcela.toFixed(2).replace('.', ',')}</span></div>
          <div class="calc-opcao-total">Total: R$ ${valorTotal},00</div>
          <div class="calc-pedagio-destaque">⚠️ + pedágios, se houver</div>
        </div>
      </div>
    `;
  } else {
    resultadoDiv.innerHTML = `
      <div class="calc-nao-encontrado">
        <p>⚠️ Sistema lento para este destino.</p>
        <p>Consulte o Marcelo diretamente pelo WhatsApp:</p>
        <a class="calc-wa-btn" href="https://wa.me/5532991161391?text=Ola%20Marcelo%2C%20gostaria%20de%20agendar%20uma%20corrida" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chamar seu táxi pelo WhatsApp
        </a>
      </div>
    `;
  }
}
