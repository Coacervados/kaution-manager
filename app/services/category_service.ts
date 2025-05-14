import Category from '#models/category'
import { ConflictError, DatabaseError, NotFoundErr } from '#exceptions/api_error_exception'
import { inject } from '@adonisjs/core'

interface CategoryInput {
  name: string
  description?: string
  inventoryId: number
}

export default class CategoriesService {
  @inject()
  async create(CategoryInput: CategoryInput) {
    try {
      return await Category.create(CategoryInput)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictError('Email already exists')
      }
      throw new DatabaseError('Error when creating category')
    }
  }

  @inject()
  async findAll(): Promise<Category[]> {
    try {
      return await Category.all()
    } catch (error) {
      if (error instanceof DatabaseError) throw error
      throw new DatabaseError('Error when fetching categories')
    }
  }

  @inject()
  async findById(id: number): Promise<Category | null> {
    try {
      return await Category.find(id)
    } catch (error) {
      if (error instanceof NotFoundErr) throw error
      throw new DatabaseError('Error when fetching category')
    }
  }

  @inject()
  async update(id: number, data: CategoryInput): Promise<Category> {
    try {
      const category = await Category.find(id)
      if (!category) {
        throw new NotFoundErr('Category not found')
      }
      category.merge(data)
      await category.save()
      return category
    } catch (error) {
      if (error instanceof NotFoundErr) throw error
      throw new DatabaseError('Error when updating category')
    }
  }

  @inject()
  async delete(id: number): Promise<void> {
    try {
      const category = await Category.find(id)
      if (!category) {
        throw new NotFoundErr('Category not found')
      }
      await category.delete()
    } catch (error) {
      if (error instanceof NotFoundErr) throw error
      throw new DatabaseError('Error when deleting category')
    }
  }
}
