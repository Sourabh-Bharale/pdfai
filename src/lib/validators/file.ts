import { z } from 'zod'

export const FileValidator = z.object({
    fileName: z.string(),
    fileKey:z.string(),
})

export type FileRequest = z.infer<typeof FileValidator>
