// Function to generate the coordinate plane
function generatePlane() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const title = document.getElementById('title').value;
    const minX = parseInt(document.getElementById('minX').value, 10);
    const maxX = parseInt(document.getElementById('maxX').value, 10);
    const minY = parseInt(document.getElementById('minY').value, 10);
    const maxY = parseInt(document.getElementById('maxY').value, 10);

    const margin = 40;
    const width = canvas.width;
    const height = canvas.height;
    const drawingWidth = width - 2 * margin;
    const drawingHeight = height - 2 * margin;
    const centerX = margin + drawingWidth / 2;
    const centerY = margin + drawingHeight / 2;
    const unitX = drawingWidth / (maxX - minX);
    const unitY = drawingHeight / (maxY - minY);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw title
    document.getElementById('planeTitle').innerText = title;

    // Draw grid
    ctx.strokeStyle = '#ddd';
    for (let x = minX; x <= maxX; x++) {
        const posX = centerX + x * unitX;
        ctx.beginPath();
        ctx.moveTo(posX, margin);
        ctx.lineTo(posX, height - margin);
        ctx.stroke();
    }

    for (let y = minY; y <= maxY; y++) {
        const posY = centerY - y * unitY;
        ctx.beginPath();
        ctx.moveTo(margin, posY);
        ctx.lineTo(width - margin, posY);
        ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin, centerY);
    ctx.lineTo(width - margin, centerY);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, margin);
    ctx.lineTo(centerX, height - margin);
    ctx.stroke();
}

// Function to download the canvas as an image
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'coordinate-plane.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Function to download the canvas as a PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const canvas = document.getElementById('canvas');
    const pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 180, 160);
    pdf.save('coordinate-plane.pdf');
}
