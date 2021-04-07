const sections = document.getElementsByName('tema')
const numSection = sections.length - 1

const arrowLinks = document.getElementsByName('arrowLink')
const arrowColor = '#1A3FEB'


let currentSection = 0
function changeSection(delta, goTo=0) {
    if (goTo) {
        goTo -= 1
        sections[currentSection].style.display = 'none'
        sections[goTo].style.display = 'block'
        currentSection = goTo

        changeArrowColor()
        return
    }

    if (currentSection + delta < 0 || currentSection + delta > numSection) {
        return
    }

    sections[currentSection].style.display = 'none'
    sections[currentSection + delta].style.display = 'block'
    currentSection += delta

    changeArrowColor()
}

function changeArrowColor() {
    arrowLinks.forEach(e => {
        e.style.color = arrowColor 
    })

    if (currentSection == 0) {
        arrowLinks[0].style.color = 'black'
        return
    }
    
    if (currentSection == numSection) {
        arrowLinks[1].style.color = 'black'
        return
    }
}