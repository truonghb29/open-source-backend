import Post from "../models/post.model.js";

// Tạo bài viết mới
export const createPost = async (req, res) => {
  try {
    const { title, image } = req.body;
    const author = req.user._id;

    const newPost = new Post({
      author,
      title,
      image,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error in createPost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Lấy tất cả các bài viết
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getPosts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Xóa bài viết
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
