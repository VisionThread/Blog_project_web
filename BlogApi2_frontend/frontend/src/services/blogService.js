import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class BlogService {
  constructor(baseUrl, prefix = "/api/Blog") {
    this.baseUrl = baseUrl;
    this.prefix = prefix;
  }

  async request(endpoint, method = "GET", body = null, headers = {}) {
    const fullUrl = `${this.baseUrl}${this.prefix}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const options = {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(fullUrl, options);

      if (response.status === 204) return null;

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (response.ok) {
        return data;
      }

      throw new Error(
        data?.message || `HTTP error! Status: ${response.status}`
      );
    } catch (error) {
      toast.error(`API FAILED TO FETCH:${error.message}`)
      throw error;
    }
  }

  // POST /api/Blog
  createBlog(blogData) {
    return this.request("", "POST", blogData);
  }

  // GET /api/Blog/{blogId}
  getBlogById(blogId) {
    return this.request(`/${blogId}`, "GET");
  }

  // PUT /api/Blog/{blogId}
  updateBlog(blogId, blogData) {
    return this.request(`/${blogId}`, "PUT", blogData);
  }

  // GET /api/Blog/title?title=...
  searchBlogByTitle(title) {
    
    return this.request(`/title?title=${encodeURIComponent(title)}`, "GET");                                                                              // encodeURIComponent ensures that any special characters in the title are escaped
  }

  //DELETE /api/Blog/{blogid}
  deleteBlog(blogId) {
    return this.request(`/${blogId}`, "DELETE");
  }
}

const blogService = new BlogService(API_BASE_URL);

// Export the instance with a name, so it's not anonymous.
export default blogService;
