import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategory';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  const categoryPayload = {
    name,
    description,
  };

  createCategoryService.execute(categoryPayload);

  return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
  const allCategories = categoriesRepository.list();
  return response.status(200).json({ allCategories });
});

export { categoriesRoutes };
