using AutoMapper;
using BlogApi2_backend.Models.Dtos;
using BlogApi2_backend.Models.Entities;

namespace BlogApi2_backend.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<AddComment, Comments>().ReverseMap();
            CreateMap<Blog,GetBlogTitleDto>().ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.Name));
            
            CreateMap<AddBlogDto, Blog>().ReverseMap();
            CreateMap<UpdateBlogDto, Blog>().ReverseMap();

            CreateMap<Author, GetAuthorDto>()
            .ForMember(dest => dest.AuthorId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Blogs, opt => opt.MapFrom(src => src.Blogs));

            // Map Blog -> BlogDto
            CreateMap<Blog, BlogDto>()
                .ForMember(dest => dest.BlogId, opt => opt.MapFrom(src => src.Id));
        }
    }
}
