# 🛒 Canastas Verdes

> Plataforma de comercio electrónico agrícola que conecta productores rurales con consumidores urbanos en la región de Nariño, Colombia.

Desarrollada como proyecto de práctica profesional para la **Fundación Suyusama**, dentro del programa de Ingeniería de Sistemas de la **Universidad CESMAG (UNICESMAG)**.

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Variables de Entorno](#-variables-de-entorno)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Características Principales](#-características-principales)
- [Despliegue](#-despliegue)
- [Autor](#-autor)

---

## 📌 Descripción

**Canastas Verdes** es un e-commerce fullstack que facilita la comercialización de productos agrícolas de comunidades rurales, promoviendo la economía local y el consumo responsable.

La plataforma permite a los productores publicar y gestionar sus productos, mientras que los consumidores pueden explorar el catálogo, filtrar por categoría y realizar pedidos de forma sencilla. Incluye un panel de administración completo para la gestión integral del negocio.

---

## 🛠 Tecnologías

### Backend
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=flat&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-latest-FE0803?style=flat)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql&logoColor=white)

| Tecnología | Versión | Uso |
|---|---|---|
| NestJS | 11 | Framework principal del servidor |
| TypeScript | 5 | Lenguaje de programación |
| TypeORM | latest | ORM para base de datos |
| PostgreSQL | 16 | Base de datos relacional |
| class-validator | latest | Validación de DTOs |
| Passport JWT | latest | Autenticación y autorización |

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat&logo=tailwindcss&logoColor=white)

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 16 | Framework de React con SSR/SSG |
| React | 19 | Librería de interfaz de usuario |
| Zustand | latest | Gestión de estado global |
| Zod | latest | Validación de esquemas y formularios |
| Tailwind CSS | 3 | Estilos utilitarios |
| shadcn/ui | latest | Componentes de UI accesibles |

---

## 🏗 Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────▼─────────────────────────────────────┐
│              FRONTEND — Next.js 16 (Vercel)                     │
│  ┌─────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │  Server Actions  │  │  React Components │  │  Middleware   │  │
│  │  (HTTP-only JWT) │  │  Zustand / Zod    │  │  (Auth Guard) │  │
│  └────────┬────────┘  └──────────────────┘  └───────────────┘  │
└───────────┼─────────────────────────────────────────────────────┘
            │ REST API
┌───────────▼─────────────────────────────────────────────────────┐
│              BACKEND — NestJS 11 (Railway)                      │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────────┐  │
│  │  Controllers │  │   Services    │  │  Guards / Strategies │  │
│  │  (REST API)  │  │  (Logic Layer)│  │  (Passport JWT)      │  │
│  └──────┬───────┘  └───────┬───────┘  └──────────────────────┘  │
│         └──────────────────┘                                    │
│                      TypeORM                                    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                 PostgreSQL 16 (Railway)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
canastas_verdes/
├── BACKEND/                    # Servidor NestJS
│   ├── src/
│   │   ├── auth/               # Módulo de autenticación (JWT + Passport)
│   │   ├── users/              # Gestión de usuarios
│   │   ├── products/           # Catálogo de productos
│   │   ├── categories/         # Categorías de productos
│   │   ├── orders/             # Gestión de pedidos
│   │   └── main.ts             # Entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/                   # Aplicación Next.js
    ├── src/
    │   ├── app/                # App Router (Next.js 16)
    │   │   ├── (public)/       # Rutas públicas
    │   │   ├── admin/          # Panel de administración
    │   │   └── api/            # Route Handlers
    │   ├── components/         # Componentes reutilizables
    │   ├── lib/                # Utilidades y configuraciones
    │   ├── store/              # Estado global (Zustand)
    │   └── schemas/            # Esquemas de validación (Zod)
    ├── .env.example
    └── package.json
```

---

## 🔐 Variables de Entorno

### Backend (`BACKEND/.env`)
```env
# Base de datos
DATABASE_HOST=
DATABASE_PORT=5432
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=7d

# App
PORT=3001
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)
```env
# URL del backend
NEXT_PUBLIC_API_URL=http://localhost:3001

# JWT (solo para SSR)
JWT_SECRET=
```

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js >= 20
- PostgreSQL 16
- npm >= 10

### 1. Clonar el repositorio
```bash
git clone https://github.com/LuisCriollo-98/canastas_verdes.git
cd canastas_verdes
```

### 2. Configurar y levantar el Backend
```bash
cd BACKEND
npm install
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
npm run start:dev
```

El servidor estará disponible en `http://localhost:3001`

### 3. Configurar y levantar el Frontend
```bash
cd ../frontend
npm install
cp .env.example .env.local
# Editar .env.local con la URL del backend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## ✨ Características Principales

### Para consumidores
- 🔍 Exploración de productos con filtrado por categoría
- 🛒 Carrito de compras persistente
- 👤 Registro e inicio de sesión seguro
- 📦 Seguimiento de pedidos

### Para administradores
- 📊 Panel de administración completo
- 🏷️ Gestión de productos y categorías
- 👥 Gestión de usuarios y pedidos
- 🔒 Rutas protegidas con middleware de autenticación

### Técnicas destacadas
- Autenticación con **JWT en cookies HTTP-only** (patrón seguro via Server Actions)
- Protección de rutas admin mediante **middleware de Next.js**
- Validación de datos con **Zod** en frontend y **class-validator** en backend
- Arquitectura modular siguiendo principios de **Clean Architecture**

---

## 👨‍💻 Autor

**Luis Alejandro Criollo Yaqueno**  
Estudiante de Ingeniería de Sistemas — Universidad CESMAG  
Práctica profesional en Fundación Suyusama · Feb–May 2026

[![GitHub](https://img.shields.io/badge/GitHub-LuisCriollo--98-181717?style=flat&logo=github)](https://github.com/LuisCriollo-98)

---

> Proyecto desarrollado en el marco de la práctica profesional supervisada por el docente **Luis Arnoby Escobar Hernández**, UNICESMAG — 2026.
