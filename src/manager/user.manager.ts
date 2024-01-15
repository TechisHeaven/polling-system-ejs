import { UserInterface } from "../types/user.interface";

export default class UserManager {
  private user: UserInterface[] = [];
  constructor() {
    this.user = this.user;
  }

  createUser({ id, name, avatar }: UserInterface) {
    this.user.push({ id, name, avatar });
  }

  getUser() {
    return this.user;
  }
  getUserByID(id: string) {
    const resultUser = this.user.find((x) => x.id == id);
    console.log(resultUser);
    return resultUser;
  }
}
