import React from 'react';
import { CheckCircle2, DollarSign, AlertTriangle } from 'lucide-react';

export default function MetricsBar({ properties }) {
  const completed = properties.filter(p => p.status === 'ΟΛΟΚΛΗΡΩΘΗΚΕ').length;
  const total = properties.length;
  const progressPercent = Math.round((completed / total) * 100);

  // Calculate total unbilled consumables from tags logged
  const unbilledConsumables = properties.reduce((acc, prop) => {
    const propTagsTotal = prop.tagsUsed.reduce((tagAcc, tag) => {
      return tagAcc + (tag.isBillable ? tag.price : 0);
    }, 0);
    return acc + propTagsTotal;
  }, 0);

  // Urgent count
  const urgentCount = properties.filter(p => p.status === 'ΕΠΕΙΓΟΝ').length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs mb-5 flex flex-wrap items-center justify-between gap-4 text-xs">
      
      {/* 1. Fleet Route Progress */}
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span className="text-slate-500 font-medium">Στόλος Σήμερα:</span>
        <span className="font-black text-slate-950 text-sm">{completed} / {total}</span>
        <span className="text-slate-400 font-medium">({progressPercent}%)</span>
      </div>

      <div className="h-4 w-px bg-slate-200 hidden sm:block" />

      {/* 2. Unbilled Consumables */}
      <div className="flex items-center gap-2.5">
        <DollarSign className="w-4 h-4 text-slate-700 flex-shrink-0" />
        <span className="text-slate-500 font-medium">Ατιμολόγητα Χημικά:</span>
        <span className="font-black text-slate-950 text-sm">€{unbilledConsumables.toFixed(2)}</span>
      </div>

      {/* 3. Urgent Issue if any */}
      {urgentCount > 0 && (
        <>
          <div className="h-4 w-px bg-slate-200 hidden md:block" />
          <div className="flex items-center gap-2 bg-red-50 text-red-800 border border-red-200 px-3 py-1 rounded-lg font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>1 Επείγον: Αγία Μαρίνα</span>
          </div>
        </>
      )}

    </div>
  );
}
