let users: Users[] = [];

export class FakeRepository {
  async findAll(): Promise<Users[]> {
    return users;
  }
  async find(id: number): Promise<Users> {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) {
      throw new Error("Usuário não existe.");
    }
    return findUser;
  }
  async findByUsername(username: string): Promise<Users> {
    const findUser = users.find((user) => user.user === username);
    if (!findUser) {
      throw new Error("Usuário não existe.");
    }
    return findUser;
  }
  async create(user: string, password: string): Promise<Users> {
    const id = Date.now();
    const createUser = { id, user, password };
    const findUser = users.find((userFilter) => userFilter.user === user);
    if (findUser) {
      throw new Error("Usuário já existe");
    }
    users = users.concat([createUser]);
    return createUser;
  }
  async update(id: number, user: string): Promise<void> {
    const findUser = await this.find(id);
    findUser.user = user;
    users = users.map(userFilter => {
        if (userFilter.id === id) {
            userFilter.user = user;
        }
        return userFilter;
    });
    return;
  }
  async remove(id: number): Promise<void> {
    const user = await this.find(id);
    users = users.filter((user) => user.id !== id);
  }
}

export interface Users {
  user: string;
  id: number;
  password: string;
}
