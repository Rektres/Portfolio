# Mateo Araneda Medina — Developer Portfolio

Sitio web personal y portafolio profesional de **Mateo Araneda Medina**, Ingeniero en Informática y Desarrollador Backend Jr.

🌐 **Demo en vivo:** [rektres.github.io/Portfolio](https://rektres.github.io/Portfolio/)

---

## 🚀 Tecnologías Utilizadas

* **Frontend:** HTML5 semántico, JavaScript Vanilla (ES Modules), CSS3.
* **Diseño & Estilos:** [Tailwind CSS](https://tailwindcss.com/) (vía CDN con configuración personalizada de temas y colores).
* **Tipografías:** *Inter* y *JetBrains Mono* (Google Fonts).
* **Backend de Contacto:** Microservicio en Node.js + Express con validación de inputs y rate limiting (`contact-api/`).
* **Despliegue:** GitHub Pages.

---

## ✨ Características Principales

* 🌓 **Modo Oscuro / Claro:** Con persistencia en `localStorage` y script de inicialización inline en `<head>` para evitar parpadeos de carga (*FOUC*).
* 📱 **Diseño 100% Responsivo:** Adaptado para dispositivos móviles, tablets y pantallas de escritorio.
* ⚡ **Sin dependencias pesadas de frameworks:** Construido con JavaScript puro, aprovechando la API nativa de `IntersectionObserver` para:
  * *Scroll spy* dinámico que resalta la sección activa en el menú de navegación.
  * Animaciones suaves de aparición (*reveal on scroll*).
* 📄 **Descarga directa de CV:** Botón con descarga inmediata del currículum actualizado en PDF.
* 📬 **Formulario de Contacto:** Validación en cliente y conexión asíncrona hacia microservicio API.

---

## 📁 Estructura del Proyecto

```text
Portfolio/
├── assets/
│   ├── Araneda_Mateo_CV.pdf       # Currículum actualizado
│   └── FotoPerfil.jpeg            # Fotografía de perfil
├── contact-api/                   # Microservicio para formulario de contacto
│   ├── server.js                  # Servidor Express con rate-limit y CORS
│   ├── Dockerfile
│   └── docker-compose.yml
├── index.html                     # Estructura principal y configuración de Tailwind
├── styles.css                     # Estilos custom (dot-grid, animaciones, scrollbar)
├── main.js                        # Lógica interactiva en Vanilla JS
└── README.md
```

---

## 🛠️ Ejecución Local

Al tratarse de una web estática optimizada para producción, no requiere pasos de compilación:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Rektres/Portfolio.git
   cd Portfolio
   ```

2. Abre directamente `index.html` en tu navegador favorito, o sírvelo con cualquier servidor estático local:
   ```bash
   # Opción con npx
   npx serve .

   # Opción con Python
   python -m http.server 8000
   ```

---

## 📬 Contacto

* **LinkedIn:** [Mateo Araneda](https://www.linkedin.com/in/mateo-a-6388a7219/)
* **GitHub:** [@Rektres](https://github.com/Rektres)
* **Email:** mateo.aramedi@gmail.com
