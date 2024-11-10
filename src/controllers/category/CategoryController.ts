import {
  CategoryRequest,
  CategoryResponse,
} from "../../domain/models/Category";
import { ConflictError } from "../../helpers/error";
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
      throw new ConflictError("Este nome já está associadoa uma categoria ");
    }

    const category = await this.categoryRepository.create(data);

    return category;
  }

  async list(): Promise<CategoryResponse[] | []> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}
export default CategoryController;
