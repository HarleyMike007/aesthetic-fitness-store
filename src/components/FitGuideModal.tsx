import React, { useState } from 'react';
import { X, Ruler, ShieldAlert } from 'lucide-react';

interface FitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FitGuideModal: React.FC<FitGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const sizeRows = [
    { size: 'S', chestIn: '36 - 38', chestCm: '91 - 96', waistIn: '28 - 30', waistCm: '71 - 76', profile: '140 - 160 lbs (Calisthenics lean)' },
    { size: 'M', chestIn: '39 - 41', chestCm: '99 - 104', waistIn: '30 - 32', waistCm: '76 - 81', profile: '160 - 180 lbs (Aesthetic standard)' },
    { size: 'L (RECOMMENDED)', chestIn: '42 - 44', chestCm: '106 - 112', waistIn: '32 - 34', waistCm: '81 - 86', profile: '180 - 200 lbs (Hypertrophy build)', highlight: true },
    { size: 'XL', chestIn: '45 - 48', chestCm: '114 - 122', waistIn: '34 - 37', waistCm: '86 - 94', profile: '200 - 225 lbs (Classic bulk)' },
    { size: '2XL', chestIn: '49 - 52', chestCm: '124 - 132', waistIn: '37 - 40', waistCm: '94 - 102', profile: '225+ lbs (Open mass)' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#111115] border border-[#22222B] rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white p-2"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-[#FF2A54] font-mono text-xs uppercase font-bold mb-2">
          <Ruler className="w-4 h-4" />
          <span>ANATOMICAL SIZING FORMULA</span>
        </div>
        <h3 className="text-3xl font-headline tracking-wide text-white">THE V-TAPER FIT MATRIX</h3>
        <p className="text-gray-400 text-xs sm:text-sm mt-1 mb-6">
          Tailored specifically for athletic, wide-shoulder frames. Order true size for tailored athletic drape, or size down for skin-tight competition compression.
        </p>

        {/* Unit Switcher */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#22222B]">
          <span className="text-xs font-mono text-gray-300">MEASUREMENT UNIT:</span>
          <div className="flex bg-[#08080A] p-1 rounded-lg border border-[#22222B] text-xs font-mono">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded transition ${
                unit === 'in' ? 'bg-[#FF2A54] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              INCHES (IN)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded transition ${
                unit === 'cm' ? 'bg-[#FF2A54] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              CENTIMETERS (CM)
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-gray-400 border-b border-[#22222B]">
                <th className="py-3 px-3">SIZE</th>
                <th className="py-3 px-3">CHEST ({unit.toUpperCase()})</th>
                <th className="py-3 px-3">WAIST ({unit.toUpperCase()})</th>
                <th className="py-3 px-3">RECOMMENDED ATHLETE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22222B]/60 text-gray-200">
              {sizeRows.map((row) => (
                <tr key={row.size} className={row.highlight ? 'bg-[#FF2A54]/10' : ''}>
                  <td className="py-3 px-3 font-bold text-[#FF2A54]">{row.size}</td>
                  <td className="py-3 px-3">{unit === 'in' ? row.chestIn : row.chestCm}</td>
                  <td className="py-3 px-3">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                  <td className="py-3 px-3 text-gray-400">{row.profile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Guarantee */}
        <div className="mt-6 p-4 rounded-2xl bg-[#08080A] border border-[#22222B] flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#FF2A54] shrink-0 mt-0.5" />
          <div className="text-xs text-gray-300 leading-relaxed">
            <strong className="text-white block font-sans">100% PERFECT FIT REPLACEMENT GUARANTEE:</strong>
            If your gear does not deliver the exact muscle-enhancing silhouette you anticipated, contact our athlete concierge within 30 days for a free zero-hassle size exchange.
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-[#FF2A54] hover:bg-[#E01B42] text-white font-headline text-xl rounded-xl transition"
        >
          CONFIRM MY MEASUREMENTS
        </button>
      </div>
    </div>
  );
};
