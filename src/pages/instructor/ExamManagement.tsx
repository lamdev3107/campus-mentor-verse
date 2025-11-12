import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreVertical, Edit, Trash2, FileText, Calendar } from "lucide-react";
import { useState } from "react";

const ExamManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const exams = [
    {
      id: 1,
      title: "Kiểm tra giữa kỳ - Web nâng cao",
      course: "CS301",
      type: "Giữa kỳ",
      duration: "90 phút",
      date: "15/12/2024",
      questions: 30,
      status: "Sắp diễn ra",
    },
    {
      id: 2,
      title: "Bài kiểm tra 15 phút - CTDL",
      course: "CS202",
      type: "Thường xuyên",
      duration: "15 phút",
      date: "20/12/2024",
      questions: 10,
      status: "Sắp diễn ra",
    },
    {
      id: 3,
      title: "Thi cuối kỳ - Cơ sở dữ liệu",
      course: "CS303",
      type: "Cuối kỳ",
      duration: "120 phút",
      date: "10/01/2025",
      questions: 40,
      status: "Chưa diễn ra",
    },
    {
      id: 4,
      title: "Kiểm tra giữa kỳ - OOP",
      course: "CS201",
      type: "Giữa kỳ",
      duration: "90 phút",
      date: "05/11/2024",
      questions: 25,
      status: "Đã kết thúc",
    },
  ];

  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Quản lý đề thi</h1>
            </div>
          </header>

          <main className="flex-1 p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tổng đề thi</p>
                      <p className="text-2xl font-bold mt-1">24</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Sắp diễn ra</p>
                      <p className="text-2xl font-bold mt-1">5</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Đã kết thúc</p>
                      <p className="text-2xl font-bold mt-1">15</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Chưa diễn ra</p>
                      <p className="text-2xl font-bold mt-1">4</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exam List */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Danh sách đề thi</CardTitle>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Tìm kiếm đề thi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Tạo đề thi
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên đề thi</TableHead>
                      <TableHead>Khóa học</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Ngày thi</TableHead>
                      <TableHead>Câu hỏi</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.title}</TableCell>
                        <TableCell>{exam.course}</TableCell>
                        <TableCell>{exam.type}</TableCell>
                        <TableCell>{exam.duration}</TableCell>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>{exam.questions}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              exam.status === "Sắp diễn ra"
                                ? "default"
                                : exam.status === "Đã kết thúc"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {exam.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="w-4 h-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ExamManagement;
