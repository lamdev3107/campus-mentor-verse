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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, Edit, Trash2, Eye, MoreVertical, Upload, UserCheck, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredTeachers = mockTeachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTeachers(filteredTeachers.map((t) => t.id));
    } else {
      setSelectedTeachers([]);
    }
  };

  const handleSelectTeacher = (teacherId: number, checked: boolean) => {
    if (checked) {
      setSelectedTeachers([...selectedTeachers, teacherId]);
    } else {
      setSelectedTeachers(selectedTeachers.filter((id) => id !== teacherId));
    }
  };

  const handleViewDetails = (teacher: typeof mockTeachers[0]) => {
    toast.info(`Xem chi tiết: ${teacher.name}`);
  };

  const handleEditTeacher = (teacher: typeof mockTeachers[0]) => {
    toast.info(`Chỉnh sửa: ${teacher.name}`);
  };

  const handleDeleteTeacher = (teacher: typeof mockTeachers[0]) => {
    toast.error(`Xóa giảng viên: ${teacher.name}`);
  };

  const handleToggleStatus = (teacher: typeof mockTeachers[0]) => {
    const newStatus = teacher.status === "active" ? "inactive" : "active";
    toast.success(`${teacher.name} đã được ${newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"}`);
  };

  const handleImportExcel = () => {
    toast.info("Chức năng import Excel đang được phát triển");
  };

  const handleAddTeacher = () => {
    toast.success("Thêm giảng viên thành công");
    setIsAddDialogOpen(false);
  };

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
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleImportExcel}>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Excel
                    </Button>
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
                          <Button type="submit" onClick={handleAddTeacher}>Thêm giảng viên</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm giảng viên..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {selectedTeachers.length > 0 && (
                    <div className="flex gap-2">
                      <Badge variant="secondary">{selectedTeachers.length} đã chọn</Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast.success(`Kích hoạt ${selectedTeachers.length} tài khoản`);
                          setSelectedTeachers([]);
                        }}
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Kích hoạt
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast.warning(`Vô hiệu hóa ${selectedTeachers.length} tài khoản`);
                          setSelectedTeachers([]);
                        }}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Vô hiệu hóa
                      </Button>
                    </div>
                  )}
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedTeachers.length === filteredTeachers.length && filteredTeachers.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
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
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedTeachers.includes(teacher.id)}
                            onCheckedChange={(checked) => handleSelectTeacher(teacher.id, checked as boolean)}
                          />
                        </TableCell>
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
                        <TableCell>{teacher.courses}</TableCell>
                        <TableCell>{teacher.students}</TableCell>
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(teacher)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditTeacher(teacher)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(teacher)}>
                                {teacher.status === "active" ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-2" />
                                    Vô hiệu hóa
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Kích hoạt
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteTeacher(teacher)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Xóa tài khoản
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

export default TeacherManagement;
