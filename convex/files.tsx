import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.optional(v.string()),
    fileChooseStatus: v.string()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("files", args);
    return result;
  }
});

export const getFiles = query({
  args: {
    teamId: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query("files")
        .filter((q) => q.eq(q.field("teamId"), args.teamId))
        .order("desc")
        .collect();

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: [] };
    }
  }
});

export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.patch(args._id, { document: args.document });
      console.log(result, 678);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
});

export const updateFileChooseStatus = mutation({
  args: {
    _id: v.id("files"),
    fileChooseStatus: v.string()
  },
  handler: async (ctx, args) => {
    try {
      ctx.db.patch(args._id, {
        fileChooseStatus: args.fileChooseStatus
      });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
});

export const updateWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    try {
      await ctx.db.patch(args._id, { whiteboard: args.whiteboard });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
});

export const delFileById = mutation({
  args: {
    _id: v.id("files")
  },
  handler: async (ctx, args_0) => {
    try {
      await ctx.db.delete(args_0._id);
      return { success: true, message: "文件删除成功" };
    } catch (error) {
      return { success: false, message: "删除失败", error };
    }
  }
});

export const getFileById = query({
  args: {
    _id: v.id("files")
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.get(args._id);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: null };
    }
  }
});
