import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Edit, Trash2, Eye, BookOpen, Users } from "lucide-react";
import { useState } from "react";

const mockTeachers = [
  {
    id: 1,
    name: "Trần Văn Minh",
    email: "tranvanminh@email.com",
    avatar: "",
    specialty: "Lập trình Web",
    courses: 12,
    students: 456,
    rating: 4.8,
    status: "active",
  },
  {
    id: 2,
    name: "Nguyễn Thị Hoa",
    email: "nguyenthihoa@email.com",
    avatar: "",
    specialty: "Data Science",
    courses: 8,
    students: 234,
    rating: 4.9,
    status: "active",
  },
  {
    id: 3,
    name: "Lê Quang Huy",
    email: "lequanghuy@email.com",
    avatar: "",
    specialty: "Mobile Development",
    courses: 6,
    students: 189,
    rating: 4.7,
    status: "inactive",
  },
];

const TeacherManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-xl font-semibold">Quản lý giảng viên</h1>
          </header>

          <main className="flex-1 p-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Tổng giảng viên
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+5</span> so với tháng trước
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Đang hoạt động
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76</div>
                  <p className="text-xs text-muted-foreground">85.4% tổng số</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Đánh giá trung bình
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5.0</div>
                  <p className="text-xs text-muted-foreground">Từ 2,345 đánh giá</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Danh sách giảng viên</CardTitle>
                    <CardDescription>Quản lý thông tin và hoạt động của giảng viên</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm giảng viên
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Thêm giảng viên mới</DialogTitle>
                        <DialogDescription>Nhập thông tin giảng viên</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Họ và tên</Label>
                          <Input id="name" placeholder="Nhập họ và tên" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="email@example.com" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="specialty">Chuyên môn</Label>
                          <Input id="specialty" placeholder="VD: Lập trình Web" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="bio">Giới thiệu</Label>
                          <Textarea id="bio" placeholder="Mô tả ngắn về giảng viên" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Thêm giảng viên</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm giảng viên..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Giảng viên</TableHead>
                      <TableHead>Chuyên môn</TableHead>
                      <TableHead>Khóa học</TableHead>
                      <TableHead>Học sinh</TableHead>
                      <TableHead>Đánh giá</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={teacher.avatar} />
                              <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{teacher.name}</div>
                              <div className="text-sm text-muted-foreground">{teacher.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{teacher.specialty}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>{teacher.courses}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{teacher.students}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{teacher.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                            {teacher.status === "active" ? "Hoạt động" : "Không hoạt động"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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

export default TeacherManagement;
