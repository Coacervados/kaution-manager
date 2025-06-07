import { InferPageProps } from "@adonisjs/inertia/types"
import CategoriesController from "#controllers/categories_controller"

export default function CategoriesIndex(props: InferPageProps<CategoriesController, 'index'> ) {
  return (
    <code>{JSON.stringify(props, null, 2)}</code>
  )
}
