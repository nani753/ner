import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Export route handlers
const handler = createRouteHandler({
  router: ourFileRouter,
});

export const GET = handler.GET;
export const POST = handler.POST;