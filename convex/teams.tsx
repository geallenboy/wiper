import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeam = query({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query("teams")
        .filter((q) => q.eq(q.field("createdBy"), args.email))
        .collect();
      return { success: true, data: result };
    } catch (error) {
      return { success: true, data: [] };
    }
  }
});

export const createTeam = mutation({
  args: { teamName: v.string(), createdBy: v.string() },
  handler: async (ctx, args) => {
    try {
      await ctx.db.insert("teams", args);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
});
