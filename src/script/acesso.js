  window.addEventListener('DOMContentLoaded', () => {
    const perfil = localStorage.getItem('perfil');

    // Esconde Cadastro Interno se for usuário
    if (perfil === 'usuario') {
      const cadastroInterno = document.querySelector('.CrudInterno');
      if (cadastroInterno) {
        cadastroInterno.style.display = 'none';
      }

      // Desativa todos os formulários.
      const inputs = document.querySelectorAll('input, textarea, select, button[type="submit"]');
      inputs.forEach(input => {
        input.disabled = true;
      });

      // Opcional: adiciona aviso visual
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const aviso = document.createElement('p');
        aviso.textContent = 'Você não tem permissão para editar estes dados.';
        aviso.style.color = 'crimson';
        aviso.style.marginTop = '10px';
        form.appendChild(aviso);
      });
    }
  });
