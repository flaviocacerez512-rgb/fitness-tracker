import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';

export default function ExerciseForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [sets, setSets] = useState([{ reps: 10, weight: 0, completed: false }]);
  const [error, setError] = useState('');

  const handleAddSet = () => {
    setSets([...sets, { reps: 10, weight: 0, completed: false }]);
  };

  const handleRemoveSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const handleSetChange = (index, field, value) => {
    const updated = [...sets];
    updated[index] = { ...updated[index], [field]: value };
    setSets(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('El nombre del ejercicio es requerido');
      return;
    }
    onSubmit({ name, sets });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onSubmit={handleSubmit}
      className="bg-dark border border-gold/20 rounded-lg p-4 space-y-4"
    >
      {/* Exercise Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Nombre del ejercicio
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          placeholder="Ej: Press banca, Sentadilla..."
          className="w-full"
          autoFocus
        />
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>

      {/* Sets */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Series
        </label>
        <div className="space-y-2">
          {sets.map((set, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="text-xs text-gray-400">Reps</label>
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) =>
                    handleSetChange(index, 'reps', parseInt(e.target.value) || 0)
                  }
                  min="1"
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-400">Peso (kg)</label>
                <input
                  type="number"
                  value={set.weight}
                  onChange={(e) =>
                    handleSetChange(index, 'weight', parseFloat(e.target.value) || 0)
                  }
                  step="0.5"
                  min="0"
                  className="w-full"
                />
              </div>
              {sets.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSet(index)}
                  className="p-2 hover:bg-red-500/10 rounded text-red-400 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddSet}
          className="mt-2 text-sm text-gold hover:text-gold/80 flex items-center gap-1 transition-colors"
        >
          <Plus size={16} />
          Agregar serie
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 py-2 px-4 bg-gold text-dark font-semibold rounded-lg hover:bg-gold/90 transition-colors"
        >
          Guardar ejercicio
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 px-4 bg-dark border border-gold/20 text-white rounded-lg hover:bg-dark/80 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </motion.form>
  );
}
