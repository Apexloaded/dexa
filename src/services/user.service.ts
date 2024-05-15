import { Database } from "@/db/db";
import { UserModel } from "@/db/models/user.model";

interface IUserService {
  find(
    filter: Partial<UserModel>
  ): Promise<{ data: UserModel[]; totalCount: number }>;
  findOne(filter: Partial<UserModel>): Promise<UserModel>;
}

export class UsersService implements IUserService {
  private repository: Database<UserModel>;

  constructor() {
    this.repository = new Database<UserModel>("auths");
  }

  async find(
    filter: Partial<UserModel>,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: UserModel[]; totalCount: number }> {
    return this.repository.find(filter, page, limit);
  }

  async findOne(filter: Partial<UserModel>): Promise<UserModel> {
    return this.repository.findOne(filter);
  }
}
