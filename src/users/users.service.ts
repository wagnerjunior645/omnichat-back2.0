import { FakeRepository, Users } from "../config/fake.repository";

export class UsersService {
  private fakeRepository: FakeRepository;
  constructor() {
    this.fakeRepository = new FakeRepository();
  }
  async findAll(): Promise<Users[]> {
    return this.fakeRepository.findAll();
  }
  async find(id: number): Promise<Users> {
    return this.fakeRepository.find(id);
  }
  async create(user: string, password: string): Promise<Users> {
    return this.fakeRepository.create(user, password);
  }
  async update(id: number, user: string): Promise<void> {
    return this.fakeRepository.update(id, user);
  }
  async remove(id: number): Promise<void> {
    return this.fakeRepository.remove(id);
  }
}
