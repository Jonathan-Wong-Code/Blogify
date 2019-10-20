const Post = {
  createdAt(parent, args, ctx, info) {
    return new Date(parent.createdAt).toUTCString();
  }
};
