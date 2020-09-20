const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
  user: 'adeneebw',
  host: 'lallah.db.elephantsql.com',
  database: 'adeneebw',
  password: 'xu-1eg8AIETKSK9etjo6aydeAWCdHHtY',
  port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
  //const { id } = req.params
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await pool.query(
    `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
  );
  res.send('INSERTADO');
});

router.put('/actualizapaciente', async (req, res) => {
    const { nombre, apellido, numid } = req.body;
    await pool.query(
        `UPDATE pacientes SET 
            nombre='${nombre}', 
            apellido='${apellido}' 
        WHERE numid='${numid}'` 
    );
    res.send('Paciente actualizado correctamente.');
});

router.delete('/eliminarpaciente', async (req, res) => {
    const {numid} = req.body;
    console.log(numid);
    await pool.query(
        `DELETE FROM pacientes WHERE numid='${numid}';`
    );
    res.send('Paciente eliminado correctamente.');
});
