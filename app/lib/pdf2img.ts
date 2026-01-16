export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    // Dynamically import pdfjs-dist to avoid server-side errors (DOMMatrix not defined)
    // and ensure we are using the installed version
    const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
    
    // Use Vite's ?url import to get the correct worker script path
    // This ensures the worker matches the library version exactly
    // @ts-ignore
    const workerModule = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
    GlobalWorkerOptions.workerSrc = workerModule.default;

    const arrayBuffer = await file.arrayBuffer();

    // Use standard font for text rendering if needed, though we are just rendering to image
    const loadingTask = getDocument({
      data: arrayBuffer,
      // Update cMapUrl to match the installed version (5.4.530)
      cMapUrl: "https://unpkg.com/pdfjs-dist@5.4.530/cmaps/", 
      cMapPacked: true,
    });

    const pdf = await loadingTask.promise;

    if (pdf.numPages < 1) {
      throw new Error("PDF has no pages");
    }

    // Get the first page
    const page = await pdf.getPage(1);
    
    // Set scale for better quality (e.g., 2.0)
    const scale = 2.0;
    const viewport = page.getViewport({ scale });

    // Prepare canvas using standard DOM API
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to get canvas context");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    // Cast to any because pdfjs-dist types can be strict about context type
    await page.render(renderContext as any).promise;

    // Convert canvas to blob/file
    return await new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob from canvas",
            });
            return;
          }

          const name = file.name.replace(/\.[^/.]+$/, ""); // strip extension
          const imageFile = new File([blob], `${name}.png`, {
            type: "image/png",
            lastModified: Date.now(),
          });

          // Create object URL for preview
          const imageUrl = URL.createObjectURL(blob);

          resolve({
            imageUrl,
            file: imageFile,
          });
        },
        "image/png",
        1.0 // quality
      );
    });

  } catch (err: any) {
    console.error("PDF Conversion Error:", err);
    return {
      imageUrl: "",
      file: null,
      error: err.message || "Unknown error occurred during PDF conversion",
    };
  }
}