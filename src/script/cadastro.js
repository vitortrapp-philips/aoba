document.addEventListener("DOMContentLoaded", function () {
    aplicarMascaras()
})

function aplicarMascaras() {
    // CEP
    const cepInput = document.getElementById("cep");
    if (cepInput && !cepInput._imask) {
        IMask(cepInput, { mask: "00000-000" });
    }

    // Telefone
    const telInput = document.getElementById("telefone");
    if (telInput && !telInput._imask) {
        IMask(telInput, { mask: "(00) 00000-0000" });
    }
}