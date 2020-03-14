'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request }){
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async index({ request }){
    const users = await User.all()

    return users

  }
}

module.exports = UserController
