import type { HttpContext } from '@adonisjs/core/http'
import { CategoryValidator, CategoryUpdateValidator } from '#validators/category'
import Category from '#models/category'

export default class CategoriesController {
  async index({ inertia }: HttpContext) {
    return inertia.render('categories/index')
  }

  /**
   * Render the view to create a new category.
   * 
   * @param {HttpContext} context
   * @param {HttpContext['view']} context.view
   * @returns {Promise<void>}
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('categories/create')
  }

  /**
   * Persist a new category into the database.
   * 
   * @param {HttpContext} context
   * @param {HttpContext['view']} context.view
   * @param {HttpContext['request']} context.request
   * @returns {Promise<void>}
   */
  async store({ inertia, request}: HttpContext){
    const data = request.validateUsing(CategoryValidator)
    await Category.create(data as Partial<Category>)
    return inertia.render('categories/index')
  }

  /**
   * Render the view to edit an existing category.
   * 
   * @param {HttpContext} context
   * @param {HttpContext['view']} context.view
   * @returns {Promise<void>}
   */
  async edit({ inertia }: HttpContext) {
    return inertia.render('categories/edit')
  }

  /**
   * Update an existing category in the database.
   *
   * @param {HttpContext} context
   * @param {HttpContext['view']} context.view
   * @param {HttpContext['request']} context.request
   * @returns {Promise<void>}
   */
  async update({ inertia, request }: HttpContext) {

    const data = request.validateUsing(CategoryUpdateValidator)
    const inventory = await Category.findOrFail(request.param('id'))
    await inventory.merge(data as Partial<Category>).save()
    return inertia.render('categories/index')
  }

}
