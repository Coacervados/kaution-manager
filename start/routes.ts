import router from '@adonisjs/core/services/router'
import UserController from '#controllers/users_controller'
import InventoriesController from '#controllers/inventories_controller'

router.post('/users', [UserController, 'create'])
router.get('/users', [UserController, 'getAll'])
router.get('/users/:id', [UserController, 'getById'])
router.put('/users/:id', [UserController, 'update'])
router.delete('/users/:id', [UserController, 'delete'])

router.post('/inventories', [InventoriesController, 'create'])
router.get('/inventories', [InventoriesController, 'getAll'])
router.get('/inventories/user', [InventoriesController, 'findByUserId'])
router.get('/inventories/:id', [InventoriesController, 'getById'])
router.put('/inventories/:id', [InventoriesController, 'update'])
router.delete('/inventories/:id', [InventoriesController, 'delete'])

router.on('/').renderInertia('home')
