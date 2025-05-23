document.addEventListener("DOMContentLoaded", function () {
    srcipt:
    document.getElementById('toggle-menu').addEventListener('click', function () {
        const sidebar = document.querySelector('aside');
        sidebar.classList.toggle('minimized');
    });


    aplicarMascaras();

    const nomeInput = document.getElementById("pacientePrescricao");
    const errorSpan = document.getElementById("pacienteError");

    nomeInput.addEventListener("input", function () {
        const nome = nomeInput.value.trim();
        errorSpan.textContent = "";
        nomeInput.classList.remove("error-input");

        if (nome !== "") {
            const partes = nome.split(" ").filter(p => p !== "");

            if (partes.length < 2) {
                errorSpan.textContent = "Por favor, digite o nome completo do paciente.";
                nomeInput.classList.add("error-input");
            }
        }
    });

    const form = document.querySelector("form");
    const btnAdicionarMedicamento = document.getElementById("adicionarMedicamento");
    const divMedicamentos = document.querySelector(".medicamentos");


    btnAdicionarMedicamento.addEventListener("click", () => {
        const medica = document.createElement("div");
        medica.classList.add("form-group-bloco");

        medica.innerHTML = `
            <div class="form-group">
                <label>Medicação</label><br>
                <input type="text" class="medicacao-prescricao" placeholder="Medicação" required />
            </div>
            <div class="form-group">
                <label>Dosagem</label><br>
                <input type="text" class="dosagem-prescricao" placeholder="Dosagem" required />
            </div>
            <div class="form-group">
                <label>Orientação</label><br>
                <input type="text" class="orientacao-prescricao" placeholder="Orientação" required />
            </div>

            <button type="button" class="remover-bloco">Remover</button>
            
        `;

        divMedicamentos.insertBefore(medica, btnAdicionarMedicamento);

        medica.querySelector(".remover-bloco").addEventListener("click", () => {
            medica.remove();
        });
    });

    const medicoInput = document.getElementById("medicoPrescricao");
    const errorMedico = document.getElementById("medicoError");

    medicoInput.addEventListener("input", function () {
        const medico = medicoInput.value.trim();
        errorMedico.textContent = "";
        medicoInput.classList.remove("error-input");

        if (medico !== "") {
            const partes = medico.split(" ").filter(p => p !== "");

            if (partes.length < 2) {
                errorMedico.textContent = "\nPor favor, digite o nome completo do médico.";
                medicoInput.classList.add("error-input");
            }
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const medicamentos = Array.from(document.querySelectorAll(".form-group-bloco")).map(grupo => ({
            medicacao: grupo.querySelector(".medicacao-prescricao").value.trim(),
            dosagem: grupo.querySelector(".dosagem-prescricao").value.trim(),
            orientacao: grupo.querySelector(".orientacao-prescricao").value.trim()
        }));

        const novaPrescricao = {
            id: Date.now(),
            paciente: nome,
            cpf: document.getElementById("cpfPrescricao").value.trim(),
            dataNascimento: document.getElementById("dataNascimento").value,
            genero: document.getElementById("genero").value.trim(),
            telefone: document.getElementById("telefone").value.trim(),
            tratamento: document.getElementById("tratamento").value.trim(),
            medico: document.getElementById("medicoPrescricao").value.trim(),
            medicamentos: medicamentos
        };

        console.log("Prescrição salva:", novaPrescricao);

        salvarLocalStorage(novaPrescricao);

        alert("Prescrição cadastrada com sucesso!");
        form.reset();

        document.querySelectorAll(".form-group-bloco").forEach(bloco => bloco.remove());
        setTimeout(aplicarMascaras, 10);
    });


    function salvarLocalStorage(prescricao) {
        const prescricoes = JSON.parse(localStorage.getItem("prescricoes")) || [];
        prescricoes.push(prescricao);
        localStorage.setItem("prescricoes", JSON.stringify(prescricoes));
    }

    function aplicarMascaras() {
        // CPF
        const cpfInput = document.getElementById("cpfPrescricao");
        if (cpfInput && !cpfInput._imask) {
            IMask(cpfInput, { mask: "000.000.000-00" });
        }

        // Telefone
        const telInput = document.getElementById("telefone");
        if (telInput && !telInput._imask) {
            IMask(telInput, { mask: "(00) 00000-0000" });
        }
    }

});

