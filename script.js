let currentMode = `color`
let currentColor = '#fff'
let currentSize = 16

function setCurrentMode(mode) {
    currentMode = mode;
    activateButton();
}

// activate button
function activateButton() {
    if (currentMode === 'color') {
        removeClassAllBtn()
        colorBtn.classList.add('active')
    } else if (currentMode === 'rainbow') {
        removeClassAllBtn()
        rainbowBtn.classList.add('active')
    } else if (currentMode === 'eraser') {
        removeClassAllBtn()
        eraserBtn.classList.add('active')
    }

    // remove class all Btn
    function removeClassAllBtn() {
        allBtn.forEach(function (el) {
            el.classList.remove("active")
        })
    }
}

// select elements
const grid = document.getElementById('grid')
const colorPicker = document.getElementById('colorPicker')
const allBtn = document.querySelectorAll('button')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')

// events
colorPicker.onchange = (e) => currentColor = e.target.value
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => reloadGrid()
sizeSlider.onchange = (e) => changeSize(e.target.value)

// create grid
function createGrid(size) {
    grid.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        grid.appendChild(gridElement);
        gridElement.addEventListener('mouseover', changeColor)
    }
}

// change color
function changeColor(e) {
    if (currentMode === `color`) {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === `rainbow`) {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === `eraser`) {
        e.target.style.backgroundColor = '#1C1C1E'
    }
}

// reloadGrid
function reloadGrid() {
    grid.innerHTML = ''
    createGrid(currentSize)
}

// changeSize
function changeSize(size) {
    currentSize = size;
    updateSizeValue(currentSize)
    reloadGrid()
}

// updateSizeValue
function updateSizeValue(size) {
    sizeValue.innerHTML = `${size} x ${size}`
}

// onload
window.onload = createGrid(currentSize)