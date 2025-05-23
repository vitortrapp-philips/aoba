function verificarAlertas() {
  const alertas = document.querySelectorAll('.alerts li');
  alertas.forEach(alerta => {
    if (alerta.textContent.includes("UTI com 90%")) {
      alerta.style.fontWeight = 'bold';
      alerta.style.animation = 'piscar 1s infinite';
    }
  });
}

setTimeout(verificarAlertas, 500);

function filtrarAlertas() {
  const texto = document.getElementById('buscaAlerta').value.toLowerCase();
  document.querySelectorAll('.alerts li').forEach(alerta => {
    alerta.style.display = alerta.textContent.toLowerCase().includes(texto) ? 'block' : 'none';
  });
}

function atualizarRelogio() {
  const agora = new Date();
  document.getElementById('relogio').textContent = agora.toLocaleTimeString();
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio(); 

const cor1 = "#500084";
const cor2 = "#d798ff";
const cor3 = "#aa33ff";
const cor4 = "#7a00cb";
const cor5 = "#b152e9";

document.getElementById('toggle-menu').addEventListener('click', function () {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('minimized');
});

//Gráficos inicio
const severidade_labels = ['Baixa', 'Media', 'Alta'];
const severidade_data = [19, 21, 32];

const ctx1 = document.getElementById('pacientes-por-severidade').getContext('2d');
const pacientes_por_severidade_chart = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: severidade_labels,
        datasets: [{
            label: 'Pacientes por Severidade',
            data: severidade_data,
            backgroundColor: [cor3, cor2, cor1],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 18
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + ' pacientes';
                    }
                }
            }
        }
    }
});

const consulta_labels = ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07', '2023-01-08', '2023-01-09', '2023-01-10', '2023-01-11', '2023-01-12', '2023-01-13', '2023-01-14', '2023-01-15', '2023-01-16', '2023-01-17', '2023-01-18', '2023-01-19', '2023-01-20', '2023-01-21', '2023-01-22', '2023-01-23', '2023-01-24', '2023-01-25', '2023-01-26', '2023-01-27', '2023-01-28', '2023-01-29', '2023-01-30'];
const consulta_data = [12, 12, 19, 18, 18, 18, 20, 16, 12, 8, 10, 9, 15, 12, 16, 8, 9, 6, 10, 5, 13, 12, 6, 6, 14, 9, 19, 16, 10, 19];

const ctx2 = document.getElementById('consultas-por-dia').getContext('2d');
const consultas_por_dia_chart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: consulta_labels,
        datasets: [{
            label: 'Consultas por Dia',
            data: consulta_data,
            borderColor: cor1,
            fill: false,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw + ' consultas';
                    }
                }
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Data'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Número de Consultas'
                }
            }
        }
    }
});

const consultas_por_medico = {
    labels: ['Dr. Silva', 'Dr. Souza', 'Dr. Costa', 'Dr. Lima', 'Dr. Pereira'],
    datasets: [{
        label: 'Consultas',
        data: [12, 19, 3, 5, 2],
        backgroundColor: cor2,
        borderColor: cor1,
        borderWidth: 1
    }]
};

const config_consultas_por_medico = {
    type: 'bar',
    data: consultas_por_medico,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 16
                    }
                }
            },
            title: {
                display: true,
                text: 'Consultas por Médico',
                font: {
                    size: 20
                }
            }
        }
    }
};

const ctx_consultas_por_medico = document.getElementById('consultas-por-medico').getContext('2d');
new Chart(ctx_consultas_por_medico, config_consultas_por_medico);

const generoFaixaEtariaData = {
  labels: ['0-12', '13-18', '19-40', '41-60', '60+'],
  datasets: [
    {
      label: 'Masculino',
      data: [4, 6, 12, 9, 7],
      backgroundColor: cor4
    },
    {
      label: 'Feminino',
      data: [5, 7, 10, 11, 6],
      backgroundColor: cor2
    }
  ]
};

new Chart(document.getElementById('genero-faixa-etaria'), {
  type: 'bar',
  data: generoFaixaEtariaData,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Pacientes por Gênero e Faixa Etária'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const leitosDisponiveis = 12;
const leitosOcupados = 28;

const ocupacaoLeitosData = {
  labels: ['Disponíveis', 'Ocupados'],
  datasets: [{
    label: 'Leitos',
    data: [leitosDisponiveis, leitosOcupados],
    backgroundColor: [
      cor2, 
      cor3  
    ],
    borderWidth: 1
  }]
};

new Chart(document.getElementById('ocupacao-leitos'), {
  type: 'doughnut',
  data: ocupacaoLeitosData,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Ocupação Atual de Leitos'
      },
      legend: {
        position: 'bottom'
      }
    }
  }
});

const convenios = ['SUS', 'Unimed', 'Bradesco Saúde', 'Particular', 'Amil'];
const quantidade = [40, 22, 10, 8, 5];

new Chart(document.getElementById('pacientes-por-convenio'), {
  type: 'doughnut',
  data: {
    labels: convenios,
    datasets: [{
      data: quantidade,
      backgroundColor: [
        cor1,
        cor2,
        cor3,
        cor4,
        cor5
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Distribuição por Convênio'
      },
      legend: {
        position: 'bottom'
      }
    }
  }
});

const especialidades = ['Clínico Geral', 'Cardiologia', 'Pediatria', 'Ortopedia', 'Dermatologia'];
const consultas = [34, 20, 18, 12, 6];

new Chart(document.getElementById('consultas-especialidade'), {
  type: 'bar',
  data: {
    labels: especialidades,
    datasets: [{
      data: consultas,
      backgroundColor: [
        cor1,
        cor2,
        cor3,
        cor4,
        cor5
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Consultas por Especialidade Médica'
      },
      legend: {
      display: false
    }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const statusEvolucao = ['Alta', 'Em observação', 'Sem evolução', 'Internado', 'Encaminhado'];
const quantidades = [18, 12, 5, 9, 6];

new Chart(document.getElementById('status-evolucao'), {
  type: 'pie',
  data: {
    labels: statusEvolucao,
    datasets: [{
      data: quantidades,
      backgroundColor: [
        cor1,  
        cor2,  
        cor3,  
        cor4,   
        cor5   
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Status de Evolução dos Pacientes'
      },
      legend: {
        position: 'bottom'
      }
    }
  }
});