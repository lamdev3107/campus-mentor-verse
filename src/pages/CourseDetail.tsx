import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Check,
  PlayCircle,
  Lock,
  Clock,
  BookOpen,
  BarChart3,
  Laptop
} from "lucide-react";

const CourseDetail = () => {
  const [expandedChapter, setExpandedChapter] = useState<string>("chapter-1");

  const courseData = {
    title: "Kiến Thức Nhập Môn IT",
    description: "Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé.",
    level: "Cơ bản",
    totalChapters: 4,
    totalLessons: 12,
    duration: "03 giờ 26 phút",
    price: "Miễn phí",
    benefits: [
      "Các kiến thức cơ bản, nền móng của ngành IT",
      "Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng",
      "Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng",
      "Hiểu hơn về cách internet và máy vi tính hoạt động"
    ],
    chapters: [
      {
        id: "chapter-1",
        title: "1. Khái niệm kỹ thuật cần biết",
        lessonCount: 3,
        lessons: [
          { id: 1, title: "1. Mô hình Client - Server là gì?", duration: "11:35", isLocked: false },
          { id: 2, title: "2. Domain là gì? Tên miền là gì?", duration: "10:34", isLocked: false },
          { id: 3, title: "3. Mua áo F8 | Đăng ký học Offline", duration: "01:00", isLocked: true }
        ]
      },
      {
        id: "chapter-2",
        title: "2. Môi trường, con người IT",
        lessonCount: 3,
        lessons: [
          { id: 4, title: "1. Giới thiệu về môi trường IT", duration: "15:20", isLocked: false },
          { id: 5, title: "2. Văn hóa làm việc trong IT", duration: "12:45", isLocked: false },
          { id: 6, title: "3. Cơ hội nghề nghiệp", duration: "18:30", isLocked: false }
        ]
      },
      {
        id: "chapter-3",
        title: "3. Phương pháp, định hướng",
        lessonCount: 4,
        lessons: [
          { id: 7, title: "1. Lộ trình học lập trình web", duration: "20:15", isLocked: false },
          { id: 8, title: "2. Các ngôn ngữ lập trình phổ biến", duration: "16:40", isLocked: false },
          { id: 9, title: "3. Front-end vs Back-end", duration: "14:25", isLocked: false },
          { id: 10, title: "4. Công cụ cần thiết", duration: "13:10", isLocked: false }
        ]
      },
      {
        id: "chapter-4",
        title: "4. Hoàn thành khóa học",
        lessonCount: 2,
        lessons: [
          { id: 11, title: "1. Tổng kết và định hướng", duration: "10:45", isLocked: false },
          { id: 12, title: "2. Nhận chứng chỉ hoàn thành", duration: "05:30", isLocked: false }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <TopBar />
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Header */}
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-3">
                  {courseData.title}
                </h1>
                <p className="text-muted-foreground">
                  {courseData.description}
                </p>
              </div>

              {/* Benefits Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bạn sẽ học được gì?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Content */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Nội dung khóa học</CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Mở rộng tất cả
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {courseData.totalChapters} chương • {courseData.totalLessons} bài học • Thời lượng {courseData.duration}
                  </p>
                </CardHeader>
                <CardContent>
                  <Accordion 
                    type="single" 
                    collapsible 
                    value={expandedChapter}
                    onValueChange={setExpandedChapter}
                    className="w-full"
                  >
                    {courseData.chapters.map((chapter) => (
                      <AccordionItem key={chapter.id} value={chapter.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span className="font-medium text-foreground">
                              {chapter.title}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {chapter.lessonCount} bài học
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1 pt-2">
                            {chapter.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.isLocked ? (
                                    <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                  ) : (
                                    <PlayCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                  )}
                                  <span className="text-sm text-foreground">
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {lesson.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Video Preview Card */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-gradient-to-br from-red-500 via-purple-500 to-purple-700 flex items-center justify-center">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                    <h3 className="text-xl font-bold mb-2 text-center">Kiến Thức Nền Tảng</h3>
                    <p className="text-sm opacity-90 mb-4">Kiến thức nhập môn {'{}'}</p>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-full h-16 w-16 p-0"
                    >
                      <PlayCircle className="h-8 w-8" />
                    </Button>
                    <p className="text-sm mt-4 opacity-90">Xem giới thiệu khóa học</p>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-primary mb-3">
                      {courseData.price}
                    </h3>
                    <Button className="w-full" size="lg">
                      ĐĂNG KÝ HỌC
                    </Button>
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex items-center gap-3 text-sm">
                      <BarChart3 className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground">Trình độ cơ bản</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground">Tổng số {courseData.totalLessons} bài học</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground">Thời lượng {courseData.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Laptop className="h-5 w-5 text-muted-foreground" />
                      <span className="text-foreground">Học mọi lúc, mọi nơi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetail;
