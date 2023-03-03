import {db} from "../database/database.js"


export async function authValidation(req, res, next) {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.status(401);
      }
  
      const token = authorization.replace("Bearer ", "");
  
      const { rows: sessions } = await db.query(
        `SELECT * FROM sessions WHERE token = $1`,
        [token]
      );
      if (sessions.length === 0) {
        return res.status(401);
      }
  
      const { rows: users } = await db.query(
        `SELECT * FROM users WHERE id = $1`,
        [sessions[0].userId]
      );
      if (users.length === 0) {
        return res.status(401);
      }
  
      res.locals.user = users[0];
      next();
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }