const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL;

class CommentService {
  constructor(baseUrl, prefix = "/api/Comment") {
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
      console.error("API request failed:", error);
      throw error;
    }
  }

  //get all the comments of the blogs
  getCommentsByBlog(blogId) {
    return this.request(`/blog/${blogId}`, "GET");
  }

  //post the new comment
  CommentPost(commentData) {
    return this.request("", "POST", commentData);
  }
}

const commentService = new CommentService(API_BASE_URL);

export default commentService;
