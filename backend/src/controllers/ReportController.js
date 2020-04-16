const connection = require('../database/connection');

module.exports = {
  //Cadastro de relatórios
  async create(request, response) {
    const { title, description, qty_books,
      total_value, date, user_id } = request.body;

    await connection('reports').insert({
      title,
      description,
      qty_books,
      total_value,
      date,
      user_id
    })

    return response.json({ "Titulo do relatório": title });
  },

  //Listar todos os relatórios
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('reports').count();

    const reports = await connection('reports')
      .join('users', 'users.id', '=', 'reports.user_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'reports.*',
        'users.first_name',
        'users.last_name',
        'users.email',
        'users.phone',
        'users.segment'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(reports);
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

    await connection('reports').where('id', id).delete();

    return response.status(204).send();
  },
  //Editar um relatório
  async edit(request, response) {
    const { id } = request.params;
    const { title, description,
      qty_books, total_value, date } = request.body;
    const user_id = request.headers.authorization;

    const report = await connection('reports')
      .where('id', id)
      .select('user_id')
      .first();

    if (report.user_id != user_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('reports').where('id', id)
      .update('title', title)
      .update('description', description)
      .update('qty_books', qty_books)
      .update('total_value', total_value)
      .update('date', date);

    return response.status(204).send();
  },

}