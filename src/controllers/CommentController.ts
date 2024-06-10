import { Request, Response } from "express";
import CommentDataBaseService from "../services/CommentDataBaseService";

class CommentController {
  constructor() {}

  async listPostComments(req: Request, res: Response) {
    const postId = parseInt(req.params.postId);
    if (!postId) {
      res.json({
        status: "error",
        message: "Faltou o ID do post",
      });
    }

    try {
      const comments = await CommentDataBaseService.listPostComments(postId);
      res.json({
        status: "ok",
        comments: comments,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createPostComment(req: Request, res: Response) {
    const { title, content, postId } = req.body;
    if (!title || !content || !postId) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    // so não tem erro quem não se garante nele :D
    /*try {
      const newComment = await CommentDataBaseService.createPostComment({
        title: title,
        content: content,
        postId: postId,
      });
      res.json({
        status: "ok",
        newComment: newComment,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }*/
  }

  async deletePostComment(req: Request, res: Response) {
    const commentId = parseInt(req.params.commentId);
    if (!commentId) {
      res.json({
        status: "error",
        message: "Faltou o ID do comentário",
      });
      return;
    }

    try {
      const response = await CommentDataBaseService.deletePostComment(commentId);
      if (response) {
        res.json({
          status: "ok",
          message: "Comentário deletado com sucesso",
        });
      }
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new CommentController();
