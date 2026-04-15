function validateTask(req, res, next) {
    const title = req.body.title;
    const description = req.body.description;


    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }


    if (typeof title !== "string") {
        return res.status(400).json({
            message: "Title must be a string"
        });
    }

    
    if (description && typeof description !== "string") {
        return res.status(400).json({
            message: "Description must be a string"
        });
    }

    next();
}

module.exports = validateTask;
