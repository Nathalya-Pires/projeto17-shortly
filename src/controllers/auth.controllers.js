import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signIn(req, res) {
    try {
      const { email, password } = req.body;
  
      const { rows: users } = await db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );
  
      const [user] = users;
      if (!user) {
        return res.sendStatus(401);
      }
  
      if (bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [
          token,
          user.id,
        ]);
        return res.status(200).send({token: token});
      }
  
      res.sendStatus(401);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
  
  
  
  
  
  
  
