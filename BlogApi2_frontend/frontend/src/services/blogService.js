

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5233';


class BlogService {
  constructor(baseUrl, prefix = "/api/Blog") {
    this.baseUrl = baseUrl;
    this.prefix = prefix;
  }
  
  // Generic request method that handles the API call
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
      
      // If there is no content, simply return null (useful for DELETE or 204 responses)
      if (response.status === 204) return null;
      
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (response.ok) {
        return data;
      }
      
      throw new Error(data?.message || `HTTP error! Status: ${response.status}`);
    } catch (error) {
      console.error("API request failed:", error);
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
    // encodeURIComponent ensures that any special characters in the title are escaped
    return this.request(`/title?title=${encodeURIComponent(title)}`, "GET");
  }

  //DELETE /api/Blog/{blogid}

  deleteBlog(blogId){
      return this.request(`/${blogId}`,"DELETE")
  }


}

const blogService = new BlogService(API_BASE_URL);

// Export the instance with a name, so it's not anonymous.
export default blogService;
