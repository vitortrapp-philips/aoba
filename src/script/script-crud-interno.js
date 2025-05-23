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

document.getElementById('toggle-menu').addEventListener('click', function () {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('minimized');
});

span.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

//abre o modal conferindo qual é o valor dele apartir do id=tipo, assim diferenciando qual formulario abrir
function abrirModal(registro = null) {
    const tipo = registro ? registro.tipo : document.getElementById("tipo").value;

    campoFormulario.innerHTML = "";
    modoEdicao = registro !== null;
    registroEmEdicao = registro;

    if (tipo === "exame") {
        campoFormulario.innerHTML = `
          <h3 id="CE">Cadastro de Exame</h3>
          <div class="form-group">
            <label for="nome">Nome do exame</label>
            <input type="text" placeholder="Nome do exame" id="nome" value="${registro?.nome || ''}" required />
          </div>
          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea id="descricao" placeholder="Descrição" rows="3">${registro?.descricao || ''}</textarea>
          </div>
        `;
    } else if (tipo === "alergia") {
        campoFormulario.innerHTML = `
          <h3 id="CA">Cadastro de Alergia</h3>
          <div class="form-group">
            <label for="nomeAlergia">Nome da Alergia</label>
            <input type="text" placeholder="Nome da Alergia" id="nomeAlergia" value="${registro?.nomeAlergia || ''}" required />
          </div>
          
          <div class="form-group">
            <label for="descricaoAlergia">Descrição</label>
            <textarea id="descricaoAlergia" placeholder="Descrição" rows="3">${registro?.descricaoAlergia || ''}</textarea>
          </div>
        `;
    } else if (tipo === "leito") {
        campoFormulario.innerHTML = `
          <h3 id="CA">Cadastro de Leito</h3>
          <div class="form-group">
            <label for="alaLeito">Ala do Leito</label>
            <input type="text" placeholder="Ala do Leito" id="alaLeito" value="${registro?.alaLeito || ''}" required />
          </div>
          <div class="form-group">
            <label for="quartoLeito">Quarto do Leito</label>
            <input type="text" placeholder="Quarto do Leito" id="quartoLeito" value="${registro?.quartoLeito || ''}" required />
          </div>
          <div class="form-group">
            <label for="numeroLeito">Identificação do Leito</label>
            <input type="text" placeholder="Identificão do Leito" id="numeroLeito" value="${registro?.numeroLeito || ''}" required />
          </div>
          <div class="form-group">
            <label for="observacaoLeito">Observação</label>
            <textarea id="observacaoLeito" placeholder="Detalhes do leito" rows="3">${registro?.observacaoLeito || ''}</textarea>
          </div>
        `;
    } else {
        campoFormulario.innerHTML = `
          <h3 id="CM">Cadastro de Médico</h3>
          <div class="form-group">
            <label for="nomeMedico">Nome do Médico</label>
            <input type="text" placeholder="Nome do Médico" id="nomeMedico" value="${registro?.nomeMedico || ''}" required />
          </div>
          <div class="form-group">
            <label for="CRM">CRM</label>
            <input type="text" placeholder="CRM" id="CRM" value="${registro?.CRM || ''}" required />
          </div>
          <div class="form-group">
            <label for="especialidade">Especialidade</label>
            <input type="text" placeholder="Especialidade" id="especialidade" value="${registro?.especialidade || ''}" required />
          </div>
        `;
    }

    modal.style.display = "block";
}

// Faz para o submit do botao para o form.onsubmit conseguir salvar as informações preenchidas no formulario
form.onsubmit = function (e) {
    e.preventDefault();
    const tipo = document.getElementById("tipo").value;

    let novoRegistro = { id: modoEdicao ? registroEmEdicao.id : Date.now(), tipo };

    if (tipo === "exame") {
        novoRegistro.nome = document.getElementById("nome").value;
        novoRegistro.descricao = document.getElementById("descricao").value;
    } else if (tipo === "alergia") {
        novoRegistro.nomeAlergia = document.getElementById("nomeAlergia").value;
        novoRegistro.descricaoAlergia = document.getElementById("descricaoAlergia").value;
    }else if (tipo === "leito"){
         novoRegistro.alaLeito = document.getElementById("alaLeito").value;
        novoRegistro.quartoLeito = document.getElementById("quartoLeito").value;
        novoRegistro.numeroLeito = document.getElementById("numeroLeito").value;
        novoRegistro.observacaoLeito = document.getElementById("observacaoLeito").value;
    
    } else {
        novoRegistro.nomeMedico = document.getElementById("nomeMedico").value;
        novoRegistro.CRM = document.getElementById("CRM").value;
        novoRegistro.especialidade = document.getElementById("especialidade").value;
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
            if (tipoAtual === 'exame') {
                return r.nome.toLowerCase().includes(filtroPesquisa) || r.descricao.toLowerCase().includes(filtroPesquisa);
            } else if (tipoAtual === 'alergia') {
                return r.nomeAlergia.toLowerCase().includes(filtroPesquisa) || r.descricaoAlergia.toLowerCase().includes(filtroPesquisa);
            } else if (tipoAtual === 'medico') {
                return r.nomeMedico.toLowerCase().includes(filtroPesquisa) || r.CRM.toLowerCase().includes(filtroPesquisa) || r.especialidade.toLowerCase().includes(filtroPesquisa);
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
    if (tipoAtual === 'exame') {
        html += `<th>Nome</th><th>Descrição</th>`;
    } else if (tipoAtual === 'alergia') {
        html += `<th>Nome da Alergia</th><th>Descrição</th>`;
    } else if (tipoAtual === 'medico') {
        html += `<th>Nome</th><th>CRM</th><th>Especialidade</th>`;
    }else if (tipoAtual === 'leito') {
        html += `<th>Ala</th><th>Quarto</th><th>Numero</th><th>Observação</th>`;
    }

    html += `<th>Ações</th></tr></thead><tbody>`;

    //  confere o tipo de tabela para inserir as informações na tabela selecionada 
    html += filtrados.map(r => {
    let colunas = '';

    if (tipoAtual === 'exame') {
        colunas = `<td>${r.nome}</td><td>${r.descricao}</td>`;
    } else if (tipoAtual === 'alergia') {
        colunas = `<td>${r.nomeAlergia}</td><td>${r.descricaoAlergia}</td>`;
    } else if (tipoAtual === 'medico') {
        colunas = `<td>${r.nomeMedico}</td><td>${r.CRM}</td><td>${r.especialidade}</td>`;
    } else if (tipoAtual === 'leito') {
        colunas = `<td>${r.alaLeito}</td><td>${r.quartoLeito}</td><td>${r.numeroLeito}</td><td>${r.observacaoLeito}</td>`;
    }

    return `
        <tr>
            <td>${r.id}</td>
            ${colunas}
            <td class="acoes">
                <button onclick="editarRegistro(${r.id})">
                    <img src="imagens/editar1.png" alt="simbolo_editar" style="width:18px; height:18px;">
                </button>
                <button onclick="deletarRegistro(${r.id})">
                    <img src="imagens/deletar1.png" alt="simbolo_deletar" style="width:17px; height:18px;">
                </button>
            </td>
        </tr>
    `;
}).join('');

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
        console.log("Tentando deletar id:", id);
        const index = registros.findIndex(r => r.id == id);
        if (index === -1) {
            console.error("Registro para exclusão não encontrado, id:", id);
            return;
        }
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
