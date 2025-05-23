const adicionar_leito_btn = document.getElementById('btn-adicionar')
const fechar_modal_cadastro_btn = document.getElementById('fechar-modal');
const modal_cadastro = document.getElementById('modal-cadastro-leito');

adicionar_leito_btn.addEventListener('click', () =>{
    
    modal_cadastro.classList.remove('modal-overlay-hidden')
    modal_cadastro.classList.add('modal-overlay')
});


function fechar_modal_cadastro(){
    modal_cadastro.classList.remove('modal-overlay')
    modal_cadastro.classList.add('modal-overlay-hidden')
}

document.getElementById('toggle-menu').addEventListener('click', function () {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('minimized');
});