import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Users, Calendar, Library, FileText, ArrowRight, Menu, X, MapPin, Phone, Mail, Building, Award } from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      icon: BookOpen,
      title: "Hệ thống LMS",
      description: "Truy cập bài giảng, nộp bài tập và theo dõi tiến độ học tập trực tuyến"
    },
    {
      icon: Library,
      title: "Thư viện điện tử",
      description: "Tìm kiếm tài liệu, sách, báo khoa học và luận văn từ thư viện trường"
    },
    {
      icon: Calendar,
      title: "Đăng ký môn học",
      description: "Đăng ký môn học cho học kỳ mới và quản lý thời khóa biểu cá nhân"
    }
  ];

  const quickLinks = [
    {
      title: "Hệ thống quản lý học tập",
      description: "Truy cập bài giảng và tài liệu của các môn học",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      link: "/dashboard"
    },
    {
      title: "Tài liệu học tập",
      description: "Thư viện tài liệu, sách và nghiên cứu khoa học",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      link: "/study-materials"
    },
    {
      title: "Ôn luyện thi",
      description: "Đề thi mẫu và tài liệu ôn tập cho các kỳ thi",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      link: "/exam-prep"
    }
  ];

  const stats = [
    { number: "15,000+", label: "Sinh viên" },
    { number: "120+", label: "Chuyên ngành" },
    { number: "800+", label: "Giảng viên" },
    { number: "50+", label: "Năm thành lập" }
  ];

  const news = [
    {
      title: "Thông báo lịch thi cuối kỳ học kỳ I năm học 2024-2025",
      date: "15/12/2024",
      category: "Học vụ"
    },
    {
      title: "Hội thảo khoa học quốc tế về Công nghệ thông tin",
      date: "20/12/2024", 
      category: "Nghiên cứu"
    },
    {
      title: "Đăng ký môn học học kỳ II năm học 2024-2025",
      date: "10/01/2025",
      category: "Đăng ký"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background shadow-sm sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <div>
                <span className="text-xl font-bold text-foreground">Đại học ABC</span>
                <p className="text-xs text-muted-foreground">Hệ thống học tập trực tuyến</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                Dịch vụ
              </a>
              <a href="#resources" className="text-muted-foreground hover:text-primary transition-colors">
                Tài nguyên
              </a>
              <a href="#news" className="text-muted-foreground hover:text-primary transition-colors">
                Tin tức
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Liên hệ
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost">
                Đăng nhập
              </Button>
              <Button>
                Portal sinh viên
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Dịch vụ
                </a>
                <a href="#resources" className="text-muted-foreground hover:text-primary transition-colors">
                  Tài nguyên
                </a>
                <a href="#news" className="text-muted-foreground hover:text-primary transition-colors">
                  Tin tức
                </a>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Liên hệ
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost" className="justify-start">
                    Đăng nhập
                  </Button>
                  <Button>
                    Portal sinh viên
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                🎓 Hệ thống học tập trực tuyến - Đại học ABC
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Cổng thông tin{" "}
                <span className="text-primary">Sinh viên</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Truy cập đầy đủ các dịch vụ học tập, tài liệu, thông tin học vụ 
                và kết nối với cộng đồng sinh viên trường Đại học ABC.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Truy cập LMS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <FileText className="mr-2 w-5 h-5" />
                  Thư viện
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop"
                alt="University campus"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-xl shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Top 10</p>
                    <p className="text-sm text-muted-foreground">Đại học Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Dịch vụ sinh viên
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Các dịch vụ trực tuyến hỗ trợ quá trình học tập và nghiên cứu của sinh viên.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Resources */}
      <section id="resources" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Truy cập nhanh
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Các tài nguyên học tập thiết yếu cho sinh viên trường Đại học ABC.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickLinks.map((resource, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                  
                  <Button className="w-full">
                    Truy cập ngay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tin tức & thông báo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cập nhật thông tin mới nhất về học vụ, nghiên cứu và hoạt động của trường.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge className="mb-4" variant="secondary">
                    {item.category}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.date}</p>
                  <Button variant="outline" size="sm">
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Xem tất cả tin tức
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Thông tin liên hệ
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5" />
                  <span>123 Đường Đại học, Quận ABC, TP. Hồ Chí Minh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" />
                  <span>(028) 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span>info@daihocabc.edu.vn</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Giờ làm việc</h3>
              <div className="space-y-2 text-primary-foreground/90">
                <p>Thứ 2 - Thứ 6: 7:00 - 17:00</p>
                <p>Thứ 7: 7:00 - 11:30</p>
                <p>Chủ nhật: Nghỉ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold">Đại học ABC</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Trường đại học hàng đầu trong lĩnh vực đào tạo và nghiên cứu khoa học tại Việt Nam.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Đào tạo</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Đại học</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Thạc sĩ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tiến sĩ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Đào tạo liên thông</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Dịch vụ</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Thư viện</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Hỗ trợ IT</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tư vấn học tập</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Sinh hoạt sinh viên</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kết nối</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Website chính thức</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Đại học ABC. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;