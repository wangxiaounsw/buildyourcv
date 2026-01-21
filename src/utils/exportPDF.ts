"use client";

export async function exportToPDF(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Preview element not found");
  }

  try {
    // Try using html2pdf.js first
    const html2pdfModule = await import("html2pdf.js");
    const html2pdf = html2pdfModule.default;

    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait" as const,
      },
    };

    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error("html2pdf error:", error);
    // Fallback to browser print
    printElement(element, filename);
  }
}

function printElement(element: HTMLElement, filename: string): void {
  // Create a new window with just the resume content
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to export PDF");
    return;
  }

  // Get all stylesheets
  const styles = Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch {
        // External stylesheets might throw security errors
        if (styleSheet.href) {
          return `@import url("${styleSheet.href}");`;
        }
        return "";
      }
    })
    .join("\n");

  // Get CSS variables from the preview element
  const computedStyle = getComputedStyle(element);
  const cssVars = `
    :root {
      --cv-font-family: ${computedStyle.getPropertyValue("--cv-font-family") || "'Inter', sans-serif"};
      --cv-primary-color: ${computedStyle.getPropertyValue("--cv-primary-color") || "#2563eb"};
      --cv-accent-color: ${computedStyle.getPropertyValue("--cv-accent-color") || "#3b82f6"};
      --cv-h1-size: ${computedStyle.getPropertyValue("--cv-h1-size") || "2.25rem"};
      --cv-h2-size: ${computedStyle.getPropertyValue("--cv-h2-size") || "1.125rem"};
      --cv-h3-size: ${computedStyle.getPropertyValue("--cv-h3-size") || "1rem"};
      --cv-body-size: ${computedStyle.getPropertyValue("--cv-body-size") || "0.875rem"};
    }
  `;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>
          ${cssVars}
          ${styles}
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              size: A4;
              margin: 10mm;
            }
          }
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();

  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
}
