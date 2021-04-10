const montanteInicial = 10000
const IRS = 1 - 0.28
let anos, capital, lucro

// POUPANÇA CTT
const ChartPoupancaCtt = document.getElementById('ChartPoupancaCtt')

let trimestes = [0]
capital = [montanteInicial]
lucro = [0]

let taxaBase = 0.457 / 100
let premio = 0, juroTotal = 0
for (let t = 1; t <= 40; t++) {
    trimestes.push(t)

    if (t > 4) premio = 0.5 / 100
    if (t > 20) premio = 1 / 100

    juroTotal = (taxaBase + premio) / 4

    ultimoCapital = capital[capital.length - 1]
    ultimoLucro = ultimoCapital * juroTotal * IRS

    capital.push(ultimoCapital + ultimoLucro)
    lucro.push(ultimoLucro)
}

new Chart(ChartPoupancaCtt, {
    type: 'line',
    data: {
        labels: trimestes,
        datasets: [{
            data: capital,
            label: 'Capital Total',
            borderColor: 'blue',
            fill: false
        },{
            data: lucro,
            label: 'Lucro em Cada Trimestre',
            borderColor: 'red',
            fill: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Trimestres de Poupança',
                    fontColor: 'black',
                    fontSize: 13,
                    fontFamily: '"Arial", "sans-serif"'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Capital Total (€)',
                    fontColor: 'black',
                    fontSize: 13,
                    fontFamily: '"Arial", "sans-serif"'
                },
                ticks: {
                    min: 0
                }
            }]
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItems, data) {
                    let tooltipItem = tooltipItems[0]

                    return 'Trimestres de Poupança: ' + tooltipItem.label
                },
                label: function(tooltipItem, data) {
                    let value = Number(tooltipItem.value).toFixed(2)

                    return data.datasets[tooltipItem.datasetIndex].label + ': ' + value + '€'
                }
            },
            custom: function(tooltip) {
                if (!tooltip) return
                tooltip.displayColors = false
            },
        }
    },
})


// INVESTIMENTOS
const anoInicial = 0
const anoMax = 70

const ChartInvestimentos = document.getElementById('ChartInvestimentos')
const ChartInvestimentosComp = document.getElementById('ChartInvestimentosComp')

const Investimentos = {
    CGD: 0.0355,
    USA: 0.1345,
    EU: 0.0769,
}

let CGD, USA, EU

CGD = [montanteInicial]
USA = [montanteInicial]
EU = [montanteInicial]

anos = [anoInicial]
for (let i = anoInicial + 1; i < anoMax; i++) {
    anos.push(i)

    CGD.push(CGD[CGD.length - 1] * (1 + Investimentos.CGD))
    USA.push(USA[USA.length - 1] * (1 + Investimentos.USA))
    EU.push(EU[EU.length - 1] * (1 + Investimentos.EU))
}


new Chart(ChartInvestimentos, {
    type: 'line',
    data: {
        labels: anos,
        datasets: [{
            data: CGD,
            label: 'Fundo Global CGD',
            borderColor: 'blue',
            fill: false
        },{
            data: USA,
            label: 'S&P 500',
            borderColor: 'black',
            fill: false
        },{
            data: EU,
            label: 'STOXX 600',
            borderColor: 'green',
            fill: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Anos de Investimento',
                    fontColor: 'black',
                    fontSize: 13,
                    fontFamily: '"Arial", "sans-serif"'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Capital Total (€)',
                    fontColor: 'black',
                    fontSize: 13,
                    fontFamily: '"Arial", "sans-serif"'
                },
                ticks: {
                    min: 0
                }
            }]
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItems, data) {
                    let tooltipItem = tooltipItems[0]

                    return 'Anos de Investimento: ' + tooltipItem.label
                },
                label: function(tooltipItem, data) {
                    let value = Number(tooltipItem.value).toFixed(2)

                    return 'Capital: ' + value + '€'
                }
            },
            custom: function(tooltip) {
                if (!tooltip) return
                tooltip.displayColors = false
            },
        }
    },
})

const capitalInicial = document.getElementById('capitalInicial')
const reforcoAnual = document.getElementById('reforcoAnual')
const retornoAnual = document.getElementById('retornoAnual')

capital = []
let graficoInv = new Chart(ChartInvestimentosComp, {
    type: 'line',
    data: {
        labels: anos,
        datasets: [{
            data: capital,
            label: 'Capital',
            borderColor: 'red',
            fill: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Anos',
                    fontColor: 'black',
                    fontSize: 13,
                    fontFamily: '"Arial", "sans-serif"'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Capital Total (€)',
                    fontColor: 'black',
                    fontSize: 13,
                    fontFamily: '"Arial", "sans-serif"'
                },
                ticks: {
                    min: 0
                }
            }]
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItems, data) {
                    let tooltipItem = tooltipItems[0]

                    return 'Ano: ' + tooltipItem.label
                },
                label: function(tooltipItem, data) {
                    let value = Number(tooltipItem.value).toFixed(2)

                    return 'Capital: ' + value + '€'
                }
            },
            custom: function(tooltip) {
                if (!tooltip) return
                tooltip.displayColors = false
            },
        }
    },
})
function InvestimentosComp() {
    let cI = capitalInicial.value / 1
    let rM = reforcoAnual.value / 1
    let r = retornoAnual.value / 100
    
    anos = [anoInicial]
    let capital = [cI]
    for (i = anoInicial + 1; i < anoMax; i++) {
        anos.push(i)
    
        capital.push(capital[capital.length - 1] * (1 + r) + rM)
    }

    graficoInv.data.labels = anos
    graficoInv.data.datasets[0].data = capital
    graficoInv.update()
}