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
import { Plus, Search, MoreVertical, Edit, Trash2, Download, FileText, Video, Image as ImageIcon, File } from "lucide-react";
import { useState } from "react";

const MaterialsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const materials = [
    {
      id: 1,
      title: "Slide bài 1 - Giới thiệu Web",
      course: "CS301",
      type: "PDF",
      size: "2.5 MB",
      downloads: 45,
      uploadDate: "01/12/2024",
      status: "Công khai",
    },
    {
      id: 2,
      title: "Video hướng dẫn - Cài đặt môi trường",
      course: "CS301",
      type: "Video",
      size: "125 MB",
      downloads: 38,
      uploadDate: "03/12/2024",
      status: "Công khai",
    },
    {
      id: 3,
      title: "Bài tập thực hành tuần 3",
      course: "CS202",
      type: "PDF",
      size: "1.2 MB",
      downloads: 62,
      uploadDate: "05/12/2024",
      status: "Công khai",
    },
    {
      id: 4,
      title: "Source code ví dụ - Stack & Queue",
      course: "CS202",
      type: "ZIP",
      size: "0.8 MB",
      downloads: 55,
      uploadDate: "07/12/2024",
      status: "Công khai",
    },
    {
      id: 5,
      title: "Đề cương môn học CSDL",
      course: "CS303",
      type: "PDF",
      size: "0.5 MB",
      downloads: 38,
      uploadDate: "28/11/2024",
      status: "Riêng tư",
    },
  ];

  const filteredMaterials = materials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">Quản lý tài liệu</h1>
            </div>
          </header>

          <main className="flex-1 p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tổng tài liệu</p>
                      <p className="text-2xl font-bold mt-1">86</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">PDF</p>
                      <p className="text-2xl font-bold mt-1">52</p>
                    </div>
                    <FileText className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Video</p>
                      <p className="text-2xl font-bold mt-1">18</p>
                    </div>
                    <Video className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Khác</p>
                      <p className="text-2xl font-bold mt-1">16</p>
                    </div>
                    <File className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Materials List */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Danh sách tài liệu</CardTitle>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Tìm kiếm tài liệu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Tải lên
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên tài liệu</TableHead>
                      <TableHead>Khóa học</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Kích thước</TableHead>
                      <TableHead>Lượt tải</TableHead>
                      <TableHead>Ngày tải lên</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getFileIcon(material.type)}
                            {material.title}
                          </div>
                        </TableCell>
                        <TableCell>{material.course}</TableCell>
                        <TableCell>{material.type}</TableCell>
                        <TableCell>{material.size}</TableCell>
                        <TableCell>{material.downloads}</TableCell>
                        <TableCell>{material.uploadDate}</TableCell>
                        <TableCell>
                          <Badge variant={material.status === "Công khai" ? "default" : "secondary"}>
                            {material.status}
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
                                <Download className="w-4 h-4 mr-2" />
                                Tải xuống
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
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

export default MaterialsManagement;
