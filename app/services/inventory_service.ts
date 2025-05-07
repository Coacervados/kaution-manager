/* eslint-disable prettier/prettier */
import Inventory from '#models/inventory'
import { ConflictError, DatabaseError, NotFoundErr } from '#exceptions/api_error_exception'

interface InventoryInput {
  name: string;
  description?: string;
}

export default class InventoryService {

  
  async create(data: InventoryInput): Promise<Inventory> {
    try {
      return await Inventory.create(data)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictError('Inventory already exists')
      }
      throw new DatabaseError('Failed to create inventory')
    }
  }

  
  async findAll(): Promise<Inventory[]> {
    try {
      return await Inventory.all()
    } catch (error) {
      if (error instanceof DatabaseError) throw error
      throw new DatabaseError('Error when fetching inventories')
    }
  }

  
  async findById(id: number): Promise<Inventory> {
    try {
      const inventory = await Inventory.find(id)
      if (!inventory) {
        throw new NotFoundErr('Inventory not found')
      }
      return inventory
    } catch (error) {
      if (error instanceof NotFoundErr) throw error
      throw new DatabaseError('Error when fetching inventory')
    }
  }

  
  async findByUserId(userId: number): Promise<Inventory[]> {
    try{
      return await Inventory.query().where('user_id', userId)
    } catch (error) {
      if (error instanceof DatabaseError) throw error
      throw new DatabaseError('Error when fetching inventories by user ID')
    }
  }
  

  
  async update(id: number, data: InventoryInput): Promise<Inventory> {
    try {
      const inventory = await Inventory.find(id)
      if (!inventory) {
        throw new NotFoundErr('Inventory not found')
      }
      inventory.merge(data)
      await inventory.save()
      return inventory
    } catch (error) {
      if (error instanceof NotFoundErr) throw error
      throw new DatabaseError('Error when updating inventory')
    }
  }

  
  async delete(id: number): Promise<void> {
    try{
      const inventory = await Inventory.find(id)
      if (!inventory) {
        throw new NotFoundErr('Inventory not found')
      }
      await inventory.delete()
    } catch (error) {
      if (error instanceof NotFoundErr) throw error
      throw new DatabaseError('Error when deleting inventory')
    }
  }
}