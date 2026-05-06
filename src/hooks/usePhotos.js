import { useState, useEffect } from 'react';
import { addPhoto, getPhotos, deletePhoto } from '../db';

export const usePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const data = await getPhotos();
      setPhotos(data);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const newPhoto = {
            url: reader.result,
            date: new Date(),
            fileName: file.name,
            createdAt: new Date(),
          };

          const id = await addPhoto(newPhoto);
          const photoWithId = { ...newPhoto, id };
          setPhotos([photoWithId, ...photos]);
          resolve(photoWithId);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };

      reader.readAsDataURL(file);
    });
  };

  const removePhoto = async (id) => {
    try {
      await deletePhoto(id);
      setPhotos(photos.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return {
    photos,
    loading,
    uploadPhoto,
    removePhoto,
  };
};
