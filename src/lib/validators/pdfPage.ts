import { z } from 'zod'

export const PDFPageValidator = z.object({
    pageContent: z.string(),
    metadata:z.object({
        loc:z.object({
            pageNumber:z.number(),
        })
    })
})

export type PDFPageRequest = z.infer<typeof PDFPageValidator>
