import { AuthUser } from "../model/authUser.model";

export class AuthRepository {
  static createUser(data: {
    first_name: string;
    last_name: string;
    password: string;
  }) {
    return AuthUser.create(data);
  }

  static findByName(first_name: string, last_name: string) {
    return AuthUser.findOne({ where: { first_name, last_name } });
  }
}
