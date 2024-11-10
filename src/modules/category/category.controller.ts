import { ConflictError, NotFoundError } from "../../helpers/error";
import { CategoryRepository, ICategoryRepository } from "./category.repository";
import { CategoryRequest, CategoryResponse } from "./category.types";

class CategoryController {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  private categoryRepository: ICategoryRepository;

  async create(data: CategoryRequest): Promise<void> {
    const hasCategoryWithName = await this.categoryRepository.findByName(
      data.name
    );

    if (hasCategoryWithName) {
      throw new ConflictError("CATEGORY_NAME_ALREADY_EXISTS");
    }

    await this.categoryRepository.create(data);
  }

  async list(): Promise<CategoryResponse[] | []> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
  
  async remove(id: string): Promise<void> {
    const hasCategoryWithId = await this.categoryRepository.findById(id);

    if (!hasCategoryWithId) {
      throw new NotFoundError("CATEGORY_NOT_FOUND");
    }

    await this.categoryRepository.remove(id);
  }
}
export default CategoryController;
