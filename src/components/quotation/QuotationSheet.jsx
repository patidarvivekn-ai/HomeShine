import {
  FIXED,
  PACKAGE_PRESETS,
  formatInr,
  coverageText,
  SERVICE_TYPES,
} from '../../data/quotation';

function FieldValue({ pdfMode, className = 'f', type = 'text', value, onChange, children, ...rest }) {
  if (pdfMode) {
    return <div className="plain">{value || children || '—'}</div>;
  }
  if (type === 'select') {
    return (
      <select className={className} value={value} onChange={onChange} {...rest}>
        {children}
      </select>
    );
  }
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

function Task({ children }) {
  return (
    <div className="task">
      <span className="ck">✓</span>
      {children}
    </div>
  );
}

function Group({ title }) {
  return (
    <div className="cl-group">
      <span className="n">●</span> {title}
    </div>
  );
}

export default function QuotationSheet({
  sheetRef,
  pdfMode = false,
  toolbarActions = null,
  form,
  onChange,
  serviceLevel1,
  serviceLevel2,
  serviceOther,
  onServiceLevel1,
  onServiceLevel2,
  onServiceOther,
  serviceText,
  packageId,
  onSelectPackage,
  prices,
  onPriceChange,
}) {
  const pkg = PACKAGE_PRESETS[packageId] || PACKAGE_PRESETS['2BHK'];
  const rooms = pkg.rooms;
  const selectedPrice = prices.find((p) => p.id === packageId) || prices[0];
  const finalAmt = (Number(selectedPrice?.rate) || 0) - (Number(selectedPrice?.disc) || 0);
  const level2Options = SERVICE_TYPES[serviceLevel1] || [];
  const showOther =
    serviceLevel1 === 'Other' || serviceLevel2 === 'Other';
  const packageCards = Object.values(PACKAGE_PRESETS).filter((p) => p.showCard);

  const set = (key) => (e) => onChange(key, e.target.value);

  return (
    <div className={`quotation-app${pdfMode ? ' is-pdf' : ''}`} ref={sheetRef}>
      {!pdfMode && (
        <div className="toolbar">
          <h1>🧾 Home Shine — Operational Quotation / Work Order</h1>
          <div className="btns">{toolbarActions}</div>
        </div>
      )}

      <div className="sheet">
        <div className="hdr">
          <div className="hdr-top">
            <div className="brand">
              <div className="hs-badge">HS</div>
              <div>
                <h2>{FIXED.companyName}</h2>
                <div className="tag">{FIXED.tagline}</div>
                <div className="tender">
                  <b>Tenders Interested:</b> {FIXED.tender}
                </div>
              </div>
            </div>
            <div className="contact">
              <div className="who">👤 {FIXED.contactPerson} — Contact Person</div>
              📞 <span>{FIXED.phones}</span>
              <br />
              ✉️ <span>{FIXED.email}</span>
              <br />
              📍 <span>{FIXED.locations}</span>
              <br />
              🌐 <span>{FIXED.website}</span>
            </div>
          </div>
          <div className="tabs">
            <span className="tab active">📋 OPERATIONAL QUOTATION / WORK ORDER</span>
            <span className="tab">✓ Trained Staff</span>
            <span className="tab">✓ Diversey Chemicals</span>
            <span className="tab">✓ Final QC Done</span>
          </div>
        </div>

        <div className="body">
          <div className="row">
            <div className="seclabel">
              <span className="dot">✦</span> Customer & Job Details
            </div>
            <div className="qno">
              Q.No: <b>{form.quotationNo || '—'}</b>
            </div>
          </div>

          <div className="grid g4">
            <div>
              <label className="f">Customer Name</label>
              <FieldValue
                pdfMode={pdfMode}
                value={form.customerName}
                onChange={set('customerName')}
              />
            </div>
            <div>
              <label className="f">Mobile Number</label>
              <FieldValue
                pdfMode={pdfMode}
                value={form.mobile}
                onChange={set('mobile')}
              />
            </div>
            <div>
              <label className="f">Date</label>
              <FieldValue
                pdfMode={pdfMode}
                type="date"
                value={form.date}
                onChange={set('date')}
              />
            </div>
            <div>
              <label className="f">Quotation No</label>
              <FieldValue
                pdfMode={pdfMode}
                value={form.quotationNo}
                onChange={set('quotationNo')}
              />
            </div>
          </div>

          <div className="grid g2" style={{ marginTop: 14 }}>
            <div>
              <label className="f">Customer Address</label>
              <FieldValue
                pdfMode={pdfMode}
                value={form.address}
                onChange={set('address')}
              />
            </div>
            <div>
              <label className="f">Service Type</label>
              {pdfMode ? (
                <div className="plain">{serviceText}</div>
              ) : (
                <div className="grid g3" style={{ gap: 8 }}>
                  <select
                    className="f"
                    value={serviceLevel1}
                    onChange={(e) => onServiceLevel1(e.target.value)}
                    aria-label="Service type level 1"
                  >
                    {Object.keys(SERVICE_TYPES).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                  {level2Options.length > 0 && (
                    <select
                      className="f"
                      value={serviceLevel2}
                      onChange={(e) => onServiceLevel2(e.target.value)}
                      aria-label="Service type level 2"
                    >
                      {level2Options.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  )}
                  {showOther && (
                    <input
                      className="f"
                      placeholder="Specify other…"
                      value={serviceOther}
                      onChange={(e) => onServiceOther(e.target.value)}
                      aria-label="Other service type"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="hr" />

          <div className="seclabel">
            <span className="dot">✦</span> Select Package — Full Deep Cleaning Scope
          </div>
          <div className="pkgs">
            {packageCards.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`pkg${packageId === p.id ? ' sel' : ''}`}
                onClick={() => !pdfMode && onSelectPackage(p.id)}
                disabled={pdfMode}
              >
                <div className="pkg-top">
                  <span className="bhk">{p.label}</span>
                  <span className="area">{p.area}</span>
                </div>
                <div className="name">{p.name}</div>
                <div className="meta">
                  <span className="chip"><span className="chip-ico" aria-hidden="true">👥</span><span>{p.staff} Staff</span></span>
                  <span className="chip"><span className="chip-ico" aria-hidden="true">⏱</span><span>{p.hours}</span></span>
                </div>
              </button>
            ))}
          </div>

          <div className="scope-check split">
            <div className="panel">
              <div className="h">Selected Scope</div>
              <div className="scope-title">
                {pkg.name} • {pkg.area}
              </div>
              <div className="mini">
                <div className="box">
                  <div className="k">Team & Time</div>
                  <div className="v">
                    {pkg.staff} Staff • {pkg.hours}
                  </div>
                </div>
                <div className="box">
                  <div className="k">Coverage</div>
                  <div className="v">{coverageText(rooms)}</div>
                </div>
              </div>
              <div className="breakup">
                <div className="lbl">Room Count Breakup</div>
                <div className="li">
                  <span>Living</span>
                  <b>{rooms.living}</b>
                </div>
                <div className="li">
                  <span>Bedroom</span>
                  <b>{rooms.bed}</b>
                </div>
                <div className="li">
                  <span>Kitchen</span>
                  <b>{rooms.kitchen}</b>
                </div>
                <div className="li">
                  <span>Bathroom</span>
                  <b>{rooms.bath}</b>
                </div>
                <div className="li">
                  <span>Balcony</span>
                  <b>{rooms.balcony}</b>
                </div>
              </div>
              <div className="includes">
                <b>Includes</b>
                {FIXED.includes}
              </div>
            </div>

            <div className="checklist">
              <div className="cl-head">
                <span className="t">
                  FULL DEEP CLEANING CHECKLIST — {pkg.label}
                </span>
                <span className="p">✓ Marked tasks = Included</span>
              </div>
              <div className="cl-cols">
                <div className="cl-col">
                  <Group title={`Living Room (${rooms.living})`} />
                  {FIXED.checklistTasks.living.map((t) => (
                    <Task key={t}>{t}</Task>
                  ))}
                  <Group title={`Bedroom(s) (${rooms.bed}) — Each`} />
                  {FIXED.checklistTasks.bedroom.map((t) => (
                    <Task key={t}>{t}</Task>
                  ))}
                </div>
                <div className="cl-col">
                  <Group title={`Kitchen (${rooms.kitchen})`} />
                  {FIXED.checklistTasks.kitchen.map((t) => (
                    <Task key={t}>{t}</Task>
                  ))}
                  <Group title={`Bathroom(s) (${rooms.bath}) — Each`} />
                  {FIXED.checklistTasks.bathroom.map((t) => (
                    <Task key={t}>{t}</Task>
                  ))}
                  <Group title={`Balcony (${rooms.balcony}) — Each`} />
                  {FIXED.checklistTasks.balcony.map((t) => (
                    <Task key={t}>{t}</Task>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hr" />

          <div className="sop-block avoid-break">
            <div className="seclabel">
              <span className="dot">✦</span> Operational Process — 6 Step SOP
            </div>
            <div className="sop">
              {FIXED.sop.map((s) => (
                <div className="step" key={s.n}>
                  <div className="n">{s.n}</div>
                  <div className="t">{s.t}</div>
                  <div className="d">{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hr" />

          <div className="split eq-price" style={{ gridTemplateColumns: '1fr 1.3fr' }}>
            <div>
              <div className="seclabel">
                <span className="dot">✦</span> Equipment & Chemicals Used
              </div>
              <div className="eq">
                <div className="b">
                  <div className="k">Machines</div>
                  <div className="v">{FIXED.equipment.machines}</div>
                </div>
                <div className="b">
                  <div className="k">Tools</div>
                  <div className="v">{FIXED.equipment.tools}</div>
                </div>
                <div className="b" style={{ gridColumn: '1 / 3' }}>
                  <div className="k">Chemicals — Diversey / Taski Certified</div>
                  <div className="v">{FIXED.equipment.chemicals}</div>
                </div>
                <div className="eq-note">
                  <b>Note:</b> {FIXED.equipment.note}
                </div>
              </div>
            </div>

            <div>
              <div className="price avoid-break">
                <div className="price-head">
                  <span className="t">PRICE SHEET — EDITABLE</span>
                  <span className="p">INR — Inclusive of labour & material</span>
                </div>
                <table className="price-table">
                  <thead>
                    <tr>
                      <th className="col-flat">Flat Type</th>
                      <th className="col-area">Area</th>
                      <th className="col-num">Rate (₹)</th>
                      <th className="col-num">Disc (₹)</th>
                      <th className="col-final">Final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((row) => {
                      const meta = PACKAGE_PRESETS[row.id];
                      const final = (Number(row.rate) || 0) - (Number(row.disc) || 0);
                      const siteVisit = !(Number(row.rate) > 0);
                      const selected = row.id === packageId;
                      return (
                        <tr
                          key={row.id}
                          className={`price-row${selected ? ' sel' : ''}`}
                          onClick={() => !pdfMode && onSelectPackage(row.id)}
                        >
                          <td className="col-flat">
                            <div className="flat-cell">
                              <span className="ftype">{meta.label}</span>
                              {selected && <span className="selbadge">SELECTED</span>}
                            </div>
                          </td>
                          <td className="col-area area">{meta.area}</td>
                          <td
                            className="col-num"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {pdfMode ? (
                              <span className="num-plain">{row.rate}</span>
                            ) : (
                              <input
                                className="num"
                                type="number"
                                min="0"
                                value={row.rate}
                                onChange={(e) =>
                                  onPriceChange(row.id, 'rate', e.target.value)
                                }
                              />
                            )}
                          </td>
                          <td
                            className="col-num"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {pdfMode ? (
                              <span className="num-plain">{row.disc}</span>
                            ) : (
                              <input
                                className="num"
                                type="number"
                                min="0"
                                value={row.disc}
                                onChange={(e) =>
                                  onPriceChange(row.id, 'disc', e.target.value)
                                }
                              />
                            )}
                          </td>
                          <td className="col-final final">
                            {siteVisit ? 'Site visit' : formatInr(final)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="price-foot">
                  <span className="ok">✓ No hidden charges</span>
                  <span className="ok">✓ Material included</span>
                  <span className="ok">✓ 1-day service</span>
                </div>
                <div className="price-note">Final amount editable before print</div>
              </div>
            </div>
          </div>

          <div className="hr" />

          <div className="split terms-pay" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="panel">
              <div className="seclabel" style={{ marginBottom: 10 }}>
                <span className="dot">✦</span> Terms & Conditions
              </div>
              <ul className="tlist">
                {FIXED.terms.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <div className="seclabel" style={{ marginBottom: 10 }}>
                <span className="dot">✦</span> Payment Terms & Warranty
              </div>
              <ul className="tlist">
                {FIXED.payment.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="paybox">
                <div className="total">
                  <div className="k">Total Payable for {pkg.label}</div>
                  <div className="v">
                    {Number(selectedPrice?.rate) > 0 ? formatInr(finalAmt) : 'Site visit'}
                  </div>
                  <div className="s">
                    {Number(selectedPrice?.rate) > 0
                      ? `Rate ₹${Number(selectedPrice?.rate) || 0} − Disc ₹${Number(selectedPrice?.disc) || 0}`
                      : 'Quote after site inspection'}
                  </div>
                </div>
                <div className="next">
                  <div className="k">Next Steps</div>
                  <div className="v">{FIXED.nextSteps}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom avoid-break">
            <div className="accept">
              <div className="h">Customer Acceptance</div>
              <div className="sig-block">
                <div className="sigrow">
                  <div>
                    <div className="sigline">Customer Signature</div>
                    <div className="sigval">
                      {form.customerName || '—'} • {form.mobile || '—'}
                    </div>
                  </div>
                  <div>
                    <div className="sigline">Date & Time</div>
                    <div className="sigval">{form.date || '—'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accept">
              <div className="h">For {FIXED.companyName}</div>
              <div className="sig-block">
                <div className="sigline">Supervisor Sign & Stamp</div>
                <div className="sigval">
                  {FIXED.contactPerson} • 8000384001
                </div>
              </div>
            </div>
            <div className="contactbox">
              <div className="h">Contact for Booking</div>
              <div className="contactbox-body">
                <div className="num">{FIXED.phonesShort}</div>
                <div className="l">
                  {FIXED.email}
                  <br />
                  {FIXED.locationsLong}
                  <br />
                  {FIXED.website}
                </div>
                <span className="gst">GST Invoice Available on Request</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
