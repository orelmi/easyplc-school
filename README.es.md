# EasyPLC School

Plataforma de aprendizaje de código abierto para automatización industrial y controladores lógicos programables (PLC).

> **Proyecto de código abierto**: ¡Este proyecto está abierto a contribuciones! Ya sea que seas desarrollador, profesor de automatización o profesional de la industria, tus contribuciones son bienvenidas para enriquecer el contenido educativo y mejorar la plataforma.

**Idiomas:** [English](README.md) | [Français](README.fr.md) | Español

## Tabla de Contenidos

- [Capturas de pantalla](#capturas-de-pantalla)
- [Funcionalidades](#funcionalidades)
- [Inicio rápido](#inicio-rápido)
- [Documentación](#documentación)
- [Cuenta demo](#cuenta-demo)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Capturas de pantalla

### Vista general
![Vista general de la aplicación](public/overview.png)

### Módulo de aprendizaje
![Ejemplo de un módulo](public/module1.png)

### Rutas de aprendizaje
![Rutas de aprendizaje](public/learning-path.png)

### Simulador G-Code interactivo
![Simulador G-Code](public/gcode-simulator.png)

### Simulador PLC / LADDER
![Simulador PLC](public/plc-simulator.png)

---

## Funcionalidades

### Rutas de aprendizaje

EasyPLC School ofrece cuatro rutas de especialización:

| Ruta | Módulos | Descripción |
|------|---------|-------------|
| 🏭 Automatización industrial | 5 | Bases de PLC, LADDER, GRAFCET |
| 🔧 Mecanizado CNC | 6 | Programación G-Code, sistemas de ejes |
| 🔷 Automatización Siemens | 6 | S7-1500, TIA Portal, bloques de datos |
| ⚡ VFD y Posicionamiento | 9 | Variadores de frecuencia, control de movimiento |

### Simuladores interactivos

- **Simulador PLC / LADDER**: Visualización LADDER en tiempo real con panel E/S
- **Editor GRAFCET**: Creación visual y simulación de diagramas secuenciales
- **Simulador G-Code / CNC**: Visualización 2D/3D de trayectorias de herramienta

### Gamificación

- Puntos XP y sistema de niveles
- Insignias y trofeos
- Clasificación global
- Seguimiento de rachas diarias

---

## Inicio rápido

### Requisitos previos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el proyecto
git clone https://github.com/orelmi/easyplc-school.git
cd easyplc-school

# Instalar dependencias
npm install

# Configurar la base de datos
npx prisma generate
npx prisma db push

# Poblar la base de datos (opcional)
npm run db:seed

# Iniciar la aplicación
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

---

## Documentación

| Documento | Descripción |
|-----------|-------------|
| 📚 [Pedagogía](docs/PEDAGOGY.es.md) | Rutas, módulos, ejercicios, gamificación |
| 🏗️ [Arquitectura](docs/ARCHITECTURE.es.md) | Stack técnico, estructura del proyecto, BDD, API |
| 🚀 [Instalación](docs/INSTALLATION.es.md) | Configuración completa, despliegue |

---

## Cuenta demo

Una cuenta demo se crea automáticamente durante el seed:

| Campo | Valor |
|-------|-------|
| Email | `demo@easyplc.fr` |
| Contraseña | `demo123` |

Esta cuenta ya tiene:
- 255 XP y nivel 2
- 3 lecciones completadas
- 3 recompensas desbloqueadas
- Una racha de 3 días

---

## Stack técnico

### Frontend
- React 18 + TypeScript
- Vite, Tailwind CSS, React Router v6
- Zustand (gestión de estado)
- Three.js (visualización 3D)

### Backend
- Node.js + Express + TypeScript
- Prisma ORM + SQLite
- Autenticación JWT + bcrypt
- Passport (estrategias OAuth)

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia frontend y backend en modo desarrollo |
| `npm run dev:client` | Inicia solo el frontend |
| `npm run dev:server` | Inicia solo el backend |
| `npm run build` | Build de producción |
| `npm run db:seed` | Puebla la DB con datos iniciales |
| `npm run db:studio` | Abre Prisma Studio (GUI DB) |

---

## Contribuir

¡Este proyecto es de código abierto y da la bienvenida a las contribuciones de la comunidad!

### Cómo contribuir

1. **Fork** el proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commitea tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Sube a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Tipos de contribuciones buscadas

- **Contenido educativo**: Nuevos módulos, lecciones, ejercicios
- **Funcionalidades**: Modo examen, modo offline
- **Mejoras UI/UX**: Accesibilidad, diseño responsive, animaciones
- **Documentación**: Tutoriales, guías de uso, traducciones
- **Tests**: Tests unitarios, tests de integración
- **Correcciones**: Bugs, errores de ortografía, optimizaciones

### Enriquecer el contenido educativo

El contenido educativo está organizado en archivos modulares en `prisma/modules/`. Consulta la [documentación pedagógica](docs/PEDAGOGY.es.md) para detalles sobre la estructura de módulos y cómo agregar contenido.

---

## Licencia

MIT - Ver el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con pasión para la formación en automatización industrial.
