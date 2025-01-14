import React from 'react';
import { Button2 } from '../atoms/Button2';
import { AlertTriangle } from 'lucide-react';

interface EndorseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newOwner: string) => Promise<void>;
  pagareId: string;
}

export const EndorseModal: React.FC<EndorseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  pagareId,
}) => {
  const [newOwner, setNewOwner] = React.useState('');
  const [confirmText, setConfirmText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  if (!isOpen) return null;

  const owners = [
    { id: 'FIRA', name: 'FIRA' },
    { id: 'propietario2', name: 'Propietario 2' },
    { id: '041adae6e04383f75d734b6fbcdf21e445ae411d332cfaf5c0b7237a89849277192c8faf53fe79cf05af443aa9d9eddcad44b4ca3950be695121c6f8038e82520a', name: 'ALSOL' }
  ];

  const isConfirmValid = confirmText.toLowerCase() === 'confirmar';
  const canSubmit = newOwner && isConfirmValid && !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    try {
      await onSubmit(newOwner);
      onClose();
    } catch (error) {
      console.error('Error endorsing pagare:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Endosar Pagaré
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            ID del Pagaré: {pagareId}
          </p>
        </div>

        {/* Warning Message */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-yellow-800">
                Acción Importante
              </h4>
              <p className="mt-1 text-sm text-yellow-700">
                Esta acción transferirá la propiedad del pagaré. Esta operación no se puede deshacer.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Owner Selection */}
          <div>
            <label
              htmlFor="newOwner"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Seleccionar Nuevo Propietario
            </label>
            <select
              id="newOwner"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                bg-white text-gray-900"
              required
            >
              <option value="">Seleccione un propietario</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </select>
          </div>

          {/* Confirmation Text */}
          <div>
            <label
              htmlFor="confirmText"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Escriba "confirmar" para proceder
            </label>
            <input
              type="text"
              id="confirmText"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                text-gray-900"
              placeholder="confirmar"
              required
            />
            {confirmText && !isConfirmValid && (
              <p className="mt-1 text-sm text-red-600">
                Por favor escriba "confirmar" exactamente
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button2
              type="button"
              onClick={onClose}
              variant="secondary"
              className="w-24"
            >
              Cancelar
            </Button2>
            <Button2
              type="submit"
              disabled={!canSubmit}
              isLoading={isLoading}
              className="w-24"
            >
              Endosar
            </Button2>
          </div>
        </form>
      </div>
    </div>
  );
};