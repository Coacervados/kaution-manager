import { InferPageProps } from "@adonisjs/inertia/types"
import ProductsController from "#controllers/products_controller"

export default function ProductIndex(props: InferPageProps<ProductsController, 'index'> ) {
  return (
    <code>{JSON.stringify(props, null, 2)}</code>
  )
}
