import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Trophy, 
  Star, 
  Play, 
  CheckCircle,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "Học tập trực tuyến",
      description: "Truy cập hàng nghìn khóa học chất lượng cao từ các giảng viên hàng đầu"
    },
    {
      icon: Users,
      title: "Cộng đồng học tập",
      description: "Kết nối với hàng triệu học viên trên toàn thế giới, thảo luận và chia sẻ kiến thức"
    },
    {
      icon: Trophy,
      title: "Chứng chỉ uy tín",
      description: "Nhận chứng chỉ được công nhận từ các tổ chức giáo dục hàng đầu"
    }
  ];

  const courses = [
    {
      title: "Lập trình React từ cơ bản đến nâng cao",
      instructor: "TS. Nguyễn Văn Tuấn",
      rating: 4.8,
      students: 1234,
      price: "1.299.000đ",
      originalPrice: "1.999.000đ",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      level: "Trung bình"
    },
    {
      title: "Thiết kế UI/UX chuyên nghiệp",
      instructor: "ThS. Trần Thị Hoa",
      rating: 4.9,
      students: 856,
      price: "999.000đ",
      originalPrice: "1.499.000đ",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      level: "Cơ bản"
    },
    {
      title: "Data Science và Machine Learning",
      instructor: "PGS. Lê Minh Đức",
      rating: 4.7,
      students: 642,
      price: "1.599.000đ",
      originalPrice: "2.299.000đ",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      level: "Nâng cao"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Học viên" },
    { number: "1,000+", label: "Khóa học" },
    { number: "100+", label: "Giảng viên" },
    { number: "95%", label: "Hài lòng" }
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Sinh viên IT",
      content: "EduPortal đã giúp tôi nâng cao kỹ năng lập trình một cách hiệu quả. Các khóa học rất chất lượng và dễ hiểu.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Trần Thị B",
      role: "Designer",
      content: "Tôi đã học được rất nhiều về UI/UX design. Giảng viên nhiệt tình và cộng đồng rất hỗ trợ.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Lê Văn C",
      role: "Data Analyst",
      content: "Khóa học Data Science đã mở ra cơ hội nghề nghiệp mới cho tôi. Rất đáng đầu tư!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">EduPortal</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">
                Tính năng
              </a>
              <a href="#courses" className="text-gray-600 hover:text-primary transition-colors">
                Khóa học
              </a>
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">
                Về chúng tôi
              </a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">
                Liên hệ
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-primary">
                Đăng nhập
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                Đăng ký ngay
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
                <a href="#features" className="text-gray-600 hover:text-primary transition-colors">
                  Tính năng
                </a>
                <a href="#courses" className="text-gray-600 hover:text-primary transition-colors">
                  Khóa học
                </a>
                <a href="#about" className="text-gray-600 hover:text-primary transition-colors">
                  Về chúng tôi
                </a>
                <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">
                  Liên hệ
                </a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost" className="justify-start">
                    Đăng nhập
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    Đăng ký ngay
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
                🎉 Ưu đãi đặc biệt - Giảm 35% tất cả khóa học
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Học tập không giới hạn với{" "}
                <span className="text-primary">EduPortal</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Khám phá hàng nghìn khóa học chất lượng cao, học từ các chuyên gia hàng đầu 
                và phát triển kỹ năng của bạn một cách hiệu quả.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Bắt đầu học ngay
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Play className="mr-2 w-5 h-5" />
                  Xem demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Students learning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">50,000+</p>
                    <p className="text-sm text-gray-600">Học viên thành công</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn EduPortal?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp trải nghiệm học tập tốt nhất với công nghệ hiện đại 
              và phương pháp giảng dạy tiên tiến.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Khóa học phổ biến
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá các khóa học được yêu thích nhất từ cộng đồng học viên của chúng tôi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-gray-900">
                    {course.level}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{course.instructor}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-gray-500">({course.students})</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{course.price}</div>
                      <div className="text-sm text-gray-500 line-through">
                        {course.originalPrice}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Đăng ký ngay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Xem tất cả khóa học
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Học viên nói gì về chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hàng nghìn học viên đã thành công với EduPortal. Đây là những chia sẻ của họ.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình học tập?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn học viên đã chọn EduPortal để phát triển kỹ năng 
            và thay đổi cuộc sống của họ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Đăng ký miễn phí
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold">EduPortal</span>
              </div>
              <p className="text-gray-400 mb-4">
                Nền tảng học tập trực tuyến hàng đầu Việt Nam, 
                mang đến trải nghiệm học tập tốt nhất.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Khóa học</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Lập trình</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Thiết kế</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kinh doanh</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chính sách</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Theo dõi chúng tôi</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduPortal. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;