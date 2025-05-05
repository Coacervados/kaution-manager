import router from '@adonisjs/core/services/router'
const UserController = () => import('#controllers/users_controller')

router.post('/users', [UserController, 'create'])
router.get('/users', [UserController, 'getAll'])

router.on('/').renderInertia('home')
