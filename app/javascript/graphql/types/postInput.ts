interface PostInput {
  markdown: string;
  name: string;
  order: number;
  parentId: string;
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
}

export default PostInput;
