let container = document.querySelector('.container');
let rows = 16;
let columns = 16;

for (let i = 0; i < rows*columns; i++) {
    let div = document.createElement('div');
    div.classList.add('square');
    container.appendChild(div);
}

container.style.cssText = `
display: grid;
grid-template-columns: repeat(16, 1fr);
grid-template-rows: repeat(16, 1fr);
`;

let squares = document.querySelectorAll('.square');
squares.forEach(square => square.addEventListener('mouseover', makeBlackSquare));

function makeBlackSquare(event) {
    event.target.classList.add('black-square');
}