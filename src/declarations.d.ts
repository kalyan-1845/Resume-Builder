/**
 * @author Bhoompally Kalyan Reddy
 * @email prsnlkalyan@gmail.com
 * @github https://github.com/kalyan-1845
 * @copyright 2026 Bhoompally Kalyan Reddy. All rights reserved.
 */

declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale?: number; useCORS?: boolean; letterRendering?: boolean };
    jsPDF?: { unit?: string; format?: string | number[]; orientation?: string };
    pagebreak?: { mode?: string | string[]; before?: string | string[]; after?: string | string[]; avoid?: string | string[] };
  }

  interface Html2PdfWorker {
    from(element: HTMLElement | string): Html2PdfWorker;
    set(options: Html2PdfOptions): Html2PdfWorker;
    save(): Promise<void>;
    toPdf(): Html2PdfWorker;
    get(type: string): any;
  }

  function html2pdf(): Html2PdfWorker;
  function html2pdf(element: HTMLElement | string, options?: Html2PdfOptions): Promise<void> | Html2PdfWorker;

  export = html2pdf;
}
