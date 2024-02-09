// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', (e) => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        if (e.target.tagName === "IMG" && !(e.target.parentElement.classList.contains("targeted"))) {
          document.querySelector(".targeted").classList.remove("targeted")
          e.target.parentElement.classList.add("targeted")
        } else if (e.target.tagName !== "IMG" && !e.target.classList.contains("targeted")) {
          document.querySelector(".targeted").classList.remove("targeted")
          e.target.classList.add("targeted")
        }
      })
     
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  
  let targetRow = 0
  let targetSquare = 0
  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    let rows = document.querySelectorAll(".row")
    rows.forEach((row, rowIndex) => {
      let rowSquares = row.querySelectorAll("div.square")
      rowSquares.forEach((square, squareIdx) => {
        if (square.classList.contains("targeted")) {
          targetRow = rowIndex
          targetSquare = squareIdx
        }
      })
    })
    if (evt.key === keys.up && targetRow !== 0) {
      rows[targetRow].children[targetSquare].classList.remove("targeted")
      rows[targetRow].previousElementSibling.children[targetSquare].classList.add("targeted")
    } else if (evt.key === keys.down && targetRow !== 4) {
      rows[targetRow].children[targetSquare].classList.remove("targeted")
      rows[targetRow].nextElementSibling.children[targetSquare].classList.add("targeted")
    } else if (evt.key === keys.left && targetSquare !== 0) {
      rows[targetRow].children[targetSquare].classList.remove("targeted")
      rows[targetRow].children[targetSquare].previousElementSibling.classList.add("targeted")
    } else if (evt.key === keys.right && targetSquare !== 4) {
      rows[targetRow].children[targetSquare].classList.remove("targeted")
      rows[targetRow].children[targetSquare].nextElementSibling.classList.add("targeted")
    }

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    if (evt.key === keys.space && rows[targetRow].children[targetSquare].children[0] !== undefined) {
      rows[targetRow].children[targetSquare].children[0].setAttribute("data-status", "dead")
      rows[targetRow].children[targetSquare].style.backgroundColor = "red"
    }
    // 👉 TASK 5 - End the game 👈
    console.log(document.querySelectorAll('img[data-status = "alive"]').length);
    if (document.querySelectorAll('img[data-status = "alive"]').length === 0) {
      
      if (document.querySelector("header h2").children[0] === undefined) {
        document.querySelector("p.info").textContent = `Extermination completed in ${getTimeElapsed()} seconds!`
        let restartBtn = document.createElement("button")
        restartBtn.textContent = "Restart"
        document.querySelector("header h2").appendChild(restartBtn)
        restartBtn.addEventListener ("click", () => {
          window.location.reload(true)
        })
      }
    }
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
