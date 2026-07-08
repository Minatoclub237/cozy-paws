import { X, Phone, ShieldAlert, Clock, MapPin, AlertCircle, Heart } from "lucide-react";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Dialog container */}
      <div className="bg-white rounded-3xl border-2 border-red-200 max-w-md w-full overflow-hidden shadow-2xl relative z-10 animate-scale-in">
        
        {/* Urgent header banner */}
        <div className="bg-red-600 text-white p-5 relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-1 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded-full">ASSISTANCE 24/7</span>
              <h3 className="text-lg font-black tracking-tight mt-0.5">Urgences Vétérinaires</h3>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5">
          {/* Main prompt */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-950 font-medium leading-relaxed">
              <p className="font-bold mb-1">Votre animal a besoin d'une assistance immédiate ?</p>
              Notre équipe est prête à intervenir. En dehors des horaires d'ouverture, notre clinique collabore avec les meilleurs services de garde de Nice.
            </div>
          </div>

          {/* Quick Call Action */}
          <div className="text-center space-y-2">
            <p className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wider">Ligne d'Urgence Directe</p>
            <a
              href="tel:0493181234"
              className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white w-full py-3.5 rounded-2xl font-black text-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Phone className="w-5 h-5 animate-bounce" />
              <span>04 93 18 12 34</span>
            </a>
            <p className="text-[10px] text-gray-500 italic">
              Appelez toujours avant de vous déplacer afin que nous préparions le matériel de réanimation ou de soin.
            </p>
          </div>

          {/* Protocol card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-black text-[#1a3d1a] uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              Que faire en attendant ?
            </h4>
            <ol className="text-xs text-gray-600 space-y-2.5 font-medium leading-relaxed">
              <li className="flex gap-2">
                <span className="font-extrabold text-red-600 bg-red-50 w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                <span><strong>Restez calme</strong> et parlez d'une voix douce pour ne pas stresser davantage votre compagnon.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-extrabold text-red-600 bg-red-50 w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                <span><strong>Sécurisez-le</strong> dans un endroit calme ou une cage de transport munie d'une couverture chaude.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-extrabold text-red-600 bg-red-50 w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
                <span><strong>Ne lui donnez rien</strong> à manger ou à boire, ni de médicaments humains sans avis vétérinaire préalable.</span>
              </li>
            </ol>
          </div>

          {/* Location and Info */}
          <div className="text-[11px] text-gray-500 flex flex-col gap-2 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span><strong>Adresse :</strong> 8 Av. Antonia Augusta, 06000 Nice</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span><strong>Horaires habituels :</strong> Lun-Ven: 09h-12h, 15h-19h | Sam: 09h-16h</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-500 hover:text-gray-700 py-1.5 px-3 hover:bg-gray-150 rounded-lg transition-colors"
          >
            Fermer la fenêtre
          </button>
        </div>

      </div>
    </div>
  );
}
