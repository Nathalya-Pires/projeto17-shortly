import { db } from "../database/database.js";
import { nanoid } from "nanoid";

export async function shortlyUrl(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;

  const short = nanoid(8);

  try {
    await db.query(
      `INSERT INTO "urlsShortly"("url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
      [url, short, id]
    );

    res.status(201).send({ short });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function UrlById(req, res) {
  try {
    const { id } = req.params;
    const dados = await db.query('SELECT * FROM "urlsShortly" WHERE id = $1', [
      id,
    ]);

    if (!dados.rowCount) {
      return res.sendStatus(404);
    }

    const { id: urlId, shortUrl, url } = dados.rows[0];
    const body = { id: urlId, shortUrl, url };

    return res.send(body);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function openUrl(req, res) {
  try {
    const { shortUrl } = req.params;
    const dados = await db.query(
      'SELECT * FROM "urlsShortly" WHERE "shortUrl" = $1',
      [shortUrl]
    );

    if (!dados.rowCount) {
      return res.sendStatus(404);
    }

    const [url] = dados.rows;

    await db.query(
      'UPDATE "urlsShortly" SET "views" = "views" + 1 WHERE id = $1',
      [url.id]
    );

    return res.redirect(url.url);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  if (!user || !user.id) {
    return res.sendStatus(401);
  }

  try {
    const dados = await db.query(
      'SELECT * FROM "urlsShortly" WHERE id = $1 AND userId = $2',
      [id, user.id]
    );

    if (dados.rowCount === 0) {
      return res.sendStatus(404);
    }

    await db.query('DELETE FROM "urlsShortly" WHERE id=$1', [id]);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
