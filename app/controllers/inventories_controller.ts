import type { HttpContext } from '@adonisjs/core/http'
import Inventory from '#models/inventory'
import { inventoryValidator } from '#validators/inventory'

export default class InventoriesController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const inventories = await Inventory.all()
    return view.render('inventories/index', { inventories })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('inventories/create', {})
  }

  /**
   * Handle form submission for the create action
   */
  async store({ response, request }: HttpContext) {
    const data = await request.validateUsing(inventoryValidator)
    await Inventory.create(data)
    return response.redirect('inventories/index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    await Inventory.findOrFail(params.id)
    return view.render('inventories/show', {})
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const inventory = await Inventory.findOrFail(params.id)
    await inventory.delete()
  }
}