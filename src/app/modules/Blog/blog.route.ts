import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidations } from "./blog.validation";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

router.post(
  "/create-blog",
  validateRequest(BlogValidations.blogValidationSchema),
BlogControllers.createBlog
);

//get Id by  blog
router.get("/:id",  BlogControllers.getSingleBlog);


//update blog
router.put(
  "/:id",
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog
 
);
//delete blog
router.delete("/:id",);

//get all blog
router.get("/", BlogControllers.getAllBlog);

export const BlogRoutes = router;
