function generatePlane() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const title = document.getElementById('title').value;
    const minX = parseInt(document.getElementById('minX').value, 10);
    const maxX = parseInt(document.getElementById('maxX').value, 10);
    const minY = parseInt(document.getElementById('minY').value, 10);
    const maxY = parseInt(document.getElementById('maxY').value, 10);
    const includeArrows = document.getElementById('arrows').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const gridLineStyle = document.getElementById('gridLineStyle').value;
    const gridLineColor = document.getElementById('gridLineColor').value;


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

    // Set default grid line color (optional, can be removed)
    ctx.strokeStyle = '#ddd';

    // Style of the grid lines and color
    ctx.strokeStyle = gridLineColor; 

    ctx.setLineDash([]); // Clear any existing line dash
    if (gridLineStyle === 'dashed') {
    ctx.setLineDash([5, 5]); 
    } else if (gridLineStyle === 'dotted') {
    ctx.setLineDash([2, 2]);
    }

    function generatePlane() {

    // Set line dash
    ctx.setLineDash([]); 
    if (gridLineStyle === 'dashed') {
        ctx.setLineDash([5, 5]); 
    } else if (gridLineStyle === 'dotted') {
        ctx.setLineDash([2, 2]);
    }

    // Draw grid 
    
    for (let x = minX; x <= maxX; x++) {
        // ... (rest of grid drawing code)
    }

    for (let y = minY; y <= maxY; y++) {
        // ... (rest of grid drawing code)
    }

    // ... (rest of generatePlane() function)
}

    // Draw grid
    
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

    // Draw arrows if checkbox is checked
    if (includeArrows) {
        const arrowSize = 10;

        // Arrow for positive X-axis
        ctx.beginPath();
        ctx.moveTo(width - margin, centerY);
        ctx.lineTo(width - margin - arrowSize, centerY - arrowSize / 2);
        ctx.lineTo(width - margin - arrowSize, centerY + arrowSize / 2);
        ctx.closePath();
        ctx.fill();

        // Arrow for negative X-axis
        ctx.beginPath();
        ctx.moveTo(margin, centerY);
        ctx.lineTo(margin + arrowSize, centerY - arrowSize / 2);
        ctx.lineTo(margin + arrowSize, centerY + arrowSize / 2);
        ctx.closePath();
        ctx.fill();

        // Arrow for positive Y-axis
        ctx.beginPath();
        ctx.moveTo(centerX, margin);
        ctx.lineTo(centerX - arrowSize / 2, margin + arrowSize);
        ctx.lineTo(centerX + arrowSize / 2, margin + arrowSize);
        ctx.closePath();
        ctx.fill();

        // Arrow for negative Y-axis
        ctx.beginPath();
        ctx.moveTo(centerX, height - margin);
        ctx.lineTo(centerX - arrowSize / 2, height - margin - arrowSize);
        ctx.lineTo(centerX + arrowSize / 2, height - margin - arrowSize);
        ctx.closePath();
        ctx.fill();
    }

    // Add numbers to axes if checkbox is checked
    if (includeNumbers) {
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';

        // Numbers on X-axis
        ctx.textAlign = 'center';
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

    if (document.getElementById('quadrants').checked) {
        ctx.fillStyle = "blue";
        ctx.font = "30px Arial";
        ctx.fillText("I", centerX + 120, centerY - 120);
        ctx.fillText("II", centerX - 120, centerY - 120);
        ctx.fillText("III", centerX - 120, centerY + 120);
        ctx.fillText("IV", centerX + 120, centerY + 120);
    }
}

// Function to download the canvas as an image
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'coordinate-plane.png';
    link.href = image;
    link.click();
}

// Function to download the canvas as a PDF (single or four planes with proper numbering and alignment)
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const canvas = document.getElementById('canvas');
    const planeCount = document.getElementById('planeCount').value; // Get user selection
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'letter'
    });

    const title = document.getElementById('title').value || "Coordinate Plane Worksheet";
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yOffset = 40;

    // Add Full Name and Date fields
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Full Name: ____________________", 40, yOffset);
    pdf.text("Date: ____________________", pageWidth - 200, yOffset);

    yOffset += 50; // Move down for title

    // Add title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(title, pageWidth / 2, yOffset, { align: "center" });

    yOffset += 40; // Move down for graph

    // Convert canvas to image
    const image = canvas.toDataURL("image/png");

    if (planeCount == "1") {
        // Single Plane - Center it on the page
        const imgWidth = pageWidth - 80;
        const imgHeight = imgWidth;
        pdf.text("1)", 40, yOffset + 10); // Numbering above the plane
        pdf.addImage(image, "PNG", 40, yOffset + 20, imgWidth, imgHeight);
    } else {
        // Four Planes per Page (2x2 Grid) with Proper Numbering Alignment
        const marginX = 60; // Left margin for number alignment
        const spacingX = (pageWidth - 2 * marginX) / 2; // Width for each image
        const spacingY = spacingX; // Maintain square aspect ratio
        const rowSpacing = 60; // Space between rows

        // Table-like Structure (2x2 Grid)
        const positions = [
            { x: marginX, y: yOffset, label: "1)" },
            { x: marginX + spacingX, y: yOffset, label: "2)" },
            { x: marginX, y: yOffset + spacingY + rowSpacing, label: "3)" },
            { x: marginX + spacingX, y: yOffset + spacingY + rowSpacing, label: "4)" }
        ];

        // Add Numbering and Coordinate Planes Properly Aligned
        positions.forEach(pos => {
            pdf.setFontSize(12);
            pdf.text(pos.label, pos.x, pos.y); // Number on its own line
            pdf.addImage(image, "PNG", pos.x, pos.y + 10, spacingX - 10, spacingY - 10);
        });
    }

    // Save the PDF
    pdf.save("coordinate-plane-worksheet.pdf");
}
