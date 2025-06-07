import { InferPageProps } from "@adonisjs/inertia/types"
import InventoriesController from "#controllers/inventories_controller"

export default function InventoriesIndex(props: InferPageProps<InventoriesController, 'index'> ) {
  return (
    <code>{JSON.stringify(props, null, 2)}</code>
  )
}
