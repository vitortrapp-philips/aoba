// configuracoes.js

// configuracoes.js

function aplicarTema(tema) {
  const root = document.documentElement;
  switch (tema) {
    case 'escuro':
      root.style.setProperty('--cor-1', '#500084');
      root.style.setProperty('--cor-2', '#7a00cb');
      root.style.setProperty('--cor-3', '#aa33ff');
      root.style.setProperty('--cor-4', '#b152e9');
      root.style.setProperty('--cor-5', '#d798ff');
      root.style.setProperty('--fundo', '#1d1d1d');
      root.style.setProperty('--texto', '#e5e5e5');
      root.style.setProperty('--header', '#444444');
      root.style.setProperty('--secao', '#444444');
      break;
    case 'claro':
      root.style.setProperty('--cor-1', '#500084');
      root.style.setProperty('--cor-2', '#d798ff');
      root.style.setProperty('--cor-3', '#aa33ff');
      root.style.setProperty('--cor-4', '#7a00cb');
      root.style.setProperty('--cor-5', '#b152e9');
      root.style.setProperty('--fundo', '#f4f6f8');
      root.style.setProperty('--texto', '#1e293b');
      root.style.setProperty('--header', '#ffffff');
      root.style.setProperty('--secao', '#ffffff');
  }
}

function aplicarVisibilidade(perfil) {
  const interno = document.querySelector('.CrudInterno');
  if (perfil === 'usuario') {
    interno.style.display = 'none';
  } else {
    interno.style.display = 'flex';
  }
}

function salvarConfiguracoes() {
  const tema = document.getElementById('tema').value;
  const perfil = document.getElementById('perfil').value;
  localStorage.setItem('tema', tema);
  localStorage.setItem('perfil', perfil);
  aplicarTema(tema);
  aplicarVisibilidade(perfil);
  alert('Configurações salvas com sucesso!');
}

window.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('tema') || 'padrao';
  const perfilSalvo = localStorage.getItem('perfil') || 'admin';
  document.getElementById('tema').value = temaSalvo;
  document.getElementById('perfil').value = perfilSalvo;
  aplicarTema(temaSalvo);
  aplicarVisibilidade(perfilSalvo);
});


window.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('tema') || 'padrao';
  const perfilSalvo = localStorage.getItem('perfil') || 'admin';
  document.getElementById('tema').value = temaSalvo;
  document.getElementById('perfil').value = perfilSalvo;
  aplicarTema(temaSalvo);
  aplicarVisibilidade(perfilSalvo);
});

document.getElementById('toggle-menu').addEventListener('click', function () {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('minimized');
});