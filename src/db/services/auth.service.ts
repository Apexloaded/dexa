import { Repository } from "../db.connect";
import { User } from "../models/user.model";

export class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = new Repository<User>("users");
  }

  async searchBook(
    filter: Partial<User>,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: User[]; totalCount: number }> {
    return this.repository.find(filter, page, limit);
  }

  async findUser(filter: Partial<User>) {
    return this.repository.findOne(filter);
  }
}
