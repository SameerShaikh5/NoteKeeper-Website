import { z } from "zod"
import sanitize from "mongo-sanitize"
import xss from "xss"

const clean = (input) => sanitize(xss(input))
const cleanSanitize = (input) => sanitize(input)


// ---------------------------------- Users schema -----------------------------------

export const registerSchema = z.object({
    body: z.object({
        name: z.string().trim().transform(clean),
        email: z.string().trim().transform(clean),
        password: z.string().trim().transform(clean)
    })
})

export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().transform(clean),
        password: z.string().trim().transform(clean)
    })
})


// ---------------------------------- Blogs schema ----------------------------------

export const paginationSchema = z.object({
    query:z.object({
        page:z.number().optional(),
        category: z.string().trim().max(30, "Category length can't be more than 30 characters!").transform(clean),
    })
})


export const getBlogSchema = z.object({
    params: z.object({
        id: z.string().trim().transform(clean)
    })
})


export const createBlogSchema = z.object({
    body: z.object({
        topic: z.string().trim().max(50, "Topic name can't be more than 50 characters!").transform(clean),
        category: z.string().trim().max(30, "Category length can't be more than 30 characters!").transform(clean),
        content: z.string().trim().transform(cleanSanitize),
        tags: z.array(z.string()).max(10, "You can't have more than 10 tags").transform(clean)
    })
})

export const updateBlogSchema = z.object({
    params: z.object({
        id: z.string().trim()
    }),
    body: z.object({
        topic: z.string().trim().max(60, "Topic name can't be more than 50 characters!").optional(),
        category: z.string().trim().max(30, "Category length can't be more than 30 characters!").optional(),
        content: z.string().trim().transform(cleanSanitize).optional(),
        tags: z.array().max(10).optional()
    })
})

export const deleteBlogSchema = z.object({
    params: z.object({
        id: z.string().trim().transform(clean)
    })
})


export const getTopicsBlogSchema = z.object({
    params: z.object({
        id: z.string().trim().transform(clean)
    })
})



