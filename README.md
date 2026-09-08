# 🎁 Amigo Secreto - Challenge Oracle ONE & Alura Latam

> Aplicación web interactiva desarrollada para la gestión y sorteo aleatorio de **Amigo Secreto**, construida desde cero con desarrollo web moderno (HTML5, CSS3, Vanilla JavaScript) dentro del marco de la ruta de formación **Oracle Next Education (ONE) + Alura Latam**.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

---

## 🔗 Demo en Vivo

Puedes acceder y probar la versión desplegada en tiempo real a través de GitHub Pages:
👉 **[Ver Aplicación Web - Amigo Secreto](https://jebareiro.github.io/amigo-secreto-ch-alura/)**

---

## 🚀 Funcionalidades Principales

* **👤 Gestión Dinámica de Participantes:** Registro interactivo de nombres con generación automática de avatares dinámicos basados en iniciales y colores asignados.
* **🛡️ Sistema de Validaciones Robusto:**
  * **Sanitización:** Previene entradas vacías o compuestas únicamente por espacios en blanco (`.trim()`).
  * **Duplicados:** Bloquea nombres duplicados ignorando mayúsculas y minúsculas.
  * **Formatos:** Impide el ingreso de cadenas puramente numéricas.
* **❌ Eliminación de Participantes:** Posibilidad de quitar un nombre específico de la lista antes del sorteo sin reiniciar todo el flujo.
* **🎲 Algoritmo de Sorteo Aleatorio:** Selección justa e imparcial del amigo secreto utilizando el motor de pseudo-aleatoriedad de JavaScript (`Math.random()`), requiriendo un mínimo de 2 participantes.
* **📊 Dashboard de 3 Columnas:** Diseño estructurado tipo panel interactivo con estados dinámicos (pantalla de bienvenida y banner de resultado).
* **🔄 Reinicio de Estado:** Botón de reset para limpiar variables globales, listas del DOM y restaurar la interfaz en un solo clic.
* **📱 Responsive Design:** Adaptación fluida para dispositivos móviles, tablets y monitores de escritorio mediante CSS Grid y Media Queries.

---

## 📸 Evidencia de Ejecución / Demo Visual

*(Guarda las capturas de pantalla de tu aplicación en la raíz del proyecto como `evidencia1.png`, `evidencia2.png`, etc.)*

| Vista Principal (Dashboard) | Registro de Participantes | Sorteo y Resultado |
| :---: | :---: | :---: |
| ![Vista Principal](evidencia1.png) | ![Registro](evidencia2.png) | ![Resultado](evidencia3.png) |

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 Semántico:** Estructura de componentes accesibles y semánticos (`<main>`, `<section>`, `<aside>`, `<header>`, `<footer>`).
* **CSS3 Moderno:**
  * CSS Grid & Flexbox para el layout tricolumnar.
  * Variables CSS (`:root`) para temas de color pastel.
  * Tipografía remota `Plus Jakarta Sans` integrada desde Google Fonts.
* **JavaScript:**
  * Manipulación directa del DOM.
  * Event Listeners (soporte para tecla `Enter`).
  * Manejo de arreglos y métodos de orden/filtrado (`.some()`, `.splice()`, `.push()`).
* **Git & GitHub:** Control de versiones, flujo de trabajo Git y despliegue continuo mediante **GitHub Pages**.

---

## 💻 Ejecución Local

Sigue estos sencillos pasos para clonar y ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio
Abre tu terminal o consola de comandos y ejecuta:
```bash
git clone [https://github.com/Jebareiro/amigo-secreto-ch-alura.git](https://github.com/Jebareiro/amigo-secreto-ch-alura.git)