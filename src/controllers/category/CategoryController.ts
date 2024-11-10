import {
  CategoryRepository,
  ICategoryRepository,
} from "../../repository/category/CategoryRepository";

class CategoryController {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  private categoryRepository: ICategoryRepository;

  async create(): Promise<void> {}
}
export default CategoryController;
