import Inventory from "#models/inventory";
import { inject } from "@adonisjs/core";

interface InventoryInput {
  name: string;
  description: string;
  quantity: number;
}

export class InventoryService {
  async create(data: InventoryInput) {
    return Inventory.create(data);
  }

  async findAll() {
    return Inventory.all();
  }

  async findById(id: number) {
    return Inventory.find(id);
  }

  async findByUserId(userId: number) {
    return Inventory.query().where('user_id', userId);
  }

  async update(id: number, data: InventoryInput) {
    const inventory = await Inventory.find(id);

    return inventory?.merge(data).save();
  }

  async delete(id: number) {
    const inventory = await Inventory.find(id);

    return inventory?.delete();
  }

}