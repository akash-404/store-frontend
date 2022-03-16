import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';

import productRoutes from './handlers/product';
import orderRoutes from './handlers/order';
import userRoutes from './handlers/user';
import cartRoutes from './handlers/cart';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRoutes(app)
orderRoutes(app)
userRoutes(app)
cartRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;