let useRGB = false;
let useDarken = false;

const rgbButton = document.getElementById('colrBtn');
rgbButton.addEventListener('click', function () {
    useRGB = !useRGB;
    rgbButton.textContent = useRGB ? "RGB Mode: ON" : "RGB Mode: OFF";
});

const darkenButton = document.getElementById('darkenBtn');
darkenButton.addEventListener('click', function () {
    useDarken = !useDarken;
    darkenButton.textContent = useDarken ? "Darken Mode: ON" : "Darken Mode: OFF";
});


function createGrid(size) {
    const container = document.getElementById('container');
    container.textContent = '';

  

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        const squareSize = 960 / size;
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        square.addEventListener('mouseenter', function () {
            if (useDarken) {
                // If no hover count yet, set to 0
                if (!square.dataset.hoverCount) {
                    square.dataset.hoverCount = 0;
                }

                let count = parseInt(square.dataset.hoverCount);
                if (count < 10) {
                    count++;
                    square.dataset.hoverCount = count;
                    square.style.backgroundColor = 'black';
                    square.style.opacity = count / 10;
                }
            } else if (!square.style.backgroundColor) {
                if (useRGB) {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                } else {
                    square.style.backgroundColor = 'black';
                }
            }
        });

    
        

    container.appendChild(square);
    }
}


//clear all squares
const clearButton = document.getElementById('clearBtn');
clearButton.addEventListener('click', function () {
    const gridSize = prompt("Enter new grid size (max 100):");
    const size = parseInt(gridSize);

    if (isNaN(size) || size < 1 || size > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }

    createGrid(size); // Regenerate new grid

});

// Create a default 16x16 grid on load
createGrid(16);
