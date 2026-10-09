import React from 'react';
import { X, Key, Wrench, Droplets, Phone, MapPin } from 'lucide-react';

export default function PropertyDetailModal({ property, onClose }) {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header with pool photo banner */}
        <div className="relative h-44 w-full bg-slate-100">
          <img
            src={property.photoUrl}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-800 hover:text-black hover:bg-white transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-slate-950 font-extrabold uppercase tracking-wider shadow-xs">
                {property.status}
              </span>
              <span className="text-xs text-white/90 font-medium drop-shadow-xs">
                Τεχνικός: {property.technician}
              </span>
            </div>
            <h2 className="text-xl font-black text-white drop-shadow-sm">{property.name}</h2>
            <p className="text-xs text-white/90 flex items-center gap-1 mt-0.5 drop-shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-white" />
              {property.location}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Gate Access / Security Instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
              <Key className="w-4 h-4 text-amber-700" />
              <span>Κωδικοί Πρόσβασης & Σημειώσεις Ασφαλείας</span>
            </div>
            <p className="text-amber-950 text-xs font-mono font-medium leading-relaxed">
              {property.gateCode}
            </p>
          </div>

          {/* Client Contact */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <div>
              <span className="text-slate-500 block text-[11px] font-medium">Ιδιοκτήτης / Διαχειριστής</span>
              <strong className="text-slate-950 text-sm font-bold">{property.customer}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px] font-medium">Τηλέφωνο Επικοινωνίας</span>
              <a
                href={`tel:${property.phone}`}
                className="text-slate-900 font-mono text-sm font-bold hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                {property.phone}
              </a>
            </div>
          </div>

          {/* Pool Equipment Specs Cheat Sheet */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <h4 className="font-bold text-slate-950 mb-2 flex items-center gap-1.5 text-xs">
              <Wrench className="w-4 h-4 text-slate-700" />
              Τεχνικές Προδιαγραφές Εξοπλισμού Πισίνας
            </h4>
            <div className="grid grid-cols-2 gap-2.5 text-slate-700">
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-medium block">Όγκος Νερού</span>
                <span className="font-bold text-slate-950">{property.poolSpecs.volume}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-medium block">Σύστημα Απολύμανσης</span>
                <span className="font-semibold text-slate-950 truncate block">{property.poolSpecs.system}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-medium block">Μοντέλο Αντλίας</span>
                <span className="font-semibold text-slate-950 truncate block">{property.poolSpecs.pump}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-medium block">Μοντέλο Φίλτρου</span>
                <span className="font-semibold text-slate-950 truncate block">{property.poolSpecs.filter}</span>
              </div>
            </div>
          </div>

          {/* Today's Chemistry & Visit Notes */}
          {property.chemistry && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <h4 className="font-bold text-slate-950 mb-2 flex items-center gap-1.5 text-xs">
                <Droplets className="w-4 h-4 text-emerald-600" />
                Μετρήσεις Χημείας Νερού
              </h4>
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  <span className="text-slate-600 font-mono">Επίπεδο pH:</span>
                  <strong className="text-emerald-700 text-sm font-mono font-bold">{property.chemistry.ph}</strong>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  <span className="text-slate-600 font-mono">Ελεύθερο Χλώριο:</span>
                  <strong className="text-slate-950 text-sm font-mono font-bold">{property.chemistry.chlorine} ppm</strong>
                </div>
              </div>
              <p className="text-slate-600 text-[11px] mt-2 italic font-medium">
                "{property.notes}"
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-black text-white text-xs font-bold transition-colors shadow-xs"
          >
            Κλείσιμο Καρτέλας
          </button>
        </div>

      </div>
    </div>
  );
}
