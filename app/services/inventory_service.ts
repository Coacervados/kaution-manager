import Inventory from "#models/inventory";
import { inject } from "@adonisjs/core";

interface InventoryInput {
  name: string;
  description: string;
  quantity: number;
}

export class InventoryService {

  @inject()
  async create(data: InventoryInput) {
    return Inventory.create(data);
  }

  @inject()
  async findAll() {
    return Inventory.all();
  }

  @inject()
  async findById(id: number) {
    return Inventory.find(id);
  }

  @inject()
  async findByUserId(userId: number) {
    return Inventory.query().where('user_id', userId);
  }

  @inject()
  async update(id: number, data: InventoryInput) {
    const inventory = await Inventory.find(id);

    return inventory?.merge(data).save();
  }

  @inject()
  async delete(id: number) {
    const inventory = await Inventory.find(id);

    return inventory?.delete();
  }

}