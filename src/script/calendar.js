const currentMonth = document.getElementById("current-month");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");
const datesContainer = document.querySelector(".calendar-dates");

let month = 4;
let year = 2025;
let filtroTipo = "todos"; // Novo: controle do filtro

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Carregamento e salvamento em localStorage
function carregarAgendamentos() {
  const data = localStorage.getItem("agendamentos");
  return data ? JSON.parse(data) : {};
}

function salvarAgendamentos() {
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
}

let agendamentos = carregarAgendamentos();

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

function renderCalendar() {
  currentMonth.textContent = `${monthNames[month]} ${year}`;
  datesContainer.innerHTML = "";

  const totalDays = getDaysInMonth(month, year);
  const startDay = getFirstDayOfMonth(month, year);

  document.getElementById(
    "titulo-calendario"
  ).textContent = `${monthNames[month]} ${year}`;

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    datesContainer.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = document.createElement("div");
    date.classList.add("calendar-day");

    const dayNumber = document.createElement("strong");
    dayNumber.textContent = day;

    const activities = document.createElement("div");
    activities.classList.add("activities");
    activities.innerHTML = "<small>Agendar</small>";

    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      date.classList.add("hoje");
    }

    const chaveData = `${day}-${month}-${year}`;
    if (agendamentos[chaveData]) {
      const agendaList = document.createElement("ul");
      agendaList.style.marginTop = "6px";
      agendaList.style.fontSize = "12px";

      agendamentos[chaveData].forEach((a) => {
        if (filtroTipo === "todos" || a.tipo === filtroTipo) {
          const li = document.createElement("li");
          if (a.tipo === "consulta") {
            li.textContent = `Consulta c/ ${a.medico}`;
          } else {
            li.textContent = `Exame: ${a.exame}`;
          }
          agendaList.appendChild(li);
        }
      });

      date.appendChild(agendaList);
    }

    date.addEventListener("click", () => {
      const modal = document.getElementById("myModal");
      const campoFormulario = document.getElementById("campoFormulario");
      const dataSelecionada = `${String(day).padStart(2, "0")}/${String(
        month + 1
      ).padStart(2, "0")}/${year}`;

      campoFormulario.innerHTML = `
        <label>Data selecionada: ${dataSelecionada}</label><br><br>
        <label for="tipo">Tipo:</label>
        <select id="tipo">
          <option value="consulta">Consulta</option>
          <option value="exame">Exame</option>
        </select><br><br>
        <div id="campos-dinamicos"></div>
      `;

      const tipoSelect = campoFormulario.querySelector("#tipo");
      const camposDinamicos =
        campoFormulario.querySelector("#campos-dinamicos");

      function atualizarCampos(tipo) {
        if (tipo === "consulta") {
          camposDinamicos.innerHTML = `
            <label for="nome">Paciente:</label>
            <input type="text" id="nome" name="nome" required>
            <label for="nome-medico">Médico:</label>
            <input type="text" id="nome-medico" name="nome-medico" required>
            <label for="horario">Horário:</label>
            <input type="time" id="horario" name="horario" required>
            <label for="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" rows="3"></textarea>
          `;
        } else {
          camposDinamicos.innerHTML = `
            <label for="nome">Paciente:</label>
            <input type="text" id="nome" name="nome" required>
            <label for="nomeExame">Nome do exame:</label>
            <input type="text" id="nomeExame" name="nomeExame" required>
          `;
        }
      }

      tipoSelect.addEventListener("change", (e) => {
        atualizarCampos(e.target.value);
      });

      atualizarCampos("consulta");

      modal.setAttribute("data-dia", day);
      modal.setAttribute("data-mes", month);
      modal.setAttribute("data-ano", year);
      modal.style.display = "block";
    });

    date.appendChild(dayNumber);
    date.appendChild(activities);
    datesContainer.appendChild(date);
  }

  // Exibir agendamentos de hoje
  const hoje = new Date();
  const chaveHoje = `${hoje.getDate()}-${
    hoje.getMonth() + 1
  }-${hoje.getFullYear()}`;
  const listaHoje = document.getElementById("lista-hoje");
  const secaoHoje = document.getElementById("agendamentos-hoje");

console.log("filtroTipo:", filtroTipo);

  console.log("chaveHoje:", chaveHoje);
  console.log("agendamentos:", agendamentos);

  if (agendamentos[chaveHoje]) {
    const visiveisHoje = agendamentos[chaveHoje].filter(
      (a) => filtroTipo === "todos" || a.tipo === filtroTipo
    );

    if (visiveisHoje.length > 0) {
      listaHoje.innerHTML = "";
      visiveisHoje.forEach((a) => {
        const li = document.createElement("li");
        if (a.tipo === "consulta") {
          li.textContent = `Consulta com ${a.medico}, paciente ${a.paciente}, às ${a.horario}`;
        } else {
          li.textContent = `Exame: ${a.exame}, paciente ${a.paciente}`;
        }
        listaHoje.appendChild(li);
      });
      secaoHoje.style.display = "block";
    } else {
      secaoHoje.style.display = "none";
    }
  } else {
    secaoHoje.style.display = "none";
  }
}

// Navegação
prevBtn.addEventListener("click", () => {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  renderCalendar();
});

// Modal
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "none";
});

window.addEventListener("click", (e) => {
  const modal = document.getElementById("myModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("myModal").style.display = "none";
  }
});

// Salvar agendamento
document.getElementById("btnCadastrar").addEventListener("click", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll("#campoFormulario input:required");
  let valido = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.border = "1px solid red";
      valido = false;
    } else {
      input.style.border = "1px solid #ccc";
    }
  });

  if (!valido) return;

  const tipo = document.getElementById("tipo").value;
  const nome = document.getElementById("nome").value;
  const modal = document.getElementById("myModal");
  const dia = modal.getAttribute("data-dia");
  const mes = modal.getAttribute("data-mes");
  const ano = modal.getAttribute("data-ano");
  const chave = `${parseInt(dia)}-${parseInt(mes)}-${ano}`;

  let novoAgendamento = { tipo, paciente: nome };

  if (tipo === "consulta") {
    novoAgendamento.medico = document.getElementById("nome-medico").value;
    novoAgendamento.horario = document.getElementById("horario").value;
    novoAgendamento.descricao = document.getElementById("descricao").value;
  } else {
    novoAgendamento.exame = document.getElementById("nomeExame").value;
  }

  if (!agendamentos[chave]) agendamentos[chave] = [];
  agendamentos[chave].push(novoAgendamento);
  salvarAgendamentos();

  renderCalendar();
  modal.style.display = "none";
});

// Filtro por tipo
document.getElementById("filtro-tipo").addEventListener("change", (e) => {
  filtroTipo = e.target.value;
  renderCalendar();
});

// Botão para apagar todos os agendamentos
document.getElementById("btn-apagar").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja apagar todos os agendamentos?")) {
    agendamentos = {};
    localStorage.removeItem("agendamentos");
    renderCalendar();
    alert("Todos os agendamentos foram apagados.");
  }
});

// Sidebar
document.getElementById("toggle-menu").addEventListener("click", () => {
  document.querySelector("aside").classList.toggle("minimized");
});

// Inicializa
renderCalendar();
