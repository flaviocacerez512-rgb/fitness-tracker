import Dexie from 'dexie';

export const db = new Dexie('FitnessAppDB');

db.version(1).stores({
  routines: '++id, createdAt',
  exercises: '++id, routineId',
  photos: '++id, createdAt',
});

export const initDB = async () => {
  try {
    // Crear rutina por defecto si no existe
    const count = await db.routines.count();
    if (count === 0) {
      await db.routines.add({
        name: 'Mi Rutina',
        days: [
          { id: '1', name: 'Lunes', exercises: [] },
          { id: '2', name: 'Martes', exercises: [] },
          { id: '3', name: 'Miércoles', exercises: [] },
          { id: '4', name: 'Jueves', exercises: [] },
          { id: '5', name: 'Viernes', exercises: [] },
          { id: '6', name: 'Sábado', exercises: [] },
          { id: '7', name: 'Domingo', exercises: [] },
        ],
        createdAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Error initializing DB:', error);
  }
};

export const getRoutine = async () => {
  const routine = await db.routines.toCollection().first();
  return routine || null;
};

export const updateRoutine = async (routine) => {
  await db.routines.update(routine.id, routine);
};

export const addPhoto = async (photo) => {
  return await db.photos.add(photo);
};

export const getPhotos = async () => {
  return await db.photos.orderBy('createdAt').reverse().toArray();
};

export const deletePhoto = async (id) => {
  await db.photos.delete(id);
};
