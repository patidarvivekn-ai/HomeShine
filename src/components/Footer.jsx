import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { globalContent } from '../data/services';

const SERVICE_LINKS = [
  ['Sofa & Carpet', '/services/sofa-carpet'],
  ['Bathroom & Kitchen', '/services/bathroom-kitchen'],
  ['Full Home', '/services/full-home'],
  ['Commercial', '/services/commercial'],
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--deep)' }} className="mt-10">
      <div className="container py-10" style={{ paddingBottom: 'calc(96px + env(safe-area-inset-bottom))' }}>
        {/* CTA band */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl p-5 md:p-6 mb-9"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
        >
          <div>
            <p className="font-extrabold text-lg font-display" style={{ color: 'white' }}>Ready for a spotless space?</p>
            <p className="text-sm mt-0.5 font-body" style={{ color: 'rgba(255,255,255,0.55)' }}>Book in under 2 minutes — pay after the service.</p>
          </div>
          <div className="flex gap-2.5 shrink-0">
            <Link to="/services/sofa-carpet" className="btn btn-primary">Book now <ArrowRight size={15} /></Link>
            <a href="tel:+8000384002" className="btn btn-dark"><Phone size={15} /> Call</a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-extrabold text-lg mb-3 flex items-center gap-2 font-display" style={{ color: 'white' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent)', color: 'white' }}>H</div>
              Home Shine
            </div>
            <p className="text-sm leading-relaxed font-body" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Professional deep cleaning for homes and businesses. Verified, trained, trusted.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-3.5 uppercase tracking-wider font-display c-gold">Services</h4>
            <ul className="space-y-2.5 text-sm font-body" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {SERVICE_LINKS.map(([label, path]) => (
                <li key={path}><Link to={path} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-3.5 uppercase tracking-wider font-display c-gold">Our Promise</h4>
            <ul className="space-y-2.5">
              {globalContent.promise.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-body" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <span className="shrink-0">{p.icon}</span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-3.5 uppercase tracking-wider font-display c-gold">Contact</h4>
            <ul className="space-y-3 text-sm font-body" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <li><a href="tel:+8000384002" className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={14} className="shrink-0" /> 8000384002</a></li>
              <li><a href="mailto:hello@homeshine.in" className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={14} className="shrink-0" /> hello@homeshine.in</a></li>
              <li className="flex items-center gap-2"><Clock size={14} className="shrink-0" /> Mon–Sun, 7 AM – 8 PM</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-xs text-center font-body" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.32)' }}>
          © {new Date().getFullYear()} Home Shine Deep Cleaning. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
