import { Database } from "@/db/db";
import { PostModel } from "@/db/models/post.model";

interface IFeedService {
  find(
    filter: Partial<PostModel>
  ): Promise<{ data: PostModel[]; totalCount: number }>;
}

export class FeedsService implements IFeedService {
  private repository: Database<PostModel>;

  constructor() {
    this.repository = new Database<PostModel>("posts");
  }

  async find(
    filter: Partial<PostModel>,
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: PostModel[]; totalCount: number }> {
    return this.repository.find(filter, page, limit);
  }
}
