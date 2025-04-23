import express from 'express'
import { AppDataSource } from './DAL/config/db'
import { AppConfig } from './consts'
import { v1Router } from './Core/routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger/swagger'

const app = express()
app.use(express.json())

AppDataSource.initialize().then(() => {
    const port = AppConfig.PORT
    console.log("Connected to database")

    app.use('/api/v1', v1Router)
    app.use("/api/166-karqo/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.listen(port, () => {
        console.log(`Server is running on ${port}`)
    })

}).catch((error) => {
    console.log("Could'nt connect to database")
    console.log(error)
})