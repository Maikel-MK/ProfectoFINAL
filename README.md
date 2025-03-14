# Residencial Oasis

## Descripción
El Residencial Oasis es una plataforma web diseñada para mejorar la experiencia y comunicación dentro de un residencial. Facilita el registro y manejo de servicios como alquiler de espacios y pagos, proporcionando información relevante a residentes y visitantes.

## Tabla de Contenidos
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Flujo y Funcionamiento](#flujo-y-funcionamiento)
- [Instalación & Configuración](#instalación--configuración)
- [Recursos Útiles](#recursos-útiles)
- [Roadmap](#roadmap)

## Características Principales
- **Gestión de Pagos**: Pago fácil de alquileres y servicios.
- **Comunicación**: Información general para residentes y comunicación directa.
- **Control de Usuarios**: Gestión de roles y acceso a información.
- **Historial de Pagos**: Consulta de pagos realizados.
- **Alquiler de Espacios**: Administración de espacios recreativos.
- **Status**: Administración de los diferentes Status que se registren.

## Tecnologías Utilizadas
- **Frontend**: HTML, Tailwind, JavaScript, Regex, API Fetch.
- **Backend**: MongoDB, Axios, Mongoose, Render.

## Flujo y Funcionamiento
0. **Pagina Principal**: Aquí se muestran las diferentes ventanas principales entre ellas el home donde se ve información general del residencial, los contactos pertinentes, el Registro y el Login.
1. **Registro de Usuarios**: Se registran los usuarios con el correo, clave y nombre para ingresar a la página pero el rol original sería de visitante hasta que el administrador lo cambie.
2. **Definición del Rol (Administrador)**: Se puede cambiar el usuario registrado ya sea el rol.
3. **Manejo de Usuarios (Administrador)**: Se puede editar o eliminar cualquier usuario ya registrado en la página.
4. **Manejo de Alicuotas (Administrador)**: Se muestran dos opciones para manejar los usuarios con alicuotas y sin alicuotas, donde se puede asignar, editar y eliminar alicuotas.
5. **Pagos (Administrador/ Contador/ Residente)**: Se muestra en tarjetas los diferentes pagos a realizar y el historial de los pagos que se realizaron anteriormente.
6. **Opciones de Pago (Administrador/ Contador)**: Se registran los diferentes pagos que se mostrarán y también se pueden manejar los pagos tanto cambiando el monto de los pagos o eliminar los pagos.
7. **Status (Administrador/ Contador)**: Se registran los status de los residentes y los visitantes, se registra el nombre, el rol, los pagos a realizar, y las zonas alquiladas; se divide según el rol y se muestran en las diferentes listas; y en dichas listas se editan y cambia el Status.
8. **Alquiler de Espacios (Administrador/ Visitante)**: Se muestran los diferentes pagos a realizar para alquilar los espacios del Residencial.
9. **Información (Administrador/ Contador)**: Se registran los diferentes informes que constan de un título y su contenido correspondiente que se guardará y mostrará en la lista de información y aquí se puede editar y eliminar dicha información.
10. **Muro de Información (Administrador/ Contador/ Residente)**: Se muestra la información registrada en Información.

## Instalación & Configuración
1. **Clonar del Repositorio**
2. **Instalar Dependencias**: Axios, Mongoose, Cors, Morgan, etc.
3. **Configurar Variables de Entorno** (.env)
4. **Ejecutar Aplicación**: Según configuración en `package.json`, ejecutar con `npm run start` o similar.

## Recursos Útiles
- Documentación de MongoDB
- Documentación Mongoose
- Guía de Tailwind CSS
- Documentación Axios
- Documentación de PayPal
- Guía con npm para buscar guías y referencias de uso

## Roadmap
- **Mejoras Futuras**: Implementación de notificaciones push y mejoras en la interfaz de usuario e incluir alguna API para manejar correos.

## Usuario Admin
**User**: Maikel@mail.com
**Password**: 123Maikel..