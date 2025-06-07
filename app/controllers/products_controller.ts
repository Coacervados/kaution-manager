import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { ProductValidator, ProductUpdateValidator } from '#validators/product'

export default class ProductsController {
  /**
   * List all products.
   *
   * @param {HttpContext} context
   * @param {View} context.view
   * @returns {Promise<void>}
   */
  async index({ inertia }: HttpContext) {
    const products = await Product.all()
    return inertia.render('product/index', { products })
  }

  /**
   * Render the view to create a new product.
   *
   * @param {HttpContext} context
   * @param {View} context.view
   * @returns {Promise<void>}
   */

  async create({ inertia }: HttpContext) {
    return inertia.render('product/create')
  }

  /**
   * Persist a new product into the database.
   *
   * @param {HttpContext} context
   * @param {HttpContext['view']} context.view
   * @param {HttpContext['request']} context.request
   * @returns {Promise<void>}
   */
  async store({ inertia, request }: HttpContext) {
    const data = request.validateUsing(ProductValidator)
    await Product.create(data as Partial<Product>)
    return inertia.render('products/index')
  }

  /**
   * Render the view to edit an existing product.
   *
   * @param {HttpContext} context
   * @param {View} context.view
   * @returns {Promise<void>}
   */
  async edit({ inertia }: HttpContext) {
    return inertia.render('products/edit')
  }

  /**
   * Update an existing product into the database.
   *
   * @param {HttpContext} context
   * @param {HttpContext['view']} context.view
   * @param {HttpContext['request']} context.request
   * @returns {Promise<void>}
   */
  async update({ inertia, request }: HttpContext) {
    const data = request.validateUsing(ProductUpdateValidator)
    const product = await Product.findOrFail(request.param('id'))
    await product.merge(data as Partial<Product>).save()
    return inertia.render('inventories/index')
  }

  async destroy({}) {}
}
