import CollectionHelper from "@/utils/firebase/collectionHelper";

export default class PostApiHelper {
  col: CollectionHelper;
  constructor(db: FirebaseFirestore.Firestore) {
    this.col = new CollectionHelper(db.collection("blog_posts"));
  }

  async getBySlug(slug: string, withRelated: boolean = true) {
    const post = await this.col.getDoc(slug);

    if (withRelated && post.data?.relate_posts) {
      const related = await this.col.getByDocReference(post.data!.relate_posts);
      return {
        status: {
          post: post.status,
          related: related.status,
        },
        message: {
          post: "fetch post with no related posts",
          related: related.message,
        },
        post: post.data,
        relatedPost: related.data,
      };
    } else {
      return {
        status: "Success",
        message: "fetch post with no related posts",
        post: post.data,
        relatedPost: [],
      };
    }
  }

  get(
    count: number,
    filters: {
      before: number;
      after: string;
      tags: string[];
      categories: string[];
    }
  ) {}
}
