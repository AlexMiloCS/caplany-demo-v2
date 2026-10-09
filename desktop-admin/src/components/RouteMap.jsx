import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Navigation } from 'lucide-react';

export default function RouteMap({ properties, selectedProperty, onSelectProperty }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on Chania, Crete (between Platanias, Kolymvari, and Akrotiri)
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [35.515, 23.98],
        zoom: 11,
        zoomControl: true,
      });

      // Completely free OpenStreetMap tiles with ZERO watermarks and ZERO API key
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    const getMarkerColor = (status) => {
      switch (status) {
        case 'ΟΛΟΚΛΗΡΩΘΗΚΕ': return '#10b981'; // emerald
        case 'ΣΕ ΕΞΕΛΙΞΗ': return '#2563eb'; // blue
        case 'ΕΠΕΙΓΟΝ': return '#dc2626'; // red
        default: return '#64748b'; // slate
      }
    };

    // Add markers
    properties.forEach((prop) => {
      const color = getMarkerColor(prop.status);
      const isSelected = selectedProperty?.id === prop.id;

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: ${color};
            width: ${isSelected ? '36px' : '28px'};
            height: ${isSelected ? '36px' : '28px'};
            border-radius: 50%;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 11px;
            font-weight: 800;
            transition: all 0.2s ease;
          ">
            ${prop.status === 'ΟΛΟΚΛΗΡΩΘΗΚΕ' ? '✓' : prop.status === 'ΕΠΕΙΓΟΝ' ? '!' : '●'}
          </div>
        `,
        iconSize: [isSelected ? 36 : 28, isSelected ? 36 : 28],
        iconAnchor: [isSelected ? 18 : 14, isSelected ? 18 : 14],
      });

      const marker = L.marker([prop.lat, prop.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectProperty(prop);
      });

      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; padding: 4px; line-height: 1.4;">
          <div style="font-weight: 800; color: #0f172a; font-size: 14px;">${prop.name}</div>
          <div style="color: #64748b; font-size: 11px; margin-bottom: 4px;">${prop.location} • ${prop.customer}</div>
          <div style="display: flex; gap: 6px; align-items: center; margin-top: 6px;">
            <span style="display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; background: ${color}15; color: ${color};">
              ${prop.status}
            </span>
            <span style="color: #334155; font-size: 11px; font-weight: 600;">${prop.scheduledTime}</span>
          </div>
        </div>
      `);

      markersRef.current[prop.id] = marker;
    });

    if (selectedProperty && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([selectedProperty.lat, selectedProperty.lng], 13, { duration: 1 });
      const m = markersRef.current[selectedProperty.id];
      if (m) m.openPopup();
    }
  }, [properties, selectedProperty]);

  return (
    <div className="relative w-full h-full min-h-[580px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
      <div ref={mapContainerRef} className="w-full h-full min-h-[580px]" />
      
      {/* Light Overlay Map Legend */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-200 shadow-md text-xs space-y-1.5 pointer-events-auto">
        <div className="font-bold text-slate-950 mb-1 flex items-center gap-1.5 text-xs">
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          <span>Χάρτης Στόλου Χανίων</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Ολοκληρώθηκε ({properties.filter(p => p.status === 'ΟΛΟΚΛΗΡΩΘΗΚΕ').length})</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <span>Σε Εξέλιξη ({properties.filter(p => p.status === 'ΣΕ ΕΞΕΛΙΞΗ').length})</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
          <span>Προγραμματισμένο ({properties.filter(p => p.status === 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΟ').length})</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          <span>Επείγον ({properties.filter(p => p.status === 'ΕΠΕΙΓΟΝ').length})</span>
        </div>
      </div>
    </div>
  );
}
