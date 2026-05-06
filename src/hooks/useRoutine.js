import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getRoutine, updateRoutine } from '../db';

export const useRoutine = () => {
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoutine();
  }, []);

  const loadRoutine = async () => {
    try {
      const data = await getRoutine();
      setRoutine(data);
    } catch (error) {
      console.error('Error loading routine:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDayName = async (dayId, newName) => {
    if (!routine) return;
    const updated = {
      ...routine,
      days: routine.days.map(day =>
        day.id === dayId ? { ...day, name: newName } : day
      ),
    };
    await updateRoutine(updated);
    setRoutine(updated);
  };

  const addExercise = async (dayId, exercise) => {
    if (!routine) return;
    const updated = {
      ...routine,
      days: routine.days.map(day =>
        day.id === dayId
          ? {
              ...day,
              exercises: [
                ...day.exercises,
                {
                  id: uuidv4(),
                  name: exercise.name,
                  sets: exercise.sets || [],
                  createdAt: new Date(),
                },
              ],
            }
          : day
      ),
    };
    await updateRoutine(updated);
    setRoutine(updated);
  };

  const updateExercise = async (dayId, exerciseId, updatedExercise) => {
    if (!routine) return;
    const updated = {
      ...routine,
      days: routine.days.map(day =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.map(ex =>
                ex.id === exerciseId ? { ...ex, ...updatedExercise } : ex
              ),
            }
          : day
      ),
    };
    await updateRoutine(updated);
    setRoutine(updated);
  };

  const deleteExercise = async (dayId, exerciseId) => {
    if (!routine) return;
    const updated = {
      ...routine,
      days: routine.days.map(day =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.filter(ex => ex.id !== exerciseId),
            }
          : day
      ),
    };
    await updateRoutine(updated);
    setRoutine(updated);
  };

  const addSet = async (dayId, exerciseId, set) => {
    if (!routine) return;
    const updated = {
      ...routine,
      days: routine.days.map(day =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.map(ex =>
                ex.id === exerciseId
                  ? { ...ex, sets: [...ex.sets, set] }
                  : ex
              ),
            }
          : day
      ),
    };
    await updateRoutine(updated);
    setRoutine(updated);
  };

  const deleteSet = async (dayId, exerciseId, setIndex) => {
    if (!routine) return;
    const updated = {
      ...routine,
      days: routine.days.map(day =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.map(ex =>
                ex.id === exerciseId
                  ? { ...ex, sets: ex.sets.filter((_, i) => i !== setIndex) }
                  : ex
              ),
            }
          : day
      ),
    };
    await updateRoutine(updated);
    setRoutine(updated);
  };

  const toggleSetCompletion = async (dayId, exerciseId, setIndex) => {
    if (!routine) return;
    const updated = {
      ...routine,
      days: routine.days.map(day =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.map(ex =>
                ex.id === exerciseId
                  ? {
                      ...ex,
                      sets: ex.sets.map((s, i) =>
                        i === setIndex ? { ...s, completed: !s.completed } : s
                      ),
                    }
                  : ex
              ),
            }
          : day
      ),
    };
    await updateRoutine(updated);
    setRoutine(updated);
  };

  return {
    routine,
    loading,
    updateDayName,
    addExercise,
    updateExercise,
    deleteExercise,
    addSet,
    deleteSet,
    toggleSetCompletion,
  };
};
