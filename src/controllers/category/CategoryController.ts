import {
  CategoryRequest,
  CategoryResponse,
} from "../../domain/models/Category";
import { ConflictError, NotFoundError } from "../../helpers/error";
import {
  CategoryRepository,
  ICategoryRepository,
} from "../../repository/category/CategoryRepository";

class CategoryController {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  private categoryRepository: ICategoryRepository;

  async create(data: CategoryRequest): Promise<CategoryResponse> {
    const hasCategoryWithName = await this.categoryRepository.findByName(
      data.name
    );

    if (hasCategoryWithName) {
      throw new ConflictError("Este nome já está associado a uma categoria ");
    }

    const category = await this.categoryRepository.create(data);

    return category;
  }

  async list(): Promise<CategoryResponse[] | []> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
  async remove(id: string): Promise<CategoryResponse> {
    const hasCategoryWithId = await this.categoryRepository.findById(id);

    if (!hasCategoryWithId) {
      throw new NotFoundError("A categoria não foi encontrada");
    }

    const category = await this.categoryRepository.remove(id);

    return category;
  }
}
export default CategoryController;
