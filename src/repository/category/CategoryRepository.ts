import { db } from "../../database/Client";
import {
  CategoryRequest,
  CategoryResponse,
} from "../../domain/models/Category";

export interface ICategoryRepository {
  create(data: CategoryRequest): Promise<CategoryResponse>;
  list(): Promise<CategoryResponse[] | []>;
  findByName(name: string): Promise<CategoryResponse | null>;
  findById(id: string): Promise<CategoryResponse | null>;
  remove(id: string): Promise<CategoryResponse>;
}

class CategoryRepository implements ICategoryRepository {
  async create(data: CategoryRequest): Promise<CategoryResponse> {
    const category = await db.category.create({ data });
    return category;
  }

  async findByName(name: string): Promise<CategoryResponse | null> {
    const category = await db.category.findFirst({ where: { name } });
    return category;
  }
  async list(): Promise<CategoryResponse[] | []> {
    const categories = await db.category.findMany();
    return categories;
  }
  async remove(id: string): Promise<CategoryResponse> {
    const category = await db.category.delete({ where: { id } });
    return category;
  }

  async findById(id: string): Promise<CategoryResponse | null> {
    const category = await db.category.findUnique({ where: { id } });
    return category;
  }
}
export { CategoryRepository };
