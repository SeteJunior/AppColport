const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

  //cadastro de usuário
  async create(request, response) {
    const { first_name, last_name, email,
      phone, segment, leader_name, campaign_name,
      username, password, access_level, status } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('users').insert({
      id,
      first_name,
      last_name,
      email,
      phone,
      segment,
      leader_name,
      campaign_name,
      username,
      password,
      access_level,
      status
    })

    return response.json({
      "Seu usuário é ": username,
    });
  },

  //Listar todos os usuários
  async index(request, response) {
    const users = await connection('users').select('*');

    return response.json(users);
  },

  //Deletar um relatório
  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const report = await connection('reports')
      .where('id', id)
      .select('user_id')
      .first();

    if (report.user_id != user_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('users').where('id', id).delete();

    return response.status(204).send();
  },

  //Editar um usuário
  async edit(request, response) {
    const { id } = request.params;

    const { first_name, last_name, email, phone,
      segment, leader_name, campaign_name, username,
      access_level, status } = request.body;

    const id_Header = request.headers.authorization;

    const user = await connection('users')
      .where('id', id)
      .select('id')
      .first();

    if (user.id != id_Header) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('users').where('id', id)
      .update('first_name', first_name)
      .update('last_name', last_name)
      .update('email', email)
      .update('phone', phone)
      .update('segment', segment)
      .update('leader_name', leader_name)
      .update('campaign_name', campaign_name)
      .update('username', username)
      .update('access_level', access_level)
      .update('status', status)
      ;

    return response.status(204).send();
  },

}