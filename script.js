const history = document.querySelector('.history-value');
const output = document.querySelector('.output-value');

const operator = document.querySelectorAll('.operator')
const number = document.querySelectorAll('.number')

function printHistory(num) {
    history.innerText = num
}
function printOutput(num) {
    if (num === "") {
        output.innerText = num
    }
    else {
        output.innerText = getFormattedNumber(num)
    }
}

function getFormattedNumber(num) {
    if ( num === "-" ) {
        return ""
    } 
    let n = Number(num)
    let value = n.toLocaleString('en')
    return value
}


function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''))
}

// Event listener for operators
operator.forEach( item => {
    item.addEventListener('click', event => {
        if (item.id === 'clear') {
            printHistory("")
            printOutput("")
        }
        if (item.id === 'backspace') {
            let resultNumbers = reverseNumberFormat(output.innerText).toString()
            if (resultNumbers) // has a value
            resultNumbers = resultNumbers.substr(0, resultNumbers.length - 1)
            printOutput(resultNumbers)
        }
        else {
            let currentOutput = output.innerText
            let currentHistory = history.innerText

            if ( currentOutput != "" || currentHistory!= "" ) {
                // condition ? true : false
                
                currentOutput = reverseNumberFormat(currentOutput)
                currentHistory =  currentHistory + currentOutput

                if (item.id === '=') {
                    let result = eval(currentHistory)
                    printOutput(result)
                    printHistory('')
                } 
                else {
                    if ( currentHistory[currentHistory.length -1 ] === NaN ) {
                        currentHistory = currentHistory.substr(0, currentHistory.length - 1)
                    }
                    currentHistory = currentHistory + item.id
                    printHistory(currentHistory)
                    printOutput('')
                }
            }
        }
    })
} )

// Event listener for numbers
number.forEach( item => {
    item.addEventListener('click', event => {
        let numsClicked = reverseNumberFormat(output.innerText)
        numsClicked += item.id
        printOutput(numsClicked)
    })
} )

console.log(operator)