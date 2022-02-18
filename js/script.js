window.addEventListener('DOMContentLoaded', function(event) {

  // Add dialog
  var dialog = document.querySelector('dialog')

  dialog.style.backgroundColor = "transparent"
  dialog.style.border = "none"


  //Button close dialog
  let closeBtn = document.querySelector('#close')
  closeBtn.onclick = function() {
    dialog.close()
    location.reload()
  }
  closeBtn.style.display = "none"

  //Message in dialog
  let message = document.querySelector('#message')

  //HTML elements

  let info = document.querySelector('.info')
  let grid = document.querySelector('.grid')
  let cells = document.querySelectorAll('.cell')
  
  //Win combination

  const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  //Gamer stats

  let gamer = 1
  let stack1 = []
  let stack2 = []

  //Click handler

  grid.addEventListener('click', (event) => {
    event.preventDefault()
    let xOr0 = document.createElement('div')
    xOr0.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0%;
        left: 0%;
        text-align: center;
        pointer-events: none;
        background-size: cover;
        background-color: transparent;
      `
      for (let i = 0; i < cells.length; i++) {
        if (event.target === cells[i]) {
          if(gamer === 1) {
            if(cells[i].childElementCount < 1) {
              gamer = 2
              xOr0.style.backgroundImage = 'url(./icons/XX.png)'
              stack1.push(i)
            }
            if(winCombination.some(el => el.every(el => stack1.includes(el)))) {
              info.innerText = 'Игра окончена'
              
              closeBtn.style.display = 'inline-block'
              message.textContent = 'Выиграл игрок 1'

              dialog.showModal()
            }
          }
          else if (gamer === 2) {
            if(cells[i].childElementCount < 1) {
              gamer = 1
              xOr0.style.backgroundImage = 'url(./icons/OO.png)'
              stack2.push(i)
            }
            if(winCombination.some(el => el.every(el => stack2.includes(el)))) {
              info.innerText = 'Игра окончена'
              
              closeBtn.style.display = 'inline-block'
              message.textContent = 'Выиграл игрок 2'

              dialog.showModal()
            }
          }
          
          if(cells[i].childElementCount < 1) cells[i].appendChild(xOr0)
          if(stack1.length + stack2.length === 9 && !winCombination.some(el => el.every(el => stack2.includes(el)))) {
              info.innerText = 'Игра окончена'
              
              closeBtn.style.display = 'inline-block'
              message.textContent = 'Ничья'

              dialog.showModal()
          }
        }
      }
    if(info.innerText !== 'Игра окончена') info.innerText = `Ход игрока ${gamer}`
  })

  //Add interactive hover

  grid.onmouseover = function(event) {
    let target = event.target
    if(gamer === 1) {
      if(target.childElementCount < 1) target.style.backgroundImage = 'url(./icons/XX.png)'
    }
    else if(gamer === 2) {
      if(target.childElementCount < 1) target.style.backgroundImage = 'url(./icons/OO.png)'
    }
  }
  
  grid.onmouseout = function(event) {
    let target = event.target
    target.style.backgroundImage = ''
    target.style.backgroundColor = 'transparent'
  }

})
