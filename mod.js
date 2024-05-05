import { Hono } from "https://deno.land/x/hono@v3.12.0/mod.ts"
import { serveStatic } from "https://deno.land/x/hono@v3.11.9/middleware.ts"

const app = new Hono()

app.use('/*', serveStatic({ root: './app' }))

Deno.serve(app.fetch)