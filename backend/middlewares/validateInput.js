

export const validateInput = (schema) => (req, res, next) => {

    const result = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query
    })

    if (!result.success) {
        return next(result.error)
    }

    if (result.data.body) req.body = result.data.body || {}
    if (result.data.params) req.params = result.data.params || {}
    if (result.data.query) req.query = result.data.query || {}

    next()
}

