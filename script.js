
// let section = document.querySelector('body main section')
// // let ele;

// section.addEventListener('mousemove', e => {
//     console.log(e);
//     console.log(e.clientX,e.clientY);
//     var ele = document.createElement('div')
//     ele.className = 'ele'
//     ele.style.left=`${e.clientX}px`
//     ele.style.top=`${e.clientY}px`
//     section.appendChild(ele)
// })


// let btn = document.querySelector('main button')
// console.log(btn);
// btn.addEventListener('click', () => {
// let child = Array.from(section.children)
// console.log(child);
// child.forEach(e => {
//     e.remove()
// })
// })



let section = document.querySelector('main section');
let isDrawing = false; // Track if the mouse or touch is pressed
let lastX = null; // Store the last X coordinate
let lastY = null; // Store the last Y coordinate

// Helper function to get the position relative to the section
function getRelativePosition(event, rect) {
    let x, y;

    if (event.touches) {
        // Touch event
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
    } else {
        // Mouse event
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }

    return { x, y };
}

// Start drawing
function startDrawing(event) {
    isDrawing = true;

    const rect = section.getBoundingClientRect();
    const { x, y } = getRelativePosition(event, rect);

    // Set the starting point
    lastX = x;
    lastY = y;

    event.preventDefault(); // Prevent scrolling on touch devices
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
    lastX = null;
    lastY = null;
}

// Draw while moving
function draw(event) {
    if (!isDrawing) return;

    const rect = section.getBoundingClientRect();
    const { x, y } = getRelativePosition(event, rect);

    if (lastX !== null && lastY !== null) {
        drawLine(lastX, lastY, x, y);
    }

    // Update the last position
    lastX = x;
    lastY = y;

    event.preventDefault(); // Prevent scrolling on touch devices
}

// Function to draw a line between two points
function drawLine(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.ceil(distance / 5); // Adjust the gap between points

    for (let i = 0; i <= steps; i++) {
        const x = x1 + (dx / steps) * i;
        const y = y1 + (dy / steps) * i;

        const ele = document.createElement('div');
        ele.className = 'ele';
        ele.style.left = `${x}px`;
        ele.style.top = `${y}px`;
        section.appendChild(ele);
    }
}

// Add event listeners for mouse
section.addEventListener('mousedown', startDrawing);
document.addEventListener('mouseup', stopDrawing);
section.addEventListener('mousemove', draw);

// Add event listeners for touch
section.addEventListener('touchstart', startDrawing);
document.addEventListener('touchend', stopDrawing);
section.addEventListener('touchmove', draw);

// Clear all drawn elements when clicking the "Clear" button
let btn = document.querySelector('main button');
btn.addEventListener('click', () => {
    while (section.firstChild) {
        section.firstChild.remove();
    }
});

