﻿namespace BlogApi2_backend.Models.Dtos
{
    public class LoginDto
    {
        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}
