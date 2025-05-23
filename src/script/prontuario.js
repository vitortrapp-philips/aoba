    document.addEventListener("DOMContentLoaded", function () {
    const dados = localStorage.getItem("prescricao");

    document.getElementById('toggle-menu').addEventListener('click', function () {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('minimized');
  });

    if (dados) {
      const prescricao = JSON.parse(dados);

      document.getElementById("medicoPrescricao").textContent = prescricao.medico || "-";
      document.getElementById("medicamentoPrescricao").textContent = prescricao.medicamento || "-";
      document.getElementById("dosagemPrescricao").textContent = prescricao.dosagem || "-";
      document.getElementById("orientacaoPrescricao").textContent = prescricao.orientacao || "-";
    } else {
      document.getElementById("dadosPrescricao").innerHTML = "<p>Nenhuma prescrição encontrada.</p>";
    }
  });
