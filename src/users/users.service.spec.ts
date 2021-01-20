import { UsersService } from "./users.service";

describe("My Test Suite", () => {
  it("should users length = 1", async () => {
    const usersService = new UsersService();
    await usersService.create("user", "password");
    const users = await usersService.findAll();
    expect(users.length).toBe(1);
  });
  it("should users length = 2", async () => {
    const usersService = new UsersService();
    await usersService.create("user2", "password");
    const users = await usersService.findAll();
    expect(users.length).toBe(2);
  });
  it("should remove one user", async () => {
    const usersService = new UsersService();
    let users = await usersService.findAll();
    await usersService.remove(users[0].id);
    await usersService.remove(users[1].id);
    users = await usersService.findAll();
    expect(users.length).toBe(0);
  });
  it("should update one user", async () => {
    const newName = "newName";
    const usersService = new UsersService();
    await usersService.create("user", "password");
    let users = await usersService.findAll();
    expect(users.length).toBe(1);
    const [user] = users;
    usersService.update(user.id, newName);
    users = await usersService.findAll();
    expect(users[0].user).toBe(newName);
  });
  it("should find user by id", async () => {
    const usersService = new UsersService();
    const newName = "newName";
    let users = await usersService.findAll();
    const [user] = users;
    const otherUser = await usersService.find(user.id);
    expect(JSON.stringify(user)).toBe(JSON.stringify(otherUser));
  });
});
