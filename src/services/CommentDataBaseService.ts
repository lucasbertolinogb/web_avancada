import { Prisma, PrismaClient } from "@prisma/client";
require('dotenv').config();


const prisma = new PrismaClient();

class CommentDataBaseService {
  constructor() {}

  async listPostComments(postId: number) {
    try {
      return await prisma.comment.findMany({
        where: {
          postId: postId,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createPostComment(comment: Prisma.CommentCreateInput) {
    try {
      const newComment = await prisma.comment.create({
        data: comment,
      });
      return newComment;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deletePostComment(commentId: number) {
    try {
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }

  }

}

export default new CommentDataBaseService();