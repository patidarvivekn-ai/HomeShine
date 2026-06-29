import { Link } from 'react-router-dom';
import { globalContent } from '../data/services';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--deep)' }} className="mt-8">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div
              className="font-extrabold text-lg mb-3 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-display)', color: 'white' }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                H
              </div>
              Home Shine
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>
              Professional deep cleaning for homes and businesses. Verified, trained, trusted.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>
              Services
            </h4>
            <ul className="space-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
              {[
                ['Sofa & Carpet', '/services/sofa-carpet'],
                ['Bathroom & Kitchen', '/services/bathroom-kitchen'],
                ['Full Home', '/services/full-home'],
                ['Commercial', '/services/commercial'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>
              Our Promise
            </h4>
            <ul className="space-y-2">
              {globalContent.promise.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
                  <span>{p.icon}</span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: 'var(--gold)', fontFamily: 'var(--font-display)' }}>
              Contact
            </h4>
            <ul className="space-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
              <li>📞 1234-567-890</li>
              <li>📧 hello@homeshine.in</li>
              <li>🕐 Mon–Sun, 7 AM – 8 PM</li>
            </ul>
          </div>
        </div>
        <div
          className="pt-6 text-xs text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}
        >
          © {new Date().getFullYear()} Home Shine Deep Cleaning. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
