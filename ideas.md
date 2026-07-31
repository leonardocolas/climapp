# ClimaYa - Concepto de Diseño

## Enfoque de Diseño Seleccionado: Modern Minimalism con Gradientes Atmosféricos

### Filosofía de Diseño
**Modern Minimalism con Atmósfera Dinámica** — Un diseño limpio y sofisticado que refleja la naturaleza dinámica del clima. Utilizamos gradientes sutiles que evocan diferentes condiciones atmosféricas (cielos despejados, tormentas, atardeceres) para crear una experiencia visual que es tanto funcional como emocionalmente resonante.

### Principios Fundamentales
1. **Claridad Funcional**: Interfaz intuitiva donde la búsqueda y los datos del clima son el protagonista principal
2. **Dinamismo Atmosférico**: Gradientes y colores que cambian según las condiciones climáticas mostradas
3. **Espacios Respirados**: Abundante whitespace que permite que cada elemento respire y sea fácil de procesar
4. **Profundidad Sutil**: Sombras suaves y capas visuales que crean jerarquía sin saturar

### Filosofía de Color
- **Paleta Principal**: Azules y púrpuras que evocan cielos y atmósfera
  - Azul cielo claro: `#0EA5E9` (cielo despejado)
  - Azul profundo: `#1E40AF` (noche, tormentas)
  - Púrpura atardecer: `#A855F7` (transiciones)
  - Blanco puro: `#FFFFFF` (claridad)
  - Gris neutro: `#64748B` (texto secundario)

- **Gradientes Dinámicos**:
  - Cielo despejado: Azul claro → Azul cielo
  - Nublado: Gris → Azul grisáceo
  - Lluvia: Azul oscuro → Púrpura
  - Atardecer: Naranja → Púrpura

### Paradigma de Layout
- **Hero Section Asimétrica**: Búsqueda prominente en la parte superior con gradiente dinámico de fondo
- **Tarjetas Flotantes**: Pronóstico actual en tarjeta grande y central, rodeada de pronóstico de 5 días
- **Flujo Vertical**: Información ordenada de arriba hacia abajo (hoy → próximos días)
- **Asymmetría Controlada**: Elementos no centrados, sino distribuidos con intención

### Elementos Distintivos
1. **Iconografía de Clima Animada**: Iconos que representan condiciones (sol, nubes, lluvia) con animaciones sutiles
2. **Tarjetas de Pronóstico Translúcidas**: Fondo semi-transparente con efecto glassmorphism
3. **Indicadores Visuales de Temperatura**: Barras de color que representan rango de temperatura

### Filosofía de Interacción
- **Búsqueda Instantánea**: Autocompletado mientras escribes
- **Transiciones Suaves**: Cambios de datos con fade-in/fade-out de 300ms
- **Hover Effects Sutiles**: Tarjetas se elevan ligeramente al pasar el mouse
- **Feedback Inmediato**: Carga de datos con spinner elegante

### Animaciones
- **Entrada de Datos**: Fade-in en cascada (30-50ms entre elementos)
- **Hover en Tarjetas**: Elevación de 4px con sombra aumentada (200ms ease-out)
- **Iconos de Clima**: Rotación suave y cambio de escala (2s loop)
- **Transición de Búsqueda**: Sugerencias aparecen con slide-down (150ms)

### Sistema Tipográfico
- **Display Font**: Poppins Bold (títulos principales, temperatura actual)
- **Body Font**: Inter Regular (descripciones, datos secundarios)
- **Hierarchy**:
  - H1: Poppins Bold 48px (nombre de ciudad)
  - H2: Poppins SemiBold 32px (temperatura actual)
  - H3: Inter SemiBold 18px (títulos de tarjetas)
  - Body: Inter Regular 14px (descripciones)
  - Small: Inter Regular 12px (datos secundarios)

### Esencia de Marca
**Posicionamiento**: ClimaYa es tu compañero de clima moderno — información meteorológica global con interfaz que respira como la atmósfera misma.

**Personalidad**: Confiable, Dinámico, Accesible

### Voz de Marca
- **Tono**: Amigable pero profesional, informativo sin ser técnico
- **Ejemplos**:
  - "Busca cualquier ciudad del mundo"
  - "Prepárate para lo que viene"

### Logo & Marca
- **Símbolo**: Círculo con gradiente azul-púrpura que representa un globo/planeta, con una línea ondulante que evoca atmósfera
- **Estilo**: Minimalista, geométrico, moderno
- **Uso**: En header, favicon, y como marca de agua sutil en fondo

### Color de Firma
**Azul Cielo Dinámico** (`#0EA5E9`) — El color principal que representa claridad, confiabilidad y la atmósfera global

---

## Decisiones de Estilo Adicionales

### Componentes UI
- Botones: Redondeados (border-radius: 8px), sin bordes, con fondo sólido o gradiente
- Inputs: Borde sutil, fondo semi-transparente, focus con anillo de color
- Tarjetas: Bordes redondeados (12px), sombra suave, fondo semi-transparente
- Iconos: Lucide React, tamaño 24-32px según contexto

### Responsive Design
- Mobile: Stack vertical, búsqueda full-width, tarjetas en columna única
- Tablet: Dos columnas de pronóstico, búsqueda centrada
- Desktop: Tres columnas de pronóstico, layout asimétrico

### Accesibilidad
- Contraste mínimo AA en todos los textos
- Focus rings visibles en todos los elementos interactivos
- Animaciones respetan `prefers-reduced-motion`
