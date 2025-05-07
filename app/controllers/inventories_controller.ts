/* eslint-disable prettier/prettier */
import type { HttpContext } from '@adonisjs/core/http'
import InventoryService from '#services/inventory_service'
import { inject } from '@adonisjs/core'
import { CreateInventoryValidator, UpdateInventoryValidator } from '#validators/inventory'

export default class InventoriesController {
@inject()
  async create({ request, response, auth }: HttpContext, inventoryService: InventoryService) {
    try{
      const userid = await auth.user?.id
      const data = await request.validateUsing(CreateInventoryValidator)
      const inventory = await inventoryService.create(data)
      return response.created(inventory)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  @inject()
  async getAll({ response }: HttpContext, inventoryService: InventoryService) {
    try{
      const inventories = await inventoryService.findAll()
      return response.ok(inventories)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Error when searching for inventories' })
    }
  }

  @inject()
  async getById({ params, response }: HttpContext, inventoryService: InventoryService) {
    try{
      const inventory = await inventoryService.findById(params.id)
      if (!inventory) {
        return response.notFound({ message: 'Inventory not found' })
      }
      return response.ok(inventory)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Error when searching for inventory' })
    }
  }

  @inject()
  async update({ params, request, response }: HttpContext, inventoryService: InventoryService) {
    try{
      const data = await request.validateUsing(UpdateInventoryValidator)
      return response.ok(await inventoryService.update(params.id, data))
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  @inject()
  async delete({ params, response }: HttpContext, inventoryService: InventoryService) {
    try{
      return response.ok(await inventoryService.delete(params.id))
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }
}

  