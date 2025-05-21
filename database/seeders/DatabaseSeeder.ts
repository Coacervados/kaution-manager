/* eslint-disable prettier/prettier */
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Inventory from '#models/inventory'
import Category from '#models/category'
import Product from '#models/product'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    // Create sample inventories
    const inventories = await Inventory.createMany([
      { name: 'Inventory 1', description: 'Description for Inventory 1', userId: 1 },
      { name: 'Inventory 2', description: 'Description for Inventory 2', userId: 1 },
    ])

    // Create sample categories for each inventory
    const categories = await Category.createMany([
      { name: 'Category A', description: 'Description for Category A', inventoryId: inventories[0].id },
      { name: 'Category B', description: 'Description for Category B', inventoryId: inventories[0].id },
      { name: 'Category C', description: 'Description for Category C', inventoryId: inventories[1].id },
    ])

    // Create sample products for each category
    await Product.createMany([
      { name: 'Product 1', description: 'Description for Product 1', quantity: 10, seducCode: 12345, categoryId: categories[0].id },
      { name: 'Product 2', description: 'Description for Product 2', quantity: 5, seducCode: 67890, categoryId: categories[0].id },
      { name: 'Product 3', description: 'Description for Product 3', quantity: 20, seducCode: 11111, categoryId: categories[1].id },
      { name: 'Product 4', description: 'Description for Product 4', quantity: 15, seducCode: 22222, categoryId: categories[2].id },
    ])
  }
}
