import { useState } from "react";
import { Search } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import CourseFilter from "@/components/CourseFilter";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PublicCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const categories = [
    "Lập trình",
    "Thiết kế",
    "Marketing",
    "Kinh doanh",
    "Ngoại ngữ",
  ];

  const publicCourses = [
    {
      id: "1",
      title: "Lập trình Web với React và TypeScript",
      instructor: "Nguyễn Văn A",
      duration: "40 giờ",
      students: 1250,
      rating: 4.8,
      progress: 0,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
      category: "Lập trình",
    },
    {
      id: "2",
      title: "UI/UX Design Fundamentals",
      instructor: "Trần Thị B",
      duration: "30 giờ",
      students: 890,
      rating: 4.9,
      progress: 0,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      category: "Thiết kế",
    },
    {
      id: "3",
      title: "Digital Marketing Strategy",
      instructor: "Lê Văn C",
      duration: "25 giờ",
      students: 2100,
      rating: 4.7,
      progress: 0,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      category: "Marketing",
    },
    {
      id: "4",
      title: "Python cho Data Science",
      instructor: "Phạm Thị D",
      duration: "50 giờ",
      students: 1580,
      rating: 4.9,
      progress: 0,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
      category: "Lập trình",
    },
    {
      id: "5",
      title: "Tiếng Anh Giao Tiếp",
      instructor: "Hoàng Văn E",
      duration: "35 giờ",
      students: 3200,
      rating: 4.8,
      progress: 0,
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop",
      category: "Ngoại ngữ",
    },
    {
      id: "6",
      title: "Khởi nghiệp và Quản trị Doanh nghiệp",
      instructor: "Đỗ Thị F",
      duration: "45 giờ",
      students: 1890,
      rating: 4.6,
      progress: 0,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      category: "Kinh doanh",
    },
    {
      id: "7",
      title: "Adobe Photoshop Advanced",
      instructor: "Vũ Văn G",
      duration: "28 giờ",
      students: 1120,
      rating: 4.7,
      progress: 0,
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop",
      category: "Thiết kế",
    },
    {
      id: "8",
      title: "Facebook Ads Mastery",
      instructor: "Bùi Thị H",
      duration: "20 giờ",
      students: 2450,
      rating: 4.8,
      progress: 0,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
      category: "Marketing",
    },
  ];

  const filteredCourses = publicCourses.filter((course) => {
    const matchesCategory =
      selectedCategory === "Tất cả" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Khóa học công khai
          </h1>
          <p className="text-muted-foreground">
            Khám phá và tham gia các khóa học miễn phí và trả phí
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <CourseFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          courseCount={filteredCourses.length}
        />

        {paginatedCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Không tìm thấy khóa học nào phù hợp
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicCourses;
