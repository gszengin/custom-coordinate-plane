function generatePlane() {
    const svgContainer = document.getElementById('svg-container');
    svgContainer.innerHTML = ''; // Clear previous SVG

    const title = document.getElementById('title').value;
    const minX = parseInt(document.getElementById('minX').value, 10);
    const maxX = parseInt(document.getElementById('maxX').value, 10);
    const minY = parseInt(document.getElementById('minY').value, 10);
    const maxY = parseInt(document.getElementById('maxY').value, 10);
    const includeArrows = document.getElementById('arrows').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeQuadrants = document.getElementById('quadrants').checked;
    const gridLineStyle = document.getElementById('gridLineStyle').value;
    const gridLineColor = document.getElementById('gridLineColor').value;

    const width = 600;
    const height = 600;
    const margin = 40;
    const centerX = width / 2;
    const centerY = height / 2;
    const unitX = (width - 2 * margin) / (maxX - minX);
    const unitY = (height - 2 * margin) / (maxY - minY);

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("xmlns", svgNS);

    function createLine(x1, y1, x2, y2, color, dash) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "1");
        if (dash) line.setAttribute("stroke-dasharray", dash);
        return line;
    }

    function createArrow(x, y, points) {
        const arrow = document.createElementNS(svgNS, "polygon");
        arrow.setAttribute("points", points);
        arrow.setAttribute("fill", "black");
        arrow.setAttribute("transform", `translate(${x},${y})`);
        return arrow;
    }

    function createText(x, y, textContent, fontSize, fill, textAnchor) {
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        text.setAttribute("font-size", fontSize);
        text.setAttribute("fill", fill);
        text.setAttribute("text-anchor", textAnchor);
        text.textContent = textContent;
        return text;
    }

    // Draw the title if provided
    if (title) {
        svg.appendChild(createText(centerX, margin / 2, title, "20", "black", "middle"));
    }

    // Draw grid lines
    for (let x = minX; x <= maxX; x++) {
        const posX = centerX + x * unitX;
        svg.appendChild(createLine(posX, margin, posX, height - margin, gridLineColor, gridLineStyle === 'dashed' ? "5,5" : gridLineStyle === 'dotted' ? "2,2" : ""));
    }
    for (let y = minY; y <= maxY; y++) {
        const posY = centerY - y * unitY;
        svg.appendChild(createLine(margin, posY, width - margin, posY, gridLineColor, gridLineStyle === 'dashed' ? "5,5" : gridLineStyle === 'dotted' ? "2,2" : ""));
    }

    // Draw axes
    svg.appendChild(createLine(margin, centerY, width - margin, centerY, "black"));
    svg.appendChild(createLine(centerX, margin, centerX, height - margin, "black"));

    // Draw arrows if checkbox is checked
    if (includeArrows) {
        const arrowSize = 10;
        svg.appendChild(createArrow(width - margin, centerY, "-8,-4 -8,4 0,0")); // X+
        svg.appendChild(createArrow(margin, centerY, "8,-4 8,4 0,0")); // X-
        svg.appendChild(createArrow(centerX, margin, "-4,8 4,8 0,0")); // Y+
        svg.appendChild(createArrow(centerX, height - margin, "-4,-8 4,-8 0,0")); // Y-
    }

    // Add numbers to axes if checkbox is checked
    if (includeNumbers) {
        for (let x = minX; x <= maxX; x++) {
            if (x === 0) continue;
            const posX = centerX + x * unitX;
            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x", posX);
            text.setAttribute("y", centerY + 15);
            text.setAttribute("font-size", "12");
            text.setAttribute("text-anchor", "middle");
            text.textContent = x;
            svg.appendChild(text);
        }
        for (let y = minY; y <= maxY; y++) {
            if (y === 0) continue;
            const posY = centerY - y * unitY;
            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x", centerX - 10);
            text.setAttribute("y", posY);
            text.setAttribute("font-size", "12");
            text.setAttribute("text-anchor", "end");
            text.textContent = y;
            svg.appendChild(text);
        }
    }

    // Draw quadrant labels if checkbox is checked
    if (includeQuadrants) {
        svg.appendChild(createText(centerX + 80, centerY - 80, "I", "20", "blue", "middle"));
        svg.appendChild(createText(centerX - 80, centerY - 80, "II", "20", "blue", "middle"));
        svg.appendChild(createText(centerX - 80, centerY + 80, "III", "20", "blue", "middle"));
        svg.appendChild(createText(centerX + 80, centerY + 80, "IV", "20", "blue", "middle"));
    }

    // Add SVG to container
    svgContainer.appendChild(svg);
}


// Function to download the canvas as an image
function downloadImage() {
    const svgElement = document.querySelector("#svg-container svg");
    if (!svgElement) {
        alert("No coordinate plane found to download.");
        return;
    }

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = function () {
        const canvas = document.createElement("canvas");
        const scaleFactor = 3; // Increase for better quality
        canvas.width = svgElement.clientWidth * scaleFactor;
        canvas.height = svgElement.clientHeight * scaleFactor;
        const ctx = canvas.getContext("2d");

        // Ensure a white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the SVG onto the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Create the download link
        const image = canvas.toDataURL("image/png", 1.0); // Maximum quality
        const link = document.createElement("a");
        link.download = "coordinate-plane.png";
        link.href = image;
        link.click();

        // Cleanup
        URL.revokeObjectURL(svgUrl);
    };
    
    img.src = svgUrl;
}


// Function to download the canvas as a PDF (single or four planes with proper numbering and alignment)
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const svgElement = document.querySelector("#svg-container svg");
    if (!svgElement) {
        alert("No coordinate plane found to download.");
        return;
    }

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

    // Convert SVG to a high-quality image using a canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = function () {
        const scaleFactor = 2; // Improves resolution
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const image = canvas.toDataURL("image/png", 1.0);

        const marginX = 60;
        const spacingX = (pageWidth - 2 * marginX) / 2;
        const spacingY = spacingX;
        const rowSpacing = 60;

        if (planeCount == "1") {
            const imgWidth = pageWidth - 80;
            const imgHeight = imgWidth;
            pdf.text("1)", 40, yOffset + 10);
            pdf.addImage(image, "PNG", 40, yOffset + 20, imgWidth, imgHeight);
        } else {
            const positions = [
                { x: marginX, y: yOffset, label: "1)" },
                { x: marginX + spacingX, y: yOffset, label: "2)" },
                { x: marginX, y: yOffset + spacingY + rowSpacing, label: "3)" },
                { x: marginX + spacingX, y: yOffset + spacingY + rowSpacing, label: "4)" }
            ];

            positions.forEach(pos => {
                pdf.setFontSize(12);
                pdf.text(pos.label, pos.x, pos.y);
                pdf.addImage(image, "PNG", pos.x, pos.y + 10, spacingX - 10, spacingY - 10);
            });
        }

        pdf.save("coordinate-plane-worksheet.pdf");
        URL.revokeObjectURL(svgUrl); // Cleanup
    };

    img.src = svgUrl;
}
