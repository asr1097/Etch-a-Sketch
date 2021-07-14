let container = document.querySelector('.container');
let standardSize = 16;
let rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let rainbowCounter = 0;
let color = 'black';

createGrid(standardSize);

function createGrid (size) {
    for (let i = 0; i < size*size; i++) {
        let div = document.createElement('div');
        div.classList.add('square');
        container.appendChild(div);
    }

    container.style.cssText = `
    display: grid;
    grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);
    `;

}

function resetGrid() {
    document.querySelectorAll('.square').forEach(square => container.removeChild(square));
    let size = prompt('Grid size? ');
    while (size > 100 || isNaN(size)) {size = prompt('Grid size? ')};
    createGrid(parseInt(size, 10));
}

function makeShade(event) {
    let square = event.target;
    let bc = getComputedStyle(square).backgroundColor;
    let opacity = getComputedStyle(square).opacity;
    if (bc !== 'rgb(0, 0, 0)') {
        square.style.setProperty('background-color', 'black')
        square.style.setProperty('opacity', '0.1');
    };
    if (opacity !== '1') {
        let op = parseFloat(opacity) + 0.1;
        square.style.setProperty('opacity', op.toString());
    }
}

function colorSquare() {
    switch (color) {
        case 'black':
            this.style.setProperty('background-color', 'black');
            this.style.setProperty('opacity', '1');
            this.dataset.mode = 'black';
            break;
        case 'shade':
            let bc = getComputedStyle(this).backgroundColor;
            let opacity = getComputedStyle(this).opacity;
            let mode = this.dataset.mode;

            if (bc !== 'rgb(0, 0, 0)') {
                this.style.setProperty('background-color', 'black')
                this.style.setProperty('opacity', '0.1');
                break;
            };

            if (bc === 'rgb(0, 0, 0)') {
                if (mode === 'black') {
                    this.style.setProperty('background-color', 'black')
                    this.style.setProperty('opacity', '0.1');
                    this.removeAttribute('data-mode');
                    break;
                }
                else {
                    let op = parseFloat(opacity) + 0.1;
                    this.style.setProperty('opacity', op.toString())
                    break;
                };       
        }
        case 'rainbow':
            if (rainbowCounter >= rainbowColors.length) {
                rainbowCounter = 0;
            };
            this.style.setProperty('background-color', rainbowColors[rainbowCounter]);
            this.style.setProperty('opacity', '1');
            rainbowCounter += 1;
        }};

function changeColor(event) {
    switch (event.target.dataset.color) {
        case 'black':
            color = 'black';
            break;
        case 'shade':
            color = 'shade';
            break;
        case 'rainbow':
            rainbowCounter = 0;  //reset rainbowCounter to 0
            color = 'rainbow';
            break;        
    }
}

document.querySelector('.reset-btn').addEventListener('click', resetGrid);
document.querySelector('.black-btn').addEventListener('click', changeColor);
document.querySelector('.shade-btn').addEventListener('click', changeColor);
document.querySelector('.rainbow-btn').addEventListener('click', changeColor);

let squares = document.querySelectorAll('.square');
squares.forEach(square => square.addEventListener('mouseenter', colorSquare));
squares.forEach(square => square.addEventListener('touchmove', colorSquare));



    