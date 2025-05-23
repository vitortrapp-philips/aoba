const frases = [
  "É em meio a dificuldade que se encontra a oportunidade",
  "O êxito é ir de frustração a frustração sem perder a animação",
  "Mesmo que algo pareça difícil, nunca desista antes de tentar",
  "Você é o único que entende as suas dificuldades, por isso motive se a prosseguir",
  "Não é uma vida ruim, é apenas um dia ruim, lembre-se disso",
  "A maior prova de que você pode fazer o impossível, é superar circunstâncias difíceis",
  "Que os dias bons se tornem rotina, e os ruins se tornem raros",
  "Já pensou que você já superou muitas dificuldades até aqui?",
  "Suas pequenas vitórias são todas as dificuldades superadas durante sua vida, tenha orgulho delas",
  "O êxito é a somatória dos pequenos esforços repetidos diariamente",
];

function carregarFraseMotivacional() {
  const index = Math.floor(Math.random() * frases.length);
  const quoteElement = document.getElementById("texto-citacao");
  if (quoteElement) {
    quoteElement.innerHTML = `
      <p>
      <img
        src="Imagens/quote.png"
        class="quote-img left-quote"
        alt="Aspas decorativas"
      />
      ${frases[index]}
      <img
        src="Imagens/double-quotes.png"
        class="quote-img right-quote"
        alt="Aspas decorativas"
      />
      </p>
    `;
  }
}

window.onload = carregarFraseMotivacional;
