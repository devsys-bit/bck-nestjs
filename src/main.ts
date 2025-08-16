import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ExpressAdapter } from "@nestjs/platform-express"
import * as express from "express"

// Para desarrollo local
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle("Task API")
    .setDescription("API para gestión de tareas con filtros y paginación")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(process.env.PORT ?? 3000)
}

// Para producción en Vercel
let cachedApp: express.Express

async function createNestApp(): Promise<express.Express> {
  if (cachedApp) {
    return cachedApp
  }

  const expressApp = express()
  const adapter = new ExpressAdapter(expressApp)

  const app = await NestFactory.create(AppModule, adapter)

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle("Task API")
    .setDescription("API para gestión de tareas con filtros y paginación")
    .setVersion("1.0")
    .addServer("https://bck-nestjs.vercel.app", "Production")
    .addServer("http://localhost:3000", "Development")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  await app.init()
  cachedApp = expressApp
  return expressApp
}

// Handler para Vercel
export default async (req: any, res: any) => {
  const app = await createNestApp()
  app(req, res)
}

// Solo ejecutar bootstrap en desarrollo
if (process.env.NODE_ENV !== "production") {
  bootstrap()
}
