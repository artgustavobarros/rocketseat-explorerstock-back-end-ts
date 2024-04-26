import { FastifyInstance } from 'fastify'
import { registerProduct } from '../controllers/products/create'
import { fetchAllProducts } from '../controllers/products/fetch'
import { verifyJWT } from '../middlewares/verify-jwt'

export const productsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/create', registerProduct)
  app.get('/products', fetchAllProducts)
}
