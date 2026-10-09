import React, { useState } from 'react';
import { Search, Shield, Key, ArrowUpRight } from 'lucide-react';

export default function PropertyDirectory({ properties, onSelectProperty }) {
  const [search, setSearch] = useState('');

  const filtered = properties.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.customer.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-800" />
            Ευρετήριο Ακινήτων & Εξοπλισμού
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Βάση δεδομένων: όγκος πισίνας, προδιαγραφές αντλίας, φίλτρα και κωδικοί πρόσβασης.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Αναζήτηση βίλας, πελάτη, περιοχής..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((prop) => (
          <div
            key={prop.id}
            onClick={() => onSelectProperty(prop)}
            className="bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xs rounded-xl p-4 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-950 group-hover:underline transition-colors">
                    {prop.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{prop.customer}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>

              <div className="text-xs text-slate-500 mb-3 flex items-center gap-1 font-medium">
                <span>📍 {prop.location}</span>
              </div>

              {/* Pool Quick Specs */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 space-y-1 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500 font-medium">Όγκος:</span>
                  <span className="font-bold text-slate-950">{prop.poolSpecs.volume}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500 font-medium">Σύστημα:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[150px]">{prop.poolSpecs.system}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500 font-medium">Αντλία:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[150px]">{prop.poolSpecs.pump}</span>
                </div>
              </div>
            </div>

            {/* Gate access peek */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-amber-900 font-mono bg-amber-50/60 px-2 py-1 rounded border border-amber-200/60">
              <span className="flex items-center gap-1 font-bold">
                <Key className="w-3 h-3 text-amber-700" />
                <span>Κωδικός:</span>
              </span>
              <span className="truncate max-w-[150px] text-slate-700 font-medium">{prop.gateCode}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
