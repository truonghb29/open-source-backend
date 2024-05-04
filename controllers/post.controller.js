import Post from "../models/post.model.js";
import cloudinary from "../middleware/cloudinary.js";

// Tạo bài viết mới
export const createPost = async (req, res) => {
  try {
    const { title, image } = req.body;
    const author = req.user._id;

    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "unlocket",
      });
      if (uploadRes) {
        const newPost = new Post({
          author,
          title,
          image: uploadRes,
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
      }
    } else {
      const newPost = new Post({
        author,
        title,
      });

      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    }
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

// Cập nhật số lượng likes của bài viết
export const updateLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const likedIndex = post.likes.indexOf(userId);

    if (likedIndex === -1) {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Liked successfully" });
    } else {
      post.likes.splice(likedIndex, 1);
      await post.save();
      res.status(200).json({ message: "Unliked successfully" });
    }
  } catch (error) {
    console.error("Error in updateLikes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
