const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5233";

class AuthorService {
  constructor(baseUrl, prefix = "/api/Author") {
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

      throw new Error(
        data?.message || `HTTP error! Status: ${response.status}`
      );
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  //to get author by the ID
  getAuthorById(authorId) {
    return this.request(`/by-id/${authorId}`, "GET");
  }

  //TO get author by name
  getAuthorName(name) {
    return this.request(`/by-name?name=${name}`, "GET");
  }

  //register
  authorRegister(authorData) {
    return this.request(`/register`, "POST", authorData);
  }

  //login
  authorLogin(authorData) {
    return this.request(`/login`, "POST", authorData);
  }
}

const authorService = new AuthorService(API_BASE_URL);

export default authorService;
