import type { HttpContext } from '@adonisjs/core/http'
import { InventoryService } from '#services/inventory_service'
import { inject } from '@adonisjs/core'

export default class InventoriesController {
    
@inject()
  async index({ response }: HttpContext, inventoryService: InventoryService) {
    try {
      const inventories = await inventoryService.findAll()
      return response.ok(inventories)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Error when searching for inventories' })
    }
  }

  async show({ params, response }: HttpContext, inventoryService: InventoryService) {
    const inventory = await inventoryService.findById(params.id)
    if (!inventory) {
      return response.notFound({ message: 'Inventory not found' })
    }
    return response.ok(inventory)
  }
}
