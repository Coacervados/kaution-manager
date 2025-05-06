import router from '@adonisjs/core/services/router'
import UserController from '#controllers/users_controller'

router.post('/users', [UserController, 'create'])
router.get('/users', [UserController, 'getAll'])
router.get('/users/:id', [UserController, 'getById'])
router.put('/users/:id', [UserController, 'update'])
router.delete('/users/:id', [UserController, 'delete'])

router.on('/').renderInertia('home')
