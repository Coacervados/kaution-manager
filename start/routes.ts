/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const InventoriesController = () => import('#controllers/inventories_controller')

router.on('/').renderInertia('home')

router.get('/inventories', [InventoriesController, 'index'])
router.get('/inventories/:id', 'InventoriesController.show')
router.get('/inventories/:id/edit', 'InventoriesController.edit')
router.put('/inventories/:id', 'InventoriesController.update')
router.post('/inventories', 'InventoriesController.store')
router.delete('/inventories/:id', 'InventoriesController.destroy')

