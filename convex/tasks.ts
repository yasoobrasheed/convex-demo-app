import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("tasks").collect();
    for (const task of existing) {
      await ctx.db.delete(task._id);
    }

    const tasks = [
      { text: "Walk the dog!", isCompleted: false },
      { text: "Read a chapter of Dune!", isCompleted: true },
      { text: "Fix the leaky faucet!", isCompleted: false },
      { text: "Call the dentist!", isCompleted: true },
      { text: "Write blog post!", isCompleted: false },
    ];

    for (const task of tasks) {
      await ctx.db.insert("tasks", task);
    }
  },
});
