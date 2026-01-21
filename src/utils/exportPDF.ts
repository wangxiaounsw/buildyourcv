"use client";

export async function exportToPDF(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Preview element not found");
  }

  // Use browser print dialog - most reliable method
  printElement(element, filename);
}

function printElement(element: HTMLElement, filename: string): void {
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;

  // Create print container
  const printContainer = document.createElement("div");
  printContainer.id = "print-container";
  printContainer.style.cssText = `
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background: white;
    overflow: auto;
  `;

  // Get computed CSS variables from the original element
  const computedStyle = getComputedStyle(element);
  const cssVars = {
    fontFamily: computedStyle.getPropertyValue("--cv-font-family") || "'Inter', sans-serif",
    primaryColor: computedStyle.getPropertyValue("--cv-primary-color") || "#2563eb",
    accentColor: computedStyle.getPropertyValue("--cv-accent-color") || "#3b82f6",
    h1Size: computedStyle.getPropertyValue("--cv-h1-size") || "2.25rem",
    h2Size: computedStyle.getPropertyValue("--cv-h2-size") || "1.125rem",
    h3Size: computedStyle.getPropertyValue("--cv-h3-size") || "1rem",
    bodySize: computedStyle.getPropertyValue("--cv-body-size") || "0.875rem",
  };

  // Apply CSS variables to clone
  clone.style.setProperty("--cv-font-family", cssVars.fontFamily);
  clone.style.setProperty("--cv-primary-color", cssVars.primaryColor);
  clone.style.setProperty("--cv-accent-color", cssVars.accentColor);
  clone.style.setProperty("--cv-h1-size", cssVars.h1Size);
  clone.style.setProperty("--cv-h2-size", cssVars.h2Size);
  clone.style.setProperty("--cv-h3-size", cssVars.h3Size);
  clone.style.setProperty("--cv-body-size", cssVars.bodySize);

  printContainer.appendChild(clone);
  document.body.appendChild(printContainer);

  // Add print styles
  const style = document.createElement("style");
  style.id = "print-styles";
  style.textContent = `
    @media print {
      body > *:not(#print-container) {
        display: none !important;
      }
      #print-container {
        position: static !important;
        width: 100% !important;
        height: auto !important;
      }
      @page {
        size: A4;
        margin: 10mm;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Trigger print
  setTimeout(() => {
    window.print();

    // Cleanup after print dialog closes
    setTimeout(() => {
      document.body.removeChild(printContainer);
      document.head.removeChild(style);
    }, 100);
  }, 100);
}
