import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Seo from '../components/Seo';
import QuotationSheet from '../components/quotation/QuotationSheet';
import '../components/quotation/quotation.css';
import {
  DEFAULT_PACKAGE_ID,
  DEFAULT_PRICE_ROWS,
  SERVICE_TYPES,
  buildServiceText,
  generateQuotationNo,
  todayIsoDate,
} from '../data/quotation';
import {
  downloadBlob,
  generateQuotationPdfBlob,
  shareOrDownloadPdf,
} from '../utils/quotationPdf';

/**
 * Render a PDF-safe (plain-text) clone of the quotation into an offscreen node,
 * generate the PDF from that clone, then tear it down.
 */
async function withPdfClone(props, run) {
  const host = document.createElement('div');
  host.style.cssText =
    'position:fixed;left:-10000px;top:0;width:820px;min-width:820px;pointer-events:none;opacity:0;z-index:-1;';
  document.body.appendChild(host);

  const root = createRoot(host);
  let sheetEl = null;

  await new Promise((resolve) => {
    root.render(
      <QuotationSheet
        {...props}
        pdfMode
        sheetRef={(el) => {
          sheetEl = el;
          if (el) resolve();
        }}
      />,
    );
    requestAnimationFrame(() => {
      if (sheetEl) resolve();
    });
  });

  await new Promise((r) => setTimeout(r, 120));

  try {
    return await run(sheetEl);
  } finally {
    root.unmount();
    host.remove();
  }
}

export default function QuotationPage() {
  const [busy, setBusy] = useState(null);

  const [form, setForm] = useState(() => ({
    customerName: '',
    mobile: '',
    date: todayIsoDate(),
    address: '',
    quotationNo: generateQuotationNo(),
  }));

  const [serviceLevel1, setServiceLevel1] = useState('Full Home Deep Cleaning');
  const [serviceLevel2, setServiceLevel2] = useState('2BHK');
  const [serviceOther, setServiceOther] = useState('');
  const [packageId, setPackageId] = useState(DEFAULT_PACKAGE_ID);
  const [prices, setPrices] = useState(() =>
    DEFAULT_PRICE_ROWS.map((r) => ({ ...r })),
  );

  const serviceText = useMemo(
    () => buildServiceText(serviceLevel1, serviceLevel2, serviceOther),
    [serviceLevel1, serviceLevel2, serviceOther],
  );

  const sheetProps = {
    form,
    onChange: (key, value) => setForm((f) => ({ ...f, [key]: value })),
    serviceLevel1,
    serviceLevel2,
    serviceOther,
    onServiceLevel1: (v) => {
      setServiceLevel1(v);
      const next = SERVICE_TYPES[v] || [];
      setServiceLevel2(next[0] || '');
      setServiceOther('');
      if (v.startsWith('Bungalow')) {
        setPackageId('Villa/Bungalow');
        return;
      }
      const match = next.find((x) => DEFAULT_PRICE_ROWS.some((p) => p.id === x));
      if (match) setPackageId(match);
    },
    onServiceLevel2: (v) => {
      setServiceLevel2(v);
      if (v !== 'Other') setServiceOther('');
      if (DEFAULT_PRICE_ROWS.some((p) => p.id === v)) setPackageId(v);
    },
    onServiceOther: setServiceOther,
    serviceText,
    packageId,
    onSelectPackage: setPackageId,
    prices,
    onPriceChange: (id, field, raw) => {
      setPrices((rows) =>
        rows.map((r) =>
          r.id === id ? { ...r, [field]: raw === '' ? '' : Number(raw) } : r,
        ),
      );
    },
  };

  const makePdf = () =>
    withPdfClone(sheetProps, (el) =>
      generateQuotationPdfBlob(el, form.quotationNo),
    );

  const handleDownload = async () => {
    setBusy('download');
    try {
      const { blob, filename } = await makePdf();
      downloadBlob(blob, filename);
    } catch (err) {
      console.error(err);
      window.alert('Could not generate PDF. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  const handleShare = async () => {
    setBusy('share');
    try {
      const { blob, filename } = await makePdf();
      await shareOrDownloadPdf(blob, filename);
    } catch (err) {
      console.error(err);
      window.alert('Could not share PDF. Please try Download instead.');
    } finally {
      setBusy(null);
    }
  };

  const toolbarActions = (
    <>
      <button
        type="button"
        className="btn btn-ghost"
        disabled={!!busy}
        onClick={handleShare}
      >
        {busy === 'share' ? 'Sharing…' : '📤 Share'}
      </button>
      <button
        type="button"
        className="btn btn-print"
        disabled={!!busy}
        onClick={handleDownload}
      >
        {busy === 'download' ? 'Generating…' : '📄 Download PDF'}
      </button>
    </>
  );

  return (
    <>
      <Seo
        title="Operational Quotation / Work Order"
        description="Generate a Home Shine operational quotation and download as A4 PDF."
        path="/quotation"
        noIndex
      />
      <QuotationSheet
        pdfMode={false}
        toolbarActions={toolbarActions}
        {...sheetProps}
      />
    </>
  );
}
