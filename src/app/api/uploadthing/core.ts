import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  fileUploader: f({ "application/pdf": { maxFileSize: "8MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;