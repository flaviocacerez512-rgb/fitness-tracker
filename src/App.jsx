import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Image } from 'lucide-react';
import { initDB } from './db';
import { useRoutine } from './hooks/useRoutine';
import { usePhotos } from './hooks/usePhotos';
import DayCard from './components/DayCard';
import PhotoGallery from './components/PhotoGallery';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('routines');
  const [initialized, setInitialized] = useState(false);
  const {
    routine,
    loading: routineLoading,
    updateDayName,
    addExercise,
    updateExercise,
    deleteExercise,
    addSet,
    deleteSet,
    toggleSetCompletion,
  } = useRoutine();

  const { photos, loading: photosLoading, uploadPhoto, removePhoto } = usePhotos();

  useEffect(() => {
    const init = async () => {
      await initDB();
      setInitialized(true);
    };
    init();
  }, []);

  if (!initialized || routineLoading || photosLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Dumbbell size={40} className="text-gold" />
          </motion.div>
          <p className="text-gold mt-4">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      {/* Header */}
      <header className="bg-darkgray border-b border-gold/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Dumbbell size={32} className="text-gold" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">Fitness Tracker</h1>
                <p className="text-sm text-gray-400">Gestiona tus rutinas y progreso</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-darkgray border-b border-gold/20 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            {[
              { id: 'routines', label: 'Rutinas', icon: Dumbbell },
              { id: 'photos', label: 'Progreso', icon: Image },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 px-2 font-medium flex items-center gap-2 transition-all border-b-2 ${
                  activeTab === id
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'routines' && routine && (
            <motion.div
              key="routines"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Mi Rutina</h2>
                <p className="text-gray-400">
                  Organiza tus entrenamientos por día de la semana
                </p>
              </div>

              <div className="grid gap-4">
                {routine.days.map((day) => (
                  <DayCard
                    key={day.id}
                    day={day}
                    onUpdateDayName={updateDayName}
                    onAddExercise={addExercise}
                    onDeleteExercise={deleteExercise}
                    onAddSet={addSet}
                    onDeleteSet={deleteSet}
                    onToggleSetCompletion={toggleSetCompletion}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Galería de Progreso</h2>
                <p className="text-gray-400">
                  Documenta tu transformación con fotos
                </p>
              </div>

              <PhotoGallery
                photos={photos}
                onUpload={uploadPhoto}
                onDelete={removePhoto}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-darkgray border-t border-gold/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          <p>Fitness Tracker • Todos tus datos se guardan localmente de forma segura</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
