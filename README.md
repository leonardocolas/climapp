# ClimaYa

Aplicacion web para consultar el clima actual y el pronostico de siete dias de cualquier ciudad del mundo.

## Funcionalidades

- Busqueda de ciudades con sugerencias y navegacion por teclado.
- Temperatura actual, sensacion termica, humedad, viento y precipitacion.
- Pronostico extendido de siete dias.
- Cambio entre grados Celsius y Fahrenheit.
- Actualizacion manual de los datos.
- Persistencia de la ultima ciudad consultada.
- Interfaz responsive y accesible.

Los datos meteorologicos proceden de [Open-Meteo](https://open-meteo.com/).

## Requisitos

- Node.js 20 o superior.
- Corepack habilitado, incluido con Node.js.

## Instalacion

Desde la raiz del proyecto:

```powershell
corepack enable
corepack pnpm install
```

Si Windows no permite registrar el comando global `pnpm`, usa siempre `corepack pnpm`.

## Desarrollo

```powershell
corepack pnpm climaya
```

La aplicacion estara disponible en `http://localhost:3000`.

Tambien puedes usar el script estandar:

```powershell
corepack pnpm dev
```

## Variables de entorno

Las fotografias atmosfericas opcionales se sirven mediante el proxy de recursos. Para habilitarlas en desarrollo o produccion, define:

```env
STORAGE_API_URL=https://tu-servidor-de-almacenamiento.example
STORAGE_API_KEY=tu-clave
```

El icono y el resto de recursos locales funcionan sin estas variables. No incluyas claves reales en el repositorio.

## Comprobaciones

```powershell
corepack pnpm check
corepack pnpm build
```

El build genera el frontend en `dist/public` y el servidor en `dist/index.js`.

## Produccion

1. Instala las dependencias con `corepack pnpm install --frozen-lockfile`.
2. Ejecuta `corepack pnpm build`.
3. Inicia el servidor con `corepack pnpm start`.

El servidor usa la variable `PORT` si esta definida; de lo contrario utiliza el puerto `3000`.

## Estructura principal

```text
client/         Aplicacion React y recursos publicos
server/         Servidor Express para servir el build
package.json    Scripts y dependencias
vite.config.ts  Configuracion de desarrollo y compilacion
```

## Licencia

MIT
