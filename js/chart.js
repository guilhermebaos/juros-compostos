const anoInicial = 18
const anoMax = 70
const montanteInicial = 10000

const ChartInvestimentos = document.getElementById('ChartInvestimentos')
const ChartInvestimentosComp = document.getElementById('ChartInvestimentosComp')

const Investimentos = {
    CGD: 0.0355,
    USA: 0.1345,
    EU: 0.0769,
}


let anos = [anoInicial]
let CGD, USA, EU

CGD = [montanteInicial]
USA = [montanteInicial]
EU = [montanteInicial]
for (let i = anoInicial; i < anoMax; i++) {
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
                    labelString: 'Idade do Investidor',
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

                    return 'Idade do Investidor: ' + tooltipItem.label
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


    new Chart(ChartInvestimentosComp, {
        type: 'line',
        data: {
            labels: anos,
            datasets: [{
                data: CGD,
                label: 'Fundo Global CGD',
                borderColor: 'blue',
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
}