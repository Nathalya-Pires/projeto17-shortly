import { db } from "../database/database.js";

import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const userExists = await db.query(`SELECT * FROM users WHERE email = $1 `, [
      email,
    ]);

    if (userExists.rowCount > 0) {
      return res.sendStatus(409);
    }

    const encrypt = bcrypt.hashSync(password, 10);
    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, encrypt]
    );

    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getUserById(req, res) {
  const { user } = res.locals;

  try {
    const viewsClick = await db.query(
      `SELECT SUM("urlsShortly"."views") 
        FROM "urlsShortly" 
        WHERE "urlsShortly"."userId" = $1`,
      [user.id]
    );
    const [visitCount] = viewsClick.rows;

    const dados = await db.query(
      `SELECT * FROM "urlsShortly" WHERE "urlsShortly"."userId" = $1`,
      [user.id]
    );
    const urlsOk = dados.rows.map((u) => {
      return {
        id: u.id,
        shortUrl: u.shortUrl,
        url: x.url,
        visitCount: u.views,
      };
    });

    res.send({
      id: user.id,
      name: user.name,
      visitCount: visitCount.sum || 0,
      shortenedUrls: urlsOk,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function rankingSum(req, res) {
  try {
    const { rows } = await db.query(`
    SELECT 
    users.id, 
    users.name, 
      COUNT("urlsShortly".id) as "linksCount", 
      COALESCE(SUM("urlsShortly"."views"), 0) as "visitCount"
    FROM users
    LEFT JOIN "urlsShortly" ON "urlsShortly"."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
  `);
    res.send(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
