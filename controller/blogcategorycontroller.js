const BlogCategory = require('../model/blogcategorymodel')

//----------------------------------create category------------------------
exports.createBlogCategory = async (req, res) => {
    const category = req.body;

    try {
        const categorydata = await BlogCategory.create(category)

        return res.status(201).json({
            success: true,
            message: "Blog category created successfully",
          
        });
    } catch (error) {
        res.status(400).json({
            message: "server error",
            error: error.message
        });
    }
};

//----------------------------------get all categories------------------------
exports.getAllBlogCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.find();

        return res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
};


exports.deleteCategory=async(req,res)=>{
    try {

        const {id}=req.params;
console.log(id)
        const category=await BlogCategory.findByIdAndDelete(id);

        return res.status(200).json({messag:"deleted successfully"})

        
    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
}
