import { Pool } from 'pg';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  roles: string[];
}

export class UserRepository {
  constructor(private pool: Pool) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query(
      `
      SELECT u.id, u.email, u.password_hash,
             ARRAY_AGG(r.name) AS roles
      FROM users u
      LEFT JOIN user_roles ur ON u.id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.id
      WHERE u.email = $1
      GROUP BY u.id
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

  async createUser(
    email: string,
    passwordHash: string
  ): Promise<User> {
    const result = await this.pool.query(
      `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email, password_hash
      `,
      [email, passwordHash]
    );

    return {
      ...result.rows[0],
      roles: []
    };
  }
}