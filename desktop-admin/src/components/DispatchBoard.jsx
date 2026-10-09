import React from 'react';
import { Clock, MapPin, Truck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function DispatchBoard({ properties, onSelectProperty }) {
  // Group properties into Fleet Routes
  const van1Stops = properties.filter(p => p.technician === 'Νίκος Κ.');
  const van2Stops = properties.filter(p => p.technician === 'Γιάννης Π.');
  const unassigned = properties.filter(p => !p.technician || p.technician === 'Χωρίς Ανάθεση');

  const renderStopCard = (prop) => {
    const isDone = prop.status === 'ΟΛΟΚΛΗΡΩΘΗΚΕ';
    const isInProgress = prop.status === 'ΣΕ ΕΞΕΛΙΞΗ';
    const isUrgent = prop.status === 'ΕΠΕΙΓΟΝ';

    return (
      <div
        key={prop.id}
        onClick={() => onSelectProperty(prop)}
        className="bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xs rounded-xl p-4 transition-all cursor-pointer group"
      >
        {/* Card Top: Time and Status */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {prop.scheduledTime}
          </span>
          <span
            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
              isDone
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : isInProgress
                ? 'bg-slate-950 text-white border-slate-950'
                : isUrgent
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {prop.status}
          </span>
        </div>

        {/* Villa & Client */}
        <h4 className="text-sm font-bold text-slate-950 group-hover:underline transition-colors">
          {prop.name}
        </h4>
        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
          <MapPin className="w-3 h-3 text-slate-400" />
          <span>{prop.location}</span>
          <span className="text-slate-300">•</span>
          <span>{prop.customer}</span>
        </p>

        {/* Completion note if done */}
        {isDone && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-800 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Ολοκληρώθηκε {prop.completedAt}</span>
            </span>
            {prop.chemistry && (
              <span className="font-mono text-slate-600">pH {prop.chemistry.ph}</span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
        <div>
          <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Truck className="w-5 h-5 text-slate-800" />
            Ημερήσιος Πίνακας Δρομολογίων
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Επιλέξτε οποιαδήποτε βίλα για να δείτε τεχνικές προδιαγραφές, κωδικούς πύλης και μετρήσεις.
          </p>
        </div>
        <span className="text-xs bg-slate-100 border border-slate-200 text-slate-800 px-3.5 py-1.5 rounded-xl font-bold font-mono">
          Δρομολόγιο Τρίτης
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Column 1: Van #1 */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div>
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">
                Βαν #1 • Νίκος Κ.
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Ακρωτήρι & Αποκόρωνας</span>
            </div>
            <span className="text-xs font-mono font-bold bg-white text-slate-900 px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
              {van1Stops.length} Στάσεις
            </span>
          </div>
          <div className="space-y-3 flex-1">
            {van1Stops.map(renderStopCard)}
          </div>
        </div>

        {/* Column 2: Van #2 */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div>
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">
                Βαν #2 • Γιάννης Π.
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Δυτικά Χανιά</span>
            </div>
            <span className="text-xs font-mono font-bold bg-white text-slate-900 px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
              {van2Stops.length} Στάσεις
            </span>
          </div>
          <div className="space-y-3 flex-1">
            {van2Stops.map(renderStopCard)}
          </div>
        </div>

        {/* Column 3: Urgent / Unassigned */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div>
              <h3 className="text-xs font-black text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Επείγοντα / Χωρίς Ανάθεση
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Εισερχόμενα αιτήματα προτεραιότητας</span>
            </div>
            <span className="text-xs font-mono font-bold bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full border border-red-200">
              {unassigned.length} Αίτημα
            </span>
          </div>
          <div className="space-y-3 flex-1">
            {unassigned.map(renderStopCard)}
          </div>
        </div>

      </div>
    </div>
  );
}
