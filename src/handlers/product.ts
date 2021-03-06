import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { authenticate } from '../middleware/authenticator';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try{
    const products = await store.index();
    res.json(products);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
  
};

const show = async (req: Request, res: Response) => {
  try{
    const product:Product = await store.show(+req.params.id);
    res.json(product);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct:Product = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const delete1 = async (req: Request, res: Response) => {
  try{
    const deleted = await store.delete1(req.params.id);
    res.json(deleted);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showByCategory = async (req: Request, res: Response) => {
  try{
    const product = await store.showByCategory(req.body.category);
    res.json(product);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.get('/products/category', showByCategory);
  app.post('/products', authenticate, create);
  app.delete('/products/:id', authenticate, delete1);
};

export default productRoutes;