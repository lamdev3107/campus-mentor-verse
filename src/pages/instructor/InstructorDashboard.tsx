import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, FileText, TrendingUp, Clock, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const InstructorDashboard = () => {
  const statsData = [
    {
      title: "Tổng khóa học",
      value: "12",
      icon: BookOpen,
      description: "3 khóa đang hoạt động",
      color: "text-primary",
    },
    {
      title: "Học sinh",
      value: "248",
      icon: Users,
      description: "45 mới tuần này",
      color: "text-blue-600",
    },
    {
      title: "Tài liệu",
      value: "86",
      icon: FileText,
      description: "12 tài liệu mới",
      color: "text-green-600",
    },
    {
      title: "Đề thi",
      value: "24",
      icon: Award,
      description: "5 đề sắp tới",
      color: "text-orange-600",
    },
  ];

  const recentCourses = [
    {
      name: "Lập trình Web nâng cao",
      students: 45,
      completion: 78,
      status: "Đang hoạt động",
    },
    {
      name: "Cấu trúc dữ liệu và giải thuật",
      students: 62,
      completion: 65,
      status: "Đang hoạt động",
    },
    {
      name: "Cơ sở dữ liệu",
      students: 38,
      completion: 82,
      status: "Đang hoạt động",
    },
  ];

  const upcomingTasks = [
    { task: "Chấm bài kiểm tra giữa kỳ - Web nâng cao", deadline: "2 ngày", priority: "high" },
    { task: "Cập nhật tài liệu bài 5 - CTDL", deadline: "5 ngày", priority: "medium" },
    { task: "Tạo đề thi cuối kỳ - CSDL", deadline: "1 tuần", priority: "medium" },
    { task: "Review bài tập nhóm", deadline: "3 ngày", priority: "low" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Dashboard Giảng viên</h1>
            </div>
          </header>

          <main className="flex-1 p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Khóa học gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentCourses.map((course, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{course.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {course.students} học sinh • {course.status}
                            </p>
                          </div>
                          <span className="text-sm font-medium">{course.completion}%</span>
                        </div>
                        <Progress value={course.completion} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>Công việc sắp tới</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                        <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{item.task}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Hạn: {item.deadline}</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                item.priority === "high"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                  : item.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              }`}
                            >
                              {item.priority === "high"
                                ? "Cao"
                                : item.priority === "medium"
                                ? "Trung bình"
                                : "Thấp"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Chart */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Hoạt động gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">Hôm nay:</span>
                    <span className="font-medium">15 học sinh mới đăng ký khóa học</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Hôm qua:</span>
                    <span className="font-medium">Đã chấm 28 bài kiểm tra</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-muted-foreground">2 ngày trước:</span>
                    <span className="font-medium">Cập nhật 5 tài liệu mới</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorDashboard;
