//using AutoMapper;
//using MejdisiIm.DTOs;
//using MejdisiIm.Models;

//namespace MejdisiIm.Mappings
//{
//    public class MappingProfile : Profile
//    {
//        public MappingProfile()
//        {

//            CreateMap<EnvironmentalReport, EnverionmentalReportDto>()
//                .ForMember(dest => dest.ReportId, opt => opt.MapFrom(src => src.ReportId))
//                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));


//            CreateMap<GreenTip, GreenTipDto>()
//                .ForMember(dest => dest.TipId, opt => opt.MapFrom(src => src.TipId))
//                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));


//            CreateMap<ReportCategory, ReportCategoryDto>()
//                .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
//                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));


//            CreateMap<Comment, CommentDto>()
//                .ForMember(dest => dest.CommentId, opt => opt.MapFrom(src => src.CommentId))
//                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content));


//            CreateMap<RecyclingCenter, RecyclingCenterDto>()
//                .ForMember(dest => dest.CenterId, opt => opt.MapFrom(src => src.CenterId))
//                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));


//            CreateMap<User, UserDto>()
//             .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))     
//             .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName));
//        }
//    }
//}

using AutoMapper;
using MejdisiIm.DTOs;
using MejdisiIm.Models;
using MejdisiIm.ViewModels;

namespace MejdisiIm.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // DTO mappings
            CreateMap<EnvironmentalReport, EnvironmentalReportDto>();
            CreateMap<GreenTip, GreenTipDto>();
            CreateMap<ReportCategory, ReportCategoryDto>();
            CreateMap<Comment, CommentDto>();
            CreateMap<RecyclingCenter, RecyclingCenterDto>();
            CreateMap<User, UserDto>();

            // ViewModel mappings
            CreateMap<Comment, CommentViewModel>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FullName))
                .ForMember(dest => dest.ReportTitle, opt => opt.MapFrom(src => src.Report.Title));

            CreateMap<CommentViewModel, Comment>();


            // ViewModel mappings
            CreateMap<EnvironmentalReport, EnvironmentalReportViewModel>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.User.FullName))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Category.Name));

            CreateMap<EnvironmentalReportViewModel, EnvironmentalReport>();
        }
    }
}

