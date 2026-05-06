# Fitness Tracker - TODO

## ✅ COMPLETADO

### FASE 1: Inicialización
- [x] Crear proyecto React + Vite
- [x] Instalar Tailwind CSS
- [x] Instalar Dexie.js (IndexedDB)
- [x] Instalar Framer Motion
- [x] Instalar Lucide React

### FASE 2: Persistencia
- [x] Configurar IndexedDB con Dexie.js
- [x] Crear esquema de rutinas y fotos
- [x] Implementar funciones de lectura/escritura

### FASE 3: Sistema de Rutinas
- [x] Hook useRoutine para gestionar rutinas
- [x] Componente DayCard para días
- [x] Componente ExerciseForm para crear ejercicios
- [x] Componente ExerciseItem para mostrar ejercicios
- [x] Funcionalidad CRUD completa

### FASE 4: Sistema de Fotos
- [x] Hook usePhotos para gestionar fotos
- [x] Componente PhotoGallery
- [x] Upload de fotos con FileReader
- [x] Visor de pantalla completa (lightbox)
- [x] Navegación entre fotos

### FASE 5: Diseño Premium
- [x] Tema oscuro + dorado
- [x] Tarjetas con bordes redondeados
- [x] Responsive design
- [x] Scrollbar personalizado
- [x] Header y navegación

### FASE 6: Animaciones
- [x] Framer Motion en componentes
- [x] Animaciones de entrada/salida
- [x] Transiciones suaves
- [x] Loading spinner

## 📋 PRÓXIMAS MEJORAS (Opcionales)

- [ ] Exportar rutina a PDF
- [ ] Importar rutina desde archivo
- [ ] Estadísticas de progreso
- [ ] Gráficos de series completadas
- [ ] Modo oscuro/claro toggle
- [ ] Sincronización en la nube (Firebase)
- [ ] App móvil con React Native
- [ ] Notificaciones de entrenamientos
- [ ] Historial de cambios
- [ ] Búsqueda de ejercicios

## 🐛 BUGS CONOCIDOS

- Ninguno reportado

## 📝 NOTAS

- Datos persistidos en IndexedDB
- No requiere servidor backend
- Funciona offline completamente
- Todas las fotos se guardan en base64 (considerar límite de almacenamiento)
