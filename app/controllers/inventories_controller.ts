import type { HttpContext } from '@adonisjs/core/http'
import Inventory from '#models/inventory'
import { InventoryValidator, InventoryUpdateValidator } from '#validators/inventory'

export default class InventoriesController {
  /**
   * List all inventories.
   *
   * @param {HttpContext} context
   * @param {View} context.view
   * @returns {Promise<void>}
   */
  async index({ inertia }: HttpContext) {
    const inventories = await Inventory.all()
    return inertia.render('inventories/index', { inventories })
  }

  /**
   * Render the view to create a new inventory.
   *
   * @param {HttpContext} context
   * @param {View} context.view
   * @returns {Promise<void>}
   */

  async create({ inertia }: HttpContext) {
    return inertia.render('inventories/create')
  }

  /**
   * Persist a new inventory into the database.
   *
   * @param {HttpContext} context
   * @param {HttpContext['view']} context.view
   * @param {HttpContext['request']} context.request
   * @returns {Promise<void>}
   */
  async store({ inertia, request }: HttpContext) {
    const data = request.validateUsing(InventoryValidator)
    await Inventory.create(data as Partial<Inventory>)
    return inertia.render('inventories/index')
  }

  /**
   * Render the view to edit an existing inventory.
   *
   * @param {HttpContext} context
   * @param {View} context.view
   * @returns {Promise<void>}
   */
  async edit({ inertia }: HttpContext) {
    return inertia.render('inventories/edit')
  }

  /**
   * Update an existing inventory into the database.
   *
   * @param {HttpContext} context
   * @param {HttpContext['view']} context.view
   * @param {HttpContext['request']} context.request
   * @returns {Promise<void>}
   */
  async update({ inertia, request }: HttpContext) {
    const data = request.validateUsing(InventoryUpdateValidator)
    const inventory = await Inventory.findOrFail(request.param('id'))
    await inventory.merge(data as Partial<Inventory>).save()
    return inertia.render('inventories/index')
  }

  async destroy({}) {}
}
