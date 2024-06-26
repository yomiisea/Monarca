# Proyecto de Vue.js con Spring Boot Backend

Este proyecto es una aplicación web desarrollada utilizando Vue.js para el frontend y Spring Boot para el backend. La aplicación proporciona una interfaz para gestionar tareas, categorías y usuarios. 

## Funcionalidades

- **Login**: Los usuarios pueden autenticarse para acceder a la aplicación.
- **Agregar Tarea**: Permite a los usuarios agregar nuevas tareas asociadas a una categoría.
- **Ver Tareas**: Los usuarios pueden ver todas las tareas que han creado.
- **Calendario de Tareas**: Muestra visualmente las fechas en las que se tienen tareas pendientes.
- **Estados de Tareas**: Las tareas se pueden categorizar según su estado (pendiente, en progreso, completada, etc.) y se pueden actualizar.
- **Sidebar Navegable**: Proporciona una navegación fácil entre las diferentes secciones de la aplicación.

## Tecnologías Utilizadas

- **Vue.js**: Framework de JavaScript para construir interfaces de usuario.
- **Spring Boot**: Framework de Java para desarrollar aplicaciones web.
- **Java**: Lenguaje de programación utilizado para el backend.
- **JSON**: Formato de intercambio de datos utilizado para almacenar y recuperar información.

## Estructura del Proyecto
backend-to-do/
│
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/
    │   │       └── ejemplo/
    │   │           ├── entity/
    │   │           │   └── ...        # Clases de entidad (Usuario, Categoria, Tarea, etc.)
    │   │           ├── utility/
    │   │           │   └── ...        # Clases de utilidad
    │   │           ├── dao/
    │   │           │   └── ...        # Clases de acceso a datos (Data Access Objects)
    │   │           ├── service/
    │   │           │   └── ...        # Clases de servicio
    │   │           ├── api/
    │   │           │   └── ...        # Controladores API REST
    │   │           └── ...
    │   └── resources/
    │       └── ...                    # Archivos de recursos (application.properties, etc.)
    └── test/
        └── ...                        # Pruebas unitarias y de integración

fronted-control-tareas/
│
├── public/                           # Archivos públicos
└── src/                              # Código fuente Vue.js
    ├── assets/                       # Archivos estáticos (imágenes, etc.)
    ├── components/                   # Componentes Vue.js reutilizables
    │   └── ...                       # Componentes individuales
    ├── views/                        # Vistas de la aplicación
    │   └── ...                       # Vistas individuales
    ├── App.vue                       # Componente principal de la aplicación
    └── main.js                       # Punto de entrada de la aplicación Vue.js




,

## Autores

- Jhessika Zarate
- Yomar Guzman#   M o n a r c a 
 
 
