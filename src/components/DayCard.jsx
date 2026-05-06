import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Plus, Edit2, Trash2 } from 'lucide-react';
import ExerciseForm from './ExerciseForm';
import ExerciseItem from './ExerciseItem';

export default function DayCard({
  day,
  onUpdateDayName,
  onAddExercise,
  onDeleteExercise,
  onAddSet,
  onDeleteSet,
  onToggleSetCompletion,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [dayName, setDayName] = useState(day.name);
  const [showForm, setShowForm] = useState(false);

  const handleSaveName = async () => {
    if (dayName.trim() && dayName !== day.name) {
      await onUpdateDayName(day.id, dayName);
    } else {
      setDayName(day.name);
    }
    setIsEditingName(false);
  };

  const totalSets = day.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const completedSets = day.exercises.reduce(
    (sum, ex) => sum + ex.sets.filter(s => s.completed).length,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-darkgray border border-gold/20 rounded-2xl overflow-hidden hover:border-gold/40 transition-all"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gold/5 transition-colors"
      >
        <div className="flex-1 text-left">
          {isEditingName ? (
            <input
              autoFocus
              value={dayName}
              onChange={(e) => setDayName(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              className="bg-dark border border-gold/30 px-3 py-1 rounded text-white w-full max-w-xs"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">{day.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingName(true);
                }}
                className="p-1 hover:bg-gold/10 rounded transition-colors"
              >
                <Edit2 size={16} className="text-gold" />
              </button>
            </div>
          )}
          <p className="text-sm text-gray-400 mt-1">
            {day.exercises.length} ejercicios • {totalSets} series
            {totalSets > 0 && ` • ${completedSets}/${totalSets} completadas`}
          </p>
        </div>
        <ChevronDown
          size={20}
          className={`text-gold transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gold/20 px-6 py-4 bg-dark/50"
        >
          {/* Exercises List */}
          <div className="space-y-3 mb-4">
            {day.exercises.length === 0 ? (
              <p className="text-gray-400 text-sm py-4">
                No hay ejercicios. Agrega uno para comenzar.
              </p>
            ) : (
              day.exercises.map((exercise) => (
                <ExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  dayId={day.id}
                  onDelete={onDeleteExercise}
                  onAddSet={onAddSet}
                  onDeleteSet={onDeleteSet}
                  onToggleSetCompletion={onToggleSetCompletion}
                />
              ))
            )}
          </div>

          {/* Add Exercise Form */}
          {showForm ? (
            <ExerciseForm
              onSubmit={async (exercise) => {
                await onAddExercise(day.id, exercise);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-2 px-4 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={18} />
              Agregar ejercicio
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
