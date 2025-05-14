import { type HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import CategoriesService from '#services/category_service'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'

export default class CategoriesController {
  @inject()
  async index({ response, view, session }: HttpContext, categoriesService: CategoriesService) {
    const categories = await categoriesService.findAll()

    session.flash('sucess', categories)

    return response.ok({
      redirect: 'categories/index',
      flash: session.flash('sucess', categories),
      categories,
    })
    //return view.render('categories/index', { categories })
  }

  @inject()
  async show(
    { params, response, view, session }: HttpContext,
    categoriesService: CategoriesService
  ) {
    const category = await categoriesService.findById(params.id)

    if (!category) {
      return response.notFound({
        redirect: 'categories/error',
        flash: session.flash('error', 'Category not found'),
      })
    }

    session.flash('sucess', category)

    return response.ok({
      redirect: 'categories/show',
      flash: session.flash('sucess', category),
      category,
    })

    //return view.render('categories/show', { category })
  }

  @inject()
  async create(
    { view, response, request, session }: HttpContext,
    categoriesService: CategoriesService
  ) {
    try {
      const data = await request.validateUsing(createCategoryValidator)
      await categoriesService.create(data)
      return response.redirect('/categories')
    } catch (error) {
      return response.badRequest({
        redirect: '/categories',
        flash: session.flash('error', 'Error when creating category'),
        error,
      })
    }

    //return view.render('categories/create')
  }

  @inject()
  async update(
    { view, params, response, request, session }: HttpContext,
    categoriesService: CategoriesService
  ) {
    try {
      const data = await request.validateUsing(updateCategoryValidator)
      await categoriesService.update(params.id, data)
    } catch (error) {
      return response.badRequest({
        redirect: '/categories',
        flash: session.flash('error', error),
      })
    }

    //return view.render('categories/update')
  }
}
