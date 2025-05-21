const currentMonth = document.getElementById("current-month");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");
const datesContainer = document.querySelector(".calendar-dates");

let month = 4;
let year = 2025;

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
  ).innerHTML = `${monthNames[month]} ${year}`;

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
      const camposDinamicos = campoFormulario.querySelector("#campos-dinamicos");

      function atualizarCampos(tipo) {
        if (tipo === "consulta") {
          camposDinamicos.innerHTML = `
            <label for="nome">Paciente:</label>
            <input type="text" id="nome" name="nome" required>
            <label for="nome">Médico:</label>
            <input type="text" id="nome-medico" name="nome" required>
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

      modal.style.display = "block";
    });

    date.appendChild(dayNumber);
    date.appendChild(activities);
    datesContainer.appendChild(date);
  }
}

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "none";
});

window.addEventListener("click", (event) => {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

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

document.getElementById("toggle-menu").addEventListener("click", function () {
  const sidebar = document.querySelector("aside");
  sidebar.classList.toggle("minimized");
});

renderCalendar();
