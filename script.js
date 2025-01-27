function generatePlane() {
  const title = document.getElementById('title').value;
  const type = document.getElementById('type').value;
  const minX = parseFloat(document.getElementById('minX').value);
  const maxX = parseFloat(document.getElementById('maxX').value);
  const minY = parseFloat(document.getElementById('minY').value);
  const maxY = parseFloat(document.getElementById('maxY').value);

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the grid
  const width = canvas.width;
  const height = canvas.height;
  const stepX = width / (maxX - minX);
  const stepY = height / (maxY - minY);

  // Draw axes
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2); // X-axis
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height); // Y-axis
  ctx.stroke();

  // Draw grid lines
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ccc';

  for (let x = minX; x <= maxX; x++) {
    const posX = (x - minX) * stepX;
    ctx.beginPath();
    ctx.moveTo(posX, 0);
    ctx.lineTo(posX, height);
    ctx.stroke();
  }
  for (let y = minY; y <= maxY; y++) {
    const posY = height - (y - minY) * stepY;
    ctx.beginPath();
    ctx.moveTo(0, posY);
    ctx.lineTo(width, posY);
    ctx.stroke();
  }

  // Add title
  const planeTitle = document.getElementById('planeTitle');
  planeTitle.textContent = title;
}

function downloadImage() {
  const canvas = document.getElementById('canvas');
  const link = document.createElement('a');
  link.download = 'coordinate-plane.png';
  link.href = canvas.toDataURL();
  link.click();
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const canvas = document.getElementById('canvas');
  const pdf = new jsPDF();
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 180, 160);
  pdf.save('coordinate-plane.pdf');
}
