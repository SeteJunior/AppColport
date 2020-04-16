const connection = require('../database/connection');

module.exports = {
  //login do Admininstrador
  async loginAdmin(request, response) {
    const { username, password } = request.body;

    const admin = await connection('users')
      .where('username', username).andWhere('password', password)
      .select('first_name', 'last_name', 'access_level', 'status').first();

    if (!admin) {
      return response.status(488).json({ error: 'No user found with this credentials.' });
    }

    return response.json(admin);
  },

  //login do usuário
  async loginUser(request, response) {
    const { username, password } = request.body;

    const user = await connection('users')
      .where('username', username).andWhere('password', password)
      .select('first_name', 'last_name', 'segment', 'access_level', 'status').first();

    if (!user) {
      return response.status(488).json({ error: 'No user found with this credentials.' });
    }

    return response.json(user);
  },

}