import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Download, Eye, FileText, Video, Search } from "lucide-react";

// Mock data for study materials
const studyMaterials = [
  {
    id: "1",
    title: "Lập trình React - Bài giảng tuần 1",
    type: "PDF",
    subject: "Lập trình React nâng cao",
    instructor: "TS. Nguyễn Văn Tuấn",
    uploadDate: "2024-01-15",
    downloads: 245,
    size: "2.5 MB",
    description: "Giới thiệu về React, JSX và components cơ bản",
  },
  {
    id: "2",
    title: "Video bài giảng: React Hooks",
    type: "Video",
    subject: "Lập trình React nâng cao",
    instructor: "TS. Nguyễn Văn Tuấn",
    uploadDate: "2024-01-20",
    downloads: 189,
    size: "150 MB",
    description: "Hướng dẫn sử dụng useState, useEffect và custom hooks",
  },
  {
    id: "3",
    title: "Thiết kế CSDL - Slide bài giảng",
    type: "PowerPoint",
    subject: "Hệ quản trị cơ sở dữ liệu",
    instructor: "PGS. Trần Thị Hoa",
    uploadDate: "2024-01-18",
    downloads: 156,
    size: "5.2 MB",
    description: "Các nguyên tắc thiết kế cơ sở dữ liệu quan hệ",
  },
  {
    id: "4",
    title: "Bài tập thực hành SQL",
    type: "Document",
    subject: "Hệ quản trị cơ sở dữ liệu",
    instructor: "PGS. Trần Thị Hoa",
    uploadDate: "2024-01-22",
    downloads: 298,
    size: "1.8 MB",
    description: "Tập hợp các bài tập SQL từ cơ bản đến nâng cao",
  },
  {
    id: "5",
    title: "Machine Learning cơ bản",
    type: "PDF",
    subject: "Trí tuệ nhân tạo",
    instructor: "PGS. Phạm Văn Long",
    uploadDate: "2024-01-25",
    downloads: 134,
    size: "8.7 MB",
    description: "Giáo trình về các thuật toán machine learning cơ bản",
  },
];

const StudyMaterials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Tất cả");

  const subjects = ["Tất cả", ...new Set(studyMaterials.map(material => material.subject))];
  
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "Tất cả" || material.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video": return <Video className="w-5 h-5" />;
      case "PDF": return <FileText className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Video": return "bg-red-100 text-red-800";
      case "PDF": return "bg-blue-100 text-blue-800";
      case "PowerPoint": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tài liệu học tập
          </h1>
          <p className="text-muted-foreground">
            Truy cập các tài liệu học tập, bài giảng và tài nguyên học tập từ các khóa học của bạn.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm tài liệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <Badge
                key={subject}
                variant={selectedSubject === subject ? "default" : "secondary"}
                className={`cursor-pointer transition-all ${
                  selectedSubject === subject 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="bg-course-card shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(material.type)}
                    <Badge className={getTypeColor(material.type)}>
                      {material.type}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{material.size}</span>
                </div>
                
                <CardTitle className="text-lg line-clamp-2">{material.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {material.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Môn học:</span> {material.subject}
                  </div>
                  <div>
                    <span className="font-medium">Giảng viên:</span> {material.instructor}
                  </div>
                  <div>
                    <span className="font-medium">Ngày tải lên:</span> {material.uploadDate}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{material.downloads} lượt tải</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem trước
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90">
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Không tìm thấy tài liệu
            </h3>
            <p className="text-muted-foreground">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc môn học.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudyMaterials;