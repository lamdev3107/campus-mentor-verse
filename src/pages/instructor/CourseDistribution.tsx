import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { UserPlus, MoreVertical, Trash2, Mail } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  email: string;
  studentCode: string;
  enrolledDate: string;
  progress: number;
}

interface AvailableStudent {
  id: string;
  name: string;
  email: string;
  studentCode: string;
}

export default function CourseDistribution() {
  const [isPublished, setIsPublished] = useState(false);
  const [distributionType, setDistributionType] = useState<"limited" | "public">("limited");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [availableSearchQuery, setAvailableSearchQuery] = useState("");

  // Mock data - sinh viên đang tham gia khóa học
  const [enrolledStudents, setEnrolledStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      studentCode: "SV001",
      enrolledDate: "2024-01-15",
      progress: 75,
    },
    {
      id: "2",
      name: "Trần Thị Bình",
      email: "binh.tran@email.com",
      studentCode: "SV002",
      enrolledDate: "2024-01-16",
      progress: 60,
    },
    {
      id: "3",
      name: "Lê Văn Cường",
      email: "cuong.le@email.com",
      studentCode: "SV003",
      enrolledDate: "2024-01-17",
      progress: 90,
    },
  ]);

  // Mock data - danh sách sinh viên có thể thêm
  const availableStudents: AvailableStudent[] = [
    { id: "4", name: "Phạm Thị Dung", email: "dung.pham@email.com", studentCode: "SV004" },
    { id: "5", name: "Hoàng Văn Em", email: "em.hoang@email.com", studentCode: "SV005" },
    { id: "6", name: "Đỗ Thị Phương", email: "phuong.do@email.com", studentCode: "SV006" },
    { id: "7", name: "Vũ Văn Giang", email: "giang.vu@email.com", studentCode: "SV007" },
  ];

  const filteredEnrolledStudents = enrolledStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailableStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(availableSearchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(availableSearchQuery.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(availableSearchQuery.toLowerCase())
  );

  const handlePublishToggle = (checked: boolean) => {
    setIsPublished(checked);
    toast.success(checked ? "Khóa học đã được xuất bản" : "Khóa học đã chuyển về bản nháp");
  };

  const handleDistributionChange = (value: string) => {
    setDistributionType(value as "limited" | "public");
    toast.success(
      value === "public"
        ? "Khóa học đã được đặt ở chế độ công khai"
        : "Khóa học đã được đặt ở chế độ giới hạn"
    );
  };

  const handleAddStudents = () => {
    if (selectedStudents.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sinh viên");
      return;
    }

    const studentsToAdd = availableStudents
      .filter((s) => selectedStudents.includes(s.id))
      .map((s) => ({
        ...s,
        enrolledDate: new Date().toISOString().split("T")[0],
        progress: 0,
      }));

    setEnrolledStudents([...enrolledStudents, ...studentsToAdd]);
    setSelectedStudents([]);
    setIsAddDialogOpen(false);
    toast.success(`Đã thêm ${studentsToAdd.length} sinh viên vào khóa học`);
  };

  const handleRemoveStudent = (studentId: string) => {
    setEnrolledStudents(enrolledStudents.filter((s) => s.id !== studentId));
    toast.success("Đã xóa sinh viên khỏi khóa học");
  };

  const handleSendEmail = (studentEmail: string) => {
    toast.success(`Đã gửi email đến ${studentEmail}`);
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredAvailableStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredAvailableStudents.map((s) => s.id));
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 space-y-6 p-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cấu hình phân phối khóa học</h1>
            <p className="text-muted-foreground mt-2">
              Quản lý trạng thái xuất bản và phân phối khóa học
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Trạng thái xuất bản */}
            <Card>
              <CardHeader>
                <CardTitle>Trạng thái xuất bản</CardTitle>
                <CardDescription>
                  Chọn trạng thái hiển thị của khóa học
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="publish-toggle" className="text-base">
                      {isPublished ? "Đã xuất bản" : "Bản nháp"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {isPublished
                        ? "Khóa học đang hiển thị với sinh viên"
                        : "Khóa học chưa được xuất bản"}
                    </p>
                  </div>
                  <Switch
                    id="publish-toggle"
                    checked={isPublished}
                    onCheckedChange={handlePublishToggle}
                  />
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <Badge variant={isPublished ? "default" : "secondary"}>
                    {isPublished ? "Đã xuất bản" : "Bản nháp"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Cấu hình phân phối */}
            <Card>
              <CardHeader>
                <CardTitle>Cấu hình phân phối</CardTitle>
                <CardDescription>
                  Chọn đối tượng có thể truy cập khóa học
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={distributionType}
                  onValueChange={handleDistributionChange}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="limited" id="limited" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="limited" className="text-base cursor-pointer">
                        Giới hạn
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Chỉ sinh viên được thêm vào danh sách mới có thể xem và truy cập
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="public" id="public" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="public" className="text-base cursor-pointer">
                        Công khai
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Tất cả sinh viên có thể tìm thấy và tham gia khóa học
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Danh sách sinh viên */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Sinh viên tham gia</CardTitle>
                  <CardDescription>
                    Quản lý danh sách sinh viên đang tham gia khóa học
                  </CardDescription>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Thêm sinh viên
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Thêm sinh viên vào khóa học</DialogTitle>
                      <DialogDescription>
                        Chọn sinh viên để thêm vào khóa học
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Tìm kiếm sinh viên..."
                        value={availableSearchQuery}
                        onChange={(e) => setAvailableSearchQuery(e.target.value)}
                      />
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">
                                <Checkbox
                                  checked={
                                    selectedStudents.length === filteredAvailableStudents.length &&
                                    filteredAvailableStudents.length > 0
                                  }
                                  onCheckedChange={toggleSelectAll}
                                />
                              </TableHead>
                              <TableHead>Mã SV</TableHead>
                              <TableHead>Họ và tên</TableHead>
                              <TableHead>Email</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredAvailableStudents.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                  Không tìm thấy sinh viên
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredAvailableStudents.map((student) => (
                                <TableRow key={student.id}>
                                  <TableCell>
                                    <Checkbox
                                      checked={selectedStudents.includes(student.id)}
                                      onCheckedChange={() => toggleStudentSelection(student.id)}
                                    />
                                  </TableCell>
                                  <TableCell>{student.studentCode}</TableCell>
                                  <TableCell>{student.name}</TableCell>
                                  <TableCell>{student.email}</TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleAddStudents}>
                        Thêm {selectedStudents.length > 0 && `(${selectedStudents.length})`}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Tìm kiếm sinh viên..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã SV</TableHead>
                        <TableHead>Họ và tên</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Ngày tham gia</TableHead>
                        <TableHead>Tiến độ</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEnrolledStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            {searchQuery
                              ? "Không tìm thấy sinh viên"
                              : "Chưa có sinh viên nào tham gia khóa học"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredEnrolledStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.studentCode}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.enrolledDate}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-secondary rounded-full h-2 max-w-[100px]">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${student.progress}%` }}
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground">{student.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleSendEmail(student.email)}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Gửi email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleRemoveStudent(student.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Xóa khỏi khóa học
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
