import { config } from "../utils/config"
import { createServer } from "../utils/createServer"
import { connectToDB, disconnectFromDB } from "../utils/db"
import { logger } from "../utils/logger"

const signals = ["SIGINT", "SIGTERM", "SIGHUP"] as const

async function gracefullShutdown({
  signal,
  server
}: {
  signal: (typeof signals)[number]
  server: Awaited<ReturnType<typeof createServer>>
}) {
  logger.info(`Got signal ${signal}. Shutting down.`)
  await server.close()
  await disconnectFromDB()
  process.exit(0)
}

async function startServer() {
  const server = await createServer()

  server.listen({
    port: config.PORT,
    host: config.HOST
  })

  await connectToDB()
  logger.info(`App is listening`)

  for (let i = 0; i < signals.length; i++) {
    process.on(signals[i], () => {
      gracefullShutdown({ signal: signals[i], server })
    })
  }
}

startServer()
