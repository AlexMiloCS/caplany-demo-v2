import React from 'react';
import { DollarSign, MessageCircle, Check, AlertCircle, Sparkles } from 'lucide-react';

export default function ConsumablesLedger({ properties, onSelectProperty }) {
  const handleSendWhatsApp = (prop) => {
    const consumablesTotal = prop.tagsUsed.reduce((sum, t) => sum + (t.isBillable ? t.price : 0), 0);
    const grandTotal = prop.basePlanMonthly + consumablesTotal;

    const tagsList = prop.tagsUsed.filter(t => t.isBillable).map(t => `• ${t.name} (€${t.price})`).join('\n');

    const message = encodeURIComponent(
      `🏊 *CAPLANY POOL SERVICES — ΜΗΝΙΑΙΑ ΕΝΗΜΕΡΩΣΗ*\n` +
      `📍 Ακίνητο: ${prop.name} (${prop.customer})\n` +
      `📅 Περίοδος: Ιούλιος 2026\n\n` +
      `🔹 Βασική Μηνιαία Συντήρηση: €${prop.basePlanMonthly}.00\n` +
      (tagsList ? `🔹 Έξτρα Υλικά / Χημικά Πεδίου:\n${tagsList}\n` : `🔹 Έξτρα Υλικά: Κανένα\n`) +
      `💰 *Συνολικό Ποσό Οφειλής: €${grandTotal}.00*\n\n` +
      `Εξόφληση μέσω IRIS ή Τραπεζικής Κατάθεσης.\n` +
      `Σας ευχαριστούμε για την προτίμηση στη Caplany!`
    );

    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-slate-800" />
            Χρεώσεις
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Πραγματική καταγραφή χρεώσεων: βασικό μηνιαίο πακέτο + επιτόπια αναλώσιμα από τους τεχνικούς.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-xl text-slate-800 font-bold">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Μηδέν ξεχασμένες χρεώσεις χημικών</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
              <th className="py-3 px-4">Βίλα & Πελάτης</th>
              <th className="py-3 px-4">Βασικό Πακέτο</th>
              <th className="py-3 px-4">Αναλώσιμα Πεδίου (Έξτρα)</th>
              <th className="py-3 px-4">Σύνολο Έξτρα</th>
              <th className="py-3 px-4">Σύνολο Μήνα</th>
              <th className="py-3 px-4">Κατάσταση</th>
              <th className="py-3 px-4 text-right">Ενέργεια</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties.map((prop) => {
              const consumablesTotal = prop.tagsUsed.reduce((sum, t) => sum + (t.isBillable ? t.price : 0), 0);
              const grandTotal = prop.basePlanMonthly + consumablesTotal;

              return (
                <tr
                  key={prop.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => onSelectProperty(prop)}
                >
                  {/* Property Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-950 group-hover:underline transition-colors">
                      {prop.name}
                    </div>
                    <div className="text-slate-500 text-[11px] font-medium">{prop.customer} • {prop.location}</div>
                  </td>

                  {/* Base Monthly */}
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    €{prop.basePlanMonthly}.00
                  </td>

                  {/* Logged Tags */}
                  <td className="py-3.5 px-4">
                    {prop.tagsUsed.length === 0 ? (
                      <span className="text-slate-400 italic">Χωρίς έξτρα χρεώσεις</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {prop.tagsUsed.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                              tag.isBillable
                                ? 'bg-amber-50 text-amber-900 border-amber-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {tag.name} {tag.isBillable ? `(+€${tag.price})` : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Extra Consumables Amount */}
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {consumablesTotal > 0 ? `+€${consumablesTotal.toFixed(2)}` : '€0.00'}
                  </td>

                  {/* Grand Total */}
                  <td className="py-3.5 px-4 font-black text-slate-950 text-sm">
                    €{grandTotal.toFixed(2)}
                  </td>

                  {/* Payment Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        prop.paymentStatus === 'ΠΛΗΡΩΘΗΚΕ'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : prop.paymentStatus === 'ΛΗΞΙΠΡΟΘΕΣΜΟ'
                          ? 'bg-red-50 text-red-800 border-red-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {prop.paymentStatus === 'ΠΛΗΡΩΘΗΚΕ' && <Check className="w-3 h-3" />}
                      {prop.paymentStatus === 'ΛΗΞΙΠΡΟΘΕΣΜΟ' && <AlertCircle className="w-3 h-3" />}
                      {prop.paymentStatus}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleSendWhatsApp(prop)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all font-bold shadow-xs"
                      title="Αποστολή αναλυτικού λογαριασμού μέσω WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-white" />
                      <span>WhatsApp Bill</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
