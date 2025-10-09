import { useState, useMemo } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardStats from "@/components/DashboardStats";
import CourseCard from "@/components/CourseCard";
import RecentActivity from "@/components/RecentActivity";
import QuickActions from "@/components/QuickActions";
import CourseFilter from "@/components/CourseFilter";

// Mock data for courses
const courses = [
  {
    id: "1",
    title: "Lập trình React nâng cao",
    instructor: "TS. Nguyễn Văn Tuấn",
    duration: "8 tuần",
    students: 124,
    rating: 4.8,
    progress: 65,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "Công nghệ thông tin",
  },
  {
    id: "2", 
    title: "Hệ quản trị cơ sở dữ liệu",
    instructor: "PGS. Trần Thị Hoa",
    duration: "10 tuần",
    students: 98,
    rating: 4.6,
    progress: 45,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    category: "Cơ sở dữ liệu",
  },
  {
    id: "3",
    title: "Kỹ thuật phần mềm",
    instructor: "TS. Lê Minh Đức",
    duration: "12 tuần", 
    students: 156,
    rating: 4.9,
    progress: 80,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    category: "Công nghệ thông tin",
  },
  {
    id: "4",
    title: "Trí tuệ nhân tạo",
    instructor: "PGS. Phạm Văn Long",
    duration: "14 tuần",
    students: 89,
    rating: 4.7,
    progress: 25,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    category: "AI & Machine Learning",
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  
  // Get unique categories from courses
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(courses.map(course => course.category))];
    return uniqueCategories;
  }, []);
  
  // Filter courses based on selected category
  const filteredCourses = useMemo(() => {
    if (selectedCategory === "Tất cả") {
      return courses;
    }
    return courses.filter(course => course.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm khóa học, bài tập..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Chào mừng trở lại, Nguyễn Văn A!
              </h1>
              <p className="text-muted-foreground">
                Hôm nay là ngày tuyệt vời để tiếp tục hành trình học tập của bạn.
              </p>
            </div>

            {/* Stats */}
            <DashboardStats />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Courses Section */}
              <div className="lg:col-span-2">
                <CourseFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  courseCount={filteredCourses.length}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <RecentActivity />
                <QuickActions />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
