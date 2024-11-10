import { db } from "../../database/Client";
import { CategoryRequest, CategoryResponse } from "./category.types";

export interface ICategoryRepository {
  create(data: CategoryRequest): Promise<void>;
  list(): Promise<CategoryResponse[] | []>;
  findByName(name: string): Promise<CategoryResponse | null>;
  findById(id: string): Promise<CategoryResponse | null>;
  remove(id: string): Promise<void>;
}

class CategoryRepository implements ICategoryRepository {
  async create(data: CategoryRequest): Promise<void> {
    await db.category.create({ data });
  }

  async findByName(name: string): Promise<CategoryResponse | null> {
    const category = await db.category.findFirst({ where: { name } });
    return category;
  }
  async findById(id: string): Promise<CategoryResponse | null> {
    const category = await db.category.findUnique({ where: { id } });
    return category;
  }
  async list(): Promise<CategoryResponse[] | []> {
    const categories = await db.category.findMany();
    return categories;
  }
  async remove(id: string): Promise<void> {
    await db.category.delete({ where: { id } });
  }
}
export { CategoryRepository };
