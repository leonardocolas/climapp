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

## Comprobaciones

```powershell
corepack pnpm check
corepack pnpm build
```

El build genera el frontend estatico en `dist/public`.

## Despliegue en Vercel

Vercel debe usar estos valores:

- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Output directory: `dist/public`

El archivo `vercel.json` configura el rewrite necesario para las rutas de la SPA. No se necesitan variables de entorno para el frontend.

El servidor Express de `server/index.ts` se conserva para ejecuciones locales o despliegues Node independientes, pero Vercel usa directamente el frontend estatico.

## Estructura principal

```text
client/         Aplicacion React y recursos publicos
server/         Servidor Express para servir el build
package.json    Scripts y dependencias
vite.config.ts  Configuracion de desarrollo y compilacion
```

## Licencia

MIT
