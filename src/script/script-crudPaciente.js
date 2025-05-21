const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const campoFormulario = document.getElementById("campoFormulario");
const registroContainer = document.getElementById("registro");
const form = document.getElementById("formulario");
const pesquisaInput = document.getElementById("pesquisa");

const registros = JSON.parse(localStorage.getItem("registros")) || [];
let modoEdicao = false;
let registroEmEdicao = null;

//evento para abrir o modal
btn.onclick = function () {
    abrirModal();
};

span.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

//abre o modal conferindo qual é o valor dele apartir do id=tipo, assim diferenciando qual formulario abrir
function abrirModal(registro = null) {
    const tipo = registro ? registro.tipo : document.getElementById("tipo").value;
    campoFormulario.innerHTML = "";
    modoEdicao = registro !== null;
    registroEmEdicao = registro;

    if (tipo === "paciente") {
        campoFormulario.innerHTML = `
          <h3 id="CP">Cadastro do Paciente</h3>

          <div class="form-group">
            <label for="nomePaciente">Nome de Paciente</label>
            <input type="text" placeholder="Nome do Paciente" id="nomePaciente" value="${registro?.nomePaciente || ''}" required />
          </div>

          <div class="form-group">
            <label for="numeroSUS">Número do Sus</label>
            <input type="text" placeholder="Número do Sus" id="numeroSUS" value="${registro?.numeroSUS || ''}"/>
          </div>

          <div class="form-group">
            <label for="convenio">Convênio</label>
            <input type="text" placeholder="Convênio" id="convenio" value="${registro?.convenio || ''}"/>
          </div>

           <div class="form-group">
            <label for="severidade">Severidade</label>
             <select id="severidade">
                 <option value="Alta">Alta</option>
                 <option value="Média">Média</option>
                 <option value="Baixa">Baixa</option>
             </select>
          </div>
        `;

    } else if(tipo === "consulta") {
        campoFormulario.innerHTML = `
          <h3 id="CC">Cadastro de Consulta</h3>

          <div class="form-group">
            <label for="paciente">Nome do paciente</label>
            <input type="text" placeholder="Nome do paciente" id="paciente" value="${registro?.paciente || ''}" required />
          </div>

          <div class="form-group">
            <label for="medico">Nome do médico</label>
            <input type="text" placeholder="Nome do médico" id="medico" value="${registro?.medico || ''}" required />
          </div>

          <div class="form-group">
            <label for="data">Data e hora da consulta</label>
            <input type="datetime-local" placeholder="Data da consulta" id="data" value="${registro?.data || ''}" required />
          </div>

          <div class="form-group">
            <label for="medicacaoControlada">Medicação controlada</label>
            <input type="checkbox" id="medicacaoControlada" ${registro?.medicacaoControlada ? 'checked' : ''} />
          </div>

          <div class="form-group">
            <label for="tabagismo">Tabagismo</label>
            <input type="checkbox" id="tabagismo" ${registro?.tabagismo ? 'checked' : ''} />
          </div>

          <div class="form-group">
            <label for="alcoolismo">Alcoolismo</label>
            <input type="checkbox" id="alcoolismo" ${registro?.alcoolismo ? 'checked' : ''} />
          </div>

          <div class="form-group">
            <label for="atividadeFisica">Atividade Física</label>
            <input type="checkbox" id="atividadeFisica" ${registro?.atividadeFisica ? 'checked' : ''} />
          </div>

          <div class="form-group">
            <label for="observacao">Observação</label>
            <textarea id="observacao" placeholder="Observação" rows="3">${registro?.observacao || ''}</textarea>
          </div>
        `;

    }else{
                  
        campoFormulario.innerHTML = `
            <h3 id="CC">Cadastro de Visitante</h3>

          <div class="form-group">
            <label for="visitante">Nome do Visitante</label>
            <input type="text" placeholder="Nome do Visitante" id="visitante" value="${registro?.visitante || ''}" required />
          </div>

          <div class="form-group">
            <label for="cpf">CPF</label>
            <input type="text" placeholder="CPF" id="cpf" value="${registro?.cpf || ''}" required />
          </div>

          <div class="form-group">
                <label for="data_hora">Data e hora:</label>
                <input type="datetime-local" id="data_hora" value="${registro?.data_hora || ''}" required />
          </div>
          </div>

          <div class="form-group">
            <label for="pacienteVisitante">Nome do Paciente</label>
            <input type="text" id="pacienteVisitante" value="${registro?.pacienteVisitante || ''}" required />
          </div>
        `;}
    modal.style.display = "block";
}

// Faz para o submit do botao para o form.onsubmit conseguir salvar as informações preenchidas no formulario
form.onsubmit = function (e) {
    e.preventDefault();
    const tipo = document.getElementById("tipo").value;

    let novoRegistro = { id: modoEdicao ? registroEmEdicao.id : Date.now(), tipo };

    if (tipo === "paciente") {
        novoRegistro.nomePaciente = document.getElementById("nomePaciente").value;
        novoRegistro.numeroSUS = document.getElementById("numeroSUS").value;
        novoRegistro.convenio = document.getElementById("convenio").value;
        novoRegistro.severidade = document.getElementById("severidade").value;

    } else if(tipo === "consulta") {
        novoRegistro.paciente = document.getElementById("paciente").value;
        novoRegistro.medico = document.getElementById("medico").value;
        novoRegistro.data = document.getElementById("data").value;
        novoRegistro.medicacaoControlada = document.getElementById("medicacaoControlada").checked;
        novoRegistro.tabagismo = document.getElementById("tabagismo").checked;
        novoRegistro.alcoolismo = document.getElementById("alcoolismo").checked;
        novoRegistro.atividadeFisica = document.getElementById("atividadeFisica").checked;
        novoRegistro.observacao = document.getElementById("observacao").value;

    }else{
        novoRegistro.visitante = document.getElementById("visitante").value;
        novoRegistro.cpf = document.getElementById("cpf").value;
        novoRegistro.data_hora = document.getElementById("data_hora").value;
        novoRegistro.pacienteVisitante = document.getElementById("pacienteVisitante").value;
    }


    salvarRegistro(novoRegistro);
    form.reset(); // após salvar os registros ele reseta o formulario para deixar ele em branco, para realizar um proximo cadastro
    modal.style.display = "none";
};

//salva o registro no array registros e no local storage
function salvarRegistro(novoRegistro) {
    if (modoEdicao) {
        const index = registros.findIndex(r => r.id === novoRegistro.id);
        registros[index] = novoRegistro;
    } else {
        registros.push(novoRegistro);
    }
    salvarLocalStorage();
    atualizarTabela();
}

//atualiza a tabela no html 
function atualizarTabela() {
    const tipoAtual = document.getElementById("tipo").value;
    const filtroPesquisa = pesquisaInput.value.toLowerCase();

    let filtrados = registros.filter(r => r.tipo === tipoAtual);

    //usado para realizar a filtragem das informações para caso quiserem pesquisar por uma informação especifica que 
    // verifica qual tipo esta selecionado para saber por quais informações é possivel realizar o filtro de informações
    if (filtroPesquisa) {
        filtrados = filtrados.filter(r => {
            if (tipoAtual === 'paciente') {
                return r.nomePaciente.toLowerCase().includes(filtroPesquisa) || r.numeroSUS.toLowerCase().includes(filtroPesquisa) || r.convenio.toLowerCase().includes(filtroPesquisa) || r.severidade.toLowerCase().includes(filtroPesquisa);
            } else if (tipoAtual === 'consulta'){
                return r.paciente.toLowerCase().includes(filtroPesquisa) || r.medico.toLowerCase().includes(filtroPesquisa) || r.data.toLowerCase().includes(filtroPesquisa);
            }else{
                return r.visitante.toLowerCase().includes(filtroPesquisa) || r.cpf.toLowerCase().includes(filtroPesquisa) || r.data_hora.toLowerCase().includes(filtroPesquisa) || r.pacienteVisitante.toLowerCase().includes(filtroPesquisa);
            }
            return false;
        });
    }

    // adiciona oa html a tabela 
    let html = `
    <table>
        <thead>
            <tr>
                <th>ID</th>`;

    //confere o tipo da tabela e adicona o nome de cada coluna
    if (tipoAtual === 'paciente') {
        html += `<th>Nome</th><th>Número SUS</th><th>Convenio</th><th>Severidade</th>`;
    } else if (tipoAtual === 'consulta'){
        html += `<th>Paciente</th><th>Médico</th><th>Data</th><th>Medicação controlada</th><th>Tabagismo</th><th>Alcoolismo</th><th>Atividade Física</th><th>Observação</th>`;
    }else if (tipoAtual === 'visitante'){
        html += `<th>Visitante</th><th>CPF</th><th>Data e Hora</th><th>Paciente</th>`;
    }

    html += `<th>Ações</th></tr></thead><tbody>`;

    //  confere o tipo de tabela para inserir as informações na tabela selecionada 
    html += filtrados.map(r => `
        <tr>
            <td>${r.id}</td>
           ${tipoAtual === 'paciente'
            ? `<td>${r.nomePaciente}</td><td>${r.numeroSUS}</td><td>${r.convenio}</td><td>${r.severidade}</td>`
            : tipoAtual === 'consulta'
              ? `<td>${r.paciente}</td><td>${r.medico}</td><td>${r.data}</td><td>${r.medicacaoControlada ? 'Sim' : 'Não'}</td><td>${r.tabagismo ? 'Sim' : 'Não'}</td><td>${r.alcoolismo ? 'Sim' : 'Não'}</td><td>${r.atividadeFisica ? 'Sim' : 'Não'}</td><td>${r.observacao}</td>`
              : `<td>${r.visitante}</td><td>${r.cpf}</td><td>${r.data_hora}</td><td>${r.pacienteVisitante}</td>`
        }

        
            <td class="acoes">
                <button onclick="editarRegistro('${r.id}')">
                    <img src="imagens/editar1.png" alt="simbolo_editar" style="width:18px; height:18px;">
                </button>
                <button onclick="deletarRegistro('${r.id}')">
                    <img src="imagens/deletar1.png" alt="simbolo_deletar" style="width:17px; height:18px;">
                </button>
            </td>
        </tr>
    `).join('');

    html += `</tbody></table>`;
    registroContainer.innerHTML = html;
}

// função para editar o registro selecionado de acordo com o id, foi colocado o id
//  para ser comparado somente com dois == para ele reconhecer somente pelo valor
//  pois quando ele estaba para comparar por tipo estava dando erro --- preciso
//  conferir pq estava dando erro e corrigir, porem esta funcionando desta forma
function editarRegistro(id) {
    const registro = registros.find(r => r.id == id);
    if (!registro) {
        console.error("Registro não encontrado com ID:", id);
        alert("Erro: registro não encontrado.");
        return;
    }
    abrirModal(registro);
}

//deleta o registro de acordo com o id -- ocorre um erro caso tiver mais q um registro com o mesmo id,
//  por esse motivo coloquei um console para verificar se estava selecionando o id correto, porem ele 
// estava, mas nao estava consferindo o tipo selecionado --- ainda tenho que arrumar isso 
function deletarRegistro(id) {
    if (confirm("Deseja realmente excluir este registro?")) {
        const index = registros.findIndex(r => r.id == id);
        registros.splice(index, 1);
        salvarLocalStorage();
        atualizarTabela();
    }
}
// função para salvar no localStorage 

function salvarLocalStorage() {
    localStorage.setItem("registros", JSON.stringify(registros));
}

// bloco q vai filtrar por tipo e filtrar as informações, por isso o change, 
// pois ele vai modificar a tabela enquanto para se adaptar a tabela conforme o que esta sendo pesquisado
document.getElementById("tipo").addEventListener("change", () => {
    pesquisaInput.value = "";
    atualizarTabela();
});

//informa que o eveneto para realizar a pesquisa é por input que esta na função atualiza tabela
pesquisaInput.addEventListener("input", atualizarTabela);

atualizarTabela();
