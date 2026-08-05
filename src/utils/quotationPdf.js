import html2pdf from 'html2pdf.js';
import { quotationFilename } from '../data/quotation';

const PDF_MARGIN_MM = 5;

/**
 * Usable A4 content height in CSS px. Slightly conservative vs true page height.
 * Only used for SMALL keep-together blocks (SOP / bottom row) — never for large
 * sections like scope+checklist (that caused half-empty pages).
 */
function pageHeightPx() {
  return ((297 - PDF_MARGIN_MM * 2) * 96) / 25.4 - 16;
}

/** Small atomic sections only — must fit on one page and are short enough that
 *  pushing them does not leave a huge blank region. */
const SMALL_KEEP_TOGETHER = ['.sop-block', '.bottom'];

function pdfOptions(filename) {
  return {
    margin: [PDF_MARGIN_MM, PDF_MARGIN_MM, PDF_MARGIN_MM, PDF_MARGIN_MM],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 820,
      onclone: (doc, el) => {
        el.classList.add('quotation-app', 'is-pdf');
        el.style.padding = '0';
        el.style.background = '#ffffff';
        el.style.width = '820px';
        el.style.maxWidth = '820px';
        el.style.boxSizing = 'border-box';

        // Clear any leftover spacers from a prior attempt on a reused node
        el.querySelectorAll('[data-pdf-spacer]').forEach((n) => n.remove());

        const style = doc.createElement('style');
        style.setAttribute('data-pdf-force', '1');
        style.textContent = `
          .quotation-app.is-pdf .scope-check {
            display: flex !important;
            flex-direction: row !important;
            width: 100% !important;
          }
          .quotation-app.is-pdf .scope-check > .panel {
            flex: 0 0 36% !important;
            width: 36% !important;
            max-width: 36% !important;
          }
          .quotation-app.is-pdf .scope-check > .checklist {
            flex: 1 1 64% !important;
            width: 64% !important;
            max-width: 64% !important;
            min-width: 0 !important;
          }
          .quotation-app.is-pdf .cl-cols {
            display: flex !important;
            flex-direction: row !important;
            width: 100% !important;
          }
          .quotation-app.is-pdf .cl-col {
            flex: 1 1 50% !important;
            width: 50% !important;
            max-width: 50% !important;
            border-bottom: none !important;
          }
          .quotation-app.is-pdf .sop {
            display: grid !important;
            grid-template-columns: repeat(6, 1fr) !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .quotation-app.is-pdf .step {
            padding: 10px 8px !important;
          }
          .quotation-app.is-pdf .step .d {
            font-size: 9px !important;
          }
          .quotation-app.is-pdf .bottom {
            display: grid !important;
            grid-template-columns: 1fr 1fr 1fr !important;
            align-items: stretch !important;
          }
          .quotation-app.is-pdf .terms-pay,
          .quotation-app.is-pdf .eq-price {
            display: flex !important;
            flex-direction: row !important;
            width: 100% !important;
          }
          .quotation-app.is-pdf .pkgs {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
          }
          /* Atomic only — NOT large wrappers like .scope-check / .eq-price / .terms-pay */
          .quotation-app.is-pdf .step,
          .quotation-app.is-pdf .pkg,
          .quotation-app.is-pdf .sop,
          .quotation-app.is-pdf .sop-block,
          .quotation-app.is-pdf .price,
          .quotation-app.is-pdf .price-table,
          .quotation-app.is-pdf .accept,
          .quotation-app.is-pdf .contactbox,
          .quotation-app.is-pdf .bottom {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        `;
        doc.head.appendChild(style);
      },
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: {
      mode: ['css', 'legacy'],
      // Atomic / small only — never large section wrappers
      avoid: [
        '.sop-block',
        '.sop',
        '.step',
        '.pkg',
        '.price',
        '.price-table',
        '.bottom',
        '.accept',
        '.contactbox',
      ],
    },
  };
}

/**
 * Push only SMALL blocks (SOP, bottom cards) to the next page when they would be
 * sliced. Large sections (scope+checklist, equipment+price) are allowed to flow
 * across pages so page 1 does not end up half-empty.
 */
function insertSmallBlockSpacers(rootEl) {
  const PAGE_PX = pageHeightPx();
  const sheet = rootEl.querySelector('.sheet') || rootEl;

  rootEl.querySelectorAll('[data-pdf-spacer]').forEach((n) => n.remove());

  SMALL_KEEP_TOGETHER.forEach((sel) => {
    const el = rootEl.querySelector(sel);
    if (!el) return;

    const sheetTop = sheet.getBoundingClientRect().top;
    const rect = el.getBoundingClientRect();
    const top = rect.top - sheetTop;
    const height = rect.height;
    if (height <= 0 || height > PAGE_PX * 0.45) return; // skip if unexpectedly large

    const posInPage = ((top % PAGE_PX) + PAGE_PX) % PAGE_PX;
    const remaining = PAGE_PX - posInPage;

    if (height > remaining + 1) {
      const spacer = document.createElement('div');
      spacer.setAttribute('data-pdf-spacer', '1');
      spacer.style.cssText = [
        'display:block',
        'width:100%',
        `height:${Math.ceil(remaining)}px`,
        'margin:0',
        'padding:0',
        'border:0',
        'overflow:hidden',
        'pointer-events:none',
      ].join(';');
      el.parentNode.insertBefore(spacer, el);
    }
  });
}

function trimTrailingBlankPages(pdf, contentEl) {
  let pageCount = pdf.internal.getNumberOfPages();
  if (pageCount <= 1) return;

  const pageHeightMm = pdf.internal.pageSize.getHeight();
  const usableMm = pageHeightMm - PDF_MARGIN_MM * 2;
  const measureEl = contentEl.querySelector?.('.sheet') || contentEl;
  const contentMm = measureEl.scrollHeight * (25.4 / 96);
  const pagesNeeded = Math.max(1, Math.ceil(contentMm / usableMm));

  while (pageCount > pagesNeeded && pageCount > 1) {
    pdf.deletePage(pageCount);
    pageCount -= 1;
  }
}

export async function generateQuotationPdfBlob(rootEl, quotationNo) {
  if (!rootEl) throw new Error('Quotation sheet not found');

  const target = rootEl.classList?.contains('quotation-app')
    ? rootEl
    : rootEl.closest?.('.quotation-app') || rootEl;

  void target.offsetHeight;
  insertSmallBlockSpacers(target);
  void target.offsetHeight;

  const filename = quotationFilename(quotationNo);
  const worker = html2pdf().set(pdfOptions(filename)).from(target);
  const pdf = await worker.toPdf().get('pdf');
  trimTrailingBlankPages(pdf, target);

  // Clean spacers so a reused live node isn't left padded (offscreen clone is discarded)
  target.querySelectorAll('[data-pdf-spacer]').forEach((n) => n.remove());

  return { blob: pdf.output('blob'), filename };
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function shareOrDownloadPdf(blob, filename, title = 'Home Shine Quotation') {
  const file = new File([blob], filename, { type: 'application/pdf' });

  const canShareFiles =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] });

  if (canShareFiles) {
    try {
      await navigator.share({
        files: [file],
        title,
        text: 'Home Shine Operational Quotation / Work Order',
      });
      return 'shared';
    } catch (err) {
      if (err?.name === 'AbortError') return 'aborted';
    }
  }

  downloadBlob(blob, filename);
  return 'downloaded';
}
