import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoGallery({ photos, onUpload, onDelete }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await onUpload(file);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error al subir la foto');
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-darkgray border-2 border-dashed border-gold/30 rounded-2xl p-8 text-center hover:border-gold/60 transition-colors">
        <label className="cursor-pointer block">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-3">
            <Upload size={32} className="text-gold" />
            <div>
              <p className="font-semibold text-white">
                {uploading ? 'Subiendo...' : 'Sube una foto de progreso'}
              </p>
              <p className="text-sm text-gray-400">
                Haz clic o arrastra una imagen aquí
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Gallery Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">
            No hay fotos de progreso aún. ¡Sube tu primera foto!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group cursor-pointer"
              >
                <img
                  src={photo.url}
                  alt="Progress"
                  onClick={() => setSelectedIndex(index)}
                  className="w-full aspect-square object-cover rounded-lg hover:opacity-75 transition-opacity"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(photo.id);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
                <p className="absolute bottom-2 left-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity truncate">
                  {formatDate(photo.date)}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img
                src={photos[selectedIndex].url}
                alt="Full size"
                className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
              />
              <p className="text-center text-white mt-4 text-sm">
                {formatDate(photos[selectedIndex].date)}
              </p>

              {/* Navigation */}
              <button
                onClick={() =>
                  setSelectedIndex(
                    selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gold/20 hover:bg-gold/40 rounded-lg transition-colors"
              >
                <ChevronLeft size={24} className="text-gold" />
              </button>
              <button
                onClick={() =>
                  setSelectedIndex(
                    selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gold/20 hover:bg-gold/40 rounded-lg transition-colors"
              >
                <ChevronRight size={24} className="text-gold" />
              </button>

              {/* Close */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 p-2 bg-gold/20 hover:bg-gold/40 rounded-lg transition-colors"
              >
                <X size={24} className="text-gold" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
