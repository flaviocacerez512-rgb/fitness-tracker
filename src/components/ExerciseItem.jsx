import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function ExerciseItem({
  exercise,
  dayId,
  onDelete,
  onAddSet,
  onDeleteSet,
  onToggleSetCompletion,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSetForm, setShowSetForm] = useState(false);
  const [newSet, setNewSet] = useState({ reps: 10, weight: 0 });

  const completedSets = exercise.sets.filter(s => s.completed).length;

  const handleAddSet = async () => {
    if (newSet.reps > 0) {
      await onAddSet(dayId, exercise.id, { ...newSet, completed: false });
      setNewSet({ reps: 10, weight: 0 });
      setShowSetForm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="bg-dark border border-gold/10 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gold/5 transition-colors"
      >
        <div className="flex-1 text-left">
          <h4 className="font-medium text-white">{exercise.name}</h4>
          <p className="text-xs text-gray-400">
            {completedSets}/{exercise.sets.length} series completadas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(dayId, exercise.id);
            }}
            className="p-1 hover:bg-red-500/10 rounded text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <ChevronDown
            size={16}
            className={`text-gold transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Sets List */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gold/10 px-4 py-3 bg-dark/50 space-y-2"
        >
          {exercise.sets.length === 0 ? (
            <p className="text-gray-400 text-sm py-2">No hay series.</p>
          ) : (
            exercise.sets.map((set, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 bg-dark rounded hover:bg-gold/5 transition-colors"
              >
                <button
                  onClick={() => onToggleSetCompletion(dayId, exercise.id, index)}
                  className="flex-shrink-0 transition-colors"
                >
                  {set.completed ? (
                    <CheckCircle2 size={20} className="text-gold" />
                  ) : (
                    <Circle size={20} className="text-gray-500 hover:text-gold" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={`text-sm ${set.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                    {set.reps} reps × {set.weight}kg
                  </p>
                </div>
                <button
                  onClick={() => onDeleteSet(dayId, exercise.id, index)}
                  className="p-1 hover:bg-red-500/10 rounded text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}

          {/* Add Set Form */}
          {showSetForm ? (
            <div className="flex gap-2 pt-2">
              <input
                type="number"
                value={newSet.reps}
                onChange={(e) => setNewSet({ ...newSet, reps: parseInt(e.target.value) || 0 })}
                placeholder="Reps"
                min="1"
                className="flex-1 px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={newSet.weight}
                onChange={(e) => setNewSet({ ...newSet, weight: parseFloat(e.target.value) || 0 })}
                placeholder="Peso"
                step="0.5"
                min="0"
                className="flex-1 px-3 py-2 text-sm"
              />
              <button
                onClick={handleAddSet}
                className="px-3 py-2 bg-gold text-dark rounded text-sm font-medium hover:bg-gold/90 transition-colors"
              >
                OK
              </button>
              <button
                onClick={() => setShowSetForm(false)}
                className="px-3 py-2 bg-dark border border-gold/20 rounded text-sm hover:bg-dark/80 transition-colors"
              >
                X
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSetForm(true)}
              className="w-full py-2 text-sm text-gold hover:text-gold/80 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={14} />
              Agregar serie
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
