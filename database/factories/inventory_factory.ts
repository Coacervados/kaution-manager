import factory from '@adonisjs/lucid/factories'
import Inventory from '#models/inventory'

export const InventoryFactory = factory
  .define(Inventory, async ({ faker }) => {
    return {}
  })
  .build()