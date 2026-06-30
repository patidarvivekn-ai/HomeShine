/**
 * Reusable form controls built on the shared `.field` design-system classes.
 * All call `onChange(value)` with the raw string value so pages stay declarative.
 * Defined at module scope so React never remounts them mid-typing (focus-safe).
 */

function Label({ label, required, htmlFor }) {
  if (!label) return null;
  return (
    <label htmlFor={htmlFor} className="field-label">
      {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
    </label>
  );
}

let uid = 0;
const nextId = (name) => `f-${name || 'field'}-${++uid}`;

export function TextField({ label, name, value, onChange, error, type = 'text', placeholder, required, maxLength, inputMode }) {
  const id = nextId(name);
  return (
    <div>
      <Label label={label} required={required} htmlFor={id} />
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        aria-invalid={!!error}
        className={`field ${error ? 'is-error' : ''}`}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export function SelectField({ label, name, value, onChange, error, options = [], placeholder = 'Select…', required }) {
  const id = nextId(name);
  return (
    <div>
      <Label label={label} required={required} htmlFor={id} />
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`field ${error ? 'is-error' : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => {
          const o = typeof opt === 'string' ? { value: opt, label: opt } : opt;
          return <option key={o.value} value={o.value}>{o.label}</option>;
        })}
      </select>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export function TextAreaField({ label, name, value, onChange, error, placeholder, rows = 3, required }) {
  const id = nextId(name);
  return (
    <div>
      <Label label={label} required={required} htmlFor={id} />
      <textarea
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        className={`field ${error ? 'is-error' : ''}`}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
