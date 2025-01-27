function generatePlane() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('title').value;
  const minX = parseInt(document.getElementById('minX').value, 10);
  const maxX = parseInt(document.getElementById('maxX').value, 10);
  const minY = parseInt(document.getElementById('minY').value, 10);
  const maxY = parseInt(document.getElementById('maxY').value, 10);

  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const unitX = width / (maxX - minX); // Pixels per unit on the X-axis
  const unitY = height / (maxY - minY); // Pixels per unit on the Y-axis

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw title
  document.getElementById('planeTitle').innerText = title;

  // Draw grid
  ctx.strokeStyle = '#ddd';
  for (let x = minX; x <= maxX; x++) {
    const posX = centerX + x * unitX;
    ctx.beginPath();
    ctx.moveTo(posX, 0);
    ctx.lineTo(posX, height);
    ctx.stroke();
  }

  for (let y = minY; y <= maxY; y++) {
    const posY = centerY - y * unitY;
    ctx.beginPath();
    ctx.moveTo(0, posY);
    ctx.lineTo(width, posY);
    ctx.stroke();
  }

  // Draw axes
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;

  // X-axis
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.stroke();

  // Y-axis
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.stroke();

  // Add arrows to axes
  const arrowSize = 10;

  // Arrow for X-axis
  ctx.beginPath();
  ctx.moveTo(width, centerY);
  ctx.lineTo(width - arrowSize, centerY - arrowSize / 2);
  ctx.lineTo(width - arrowSize, centerY + arrowSize / 2);
  ctx.closePath();
  ctx.fill();

  // Arrow for Y-axis
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX - arrowSize / 2, arrowSize);
  ctx.lineTo(centerX + arrowSize / 2, arrowSize);
  ctx.closePath();
  ctx.fill();

  // Add numbers to axes
  ctx.fillStyle = '#000';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Numbers on X-axis
  for (let x = minX; x <= maxX; x++) {
    if (x === 0) continue; // Skip the origin
    const posX = centerX + x * unitX;
    ctx.fillText(x, posX, centerY + 15);
  }

  // Numbers on Y-axis
  ctx.textAlign = 'right';
  for (let y = minY; y <= maxY; y++) {
    if (y === 0) continue; // Skip the origin
    const posY = centerY - y * unitY;
    ctx.fillText(y, centerX - 10, posY);
  }
}

function downloadImage() {
  const canvas = document.getElementById('canvas');
  const link = document.createElement('a');
  link.download = 'coordinate_plane.png';
  link.href = canvas.toDataURL();
  link.click();
}

function downloadPDF() {
  const canvas = document.getElementById('canvas');
  const pdf = new jsPDF('l', 'mm', [canvas.width, canvas.height]);
  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('coordinate_plane.pdf');
}
