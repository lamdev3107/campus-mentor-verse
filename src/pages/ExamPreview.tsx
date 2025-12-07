import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Clock, 
  FileQuestion, 
  Calendar, 
  User, 
  BookOpen, 
  AlertTriangle,
  CheckCircle2,
  Info,
  Play
} from "lucide-react";

const ExamPreview = () => {
  const navigate = useNavigate();
  const [agreedToRules, setAgreedToRules] = useState(false);

  // Mock exam data
  const examData = {
    id: "1",
    title: "Kiểm tra giữa kỳ - Lập trình Web",
    description: "Bài kiểm tra đánh giá kiến thức về HTML, CSS, JavaScript và React. Bao gồm các câu hỏi lý thuyết và thực hành cơ bản.",
    course: "Lập trình Web nâng cao",
    instructor: "ThS. Nguyễn Văn A",
    duration: 60,
    totalQuestions: 40,
    passingScore: 60,
    maxAttempts: 2,
    attemptsUsed: 0,
    startDate: "2024-01-15T08:00:00",
    endDate: "2024-01-20T23:59:00",
    questionTypes: [
      { type: "Trắc nghiệm một đáp án", count: 30 },
      { type: "Trắc nghiệm nhiều đáp án", count: 10 }
    ],
    rules: [
      "Không được sử dụng tài liệu hoặc thiết bị hỗ trợ",
      "Không được rời khỏi trang thi trong quá trình làm bài",
      "Bài thi sẽ tự động nộp khi hết thời gian",
      "Mỗi câu hỏi chỉ được chọn một lần, không thể thay đổi sau khi chuyển câu",
      "Đảm bảo kết nối internet ổn định trong suốt quá trình thi"
    ],
    topics: ["HTML5 & Semantic", "CSS3 & Flexbox", "JavaScript ES6+", "React Hooks", "State Management"]
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      dateStyle: "long",
      timeStyle: "short"
    });
  };

  const handleStartExam = () => {
    navigate("/exam-taking");
  };

  const remainingAttempts = examData.maxAttempts - examData.attemptsUsed;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <TopBar />
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{examData.title}</h1>
                  <p className="text-muted-foreground mt-2">{examData.course}</p>
                </div>
                <Badge variant="outline" className="text-base px-4 py-1">
                  {remainingAttempts} lượt còn lại
                </Badge>
              </div>

              {/* Exam Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Thời gian</p>
                      <p className="font-semibold">{examData.duration} phút</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileQuestion className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Số câu hỏi</p>
                      <p className="font-semibold">{examData.totalQuestions} câu</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Điểm đạt</p>
                      <p className="font-semibold">{examData.passingScore}%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Giảng viên</p>
                      <p className="font-semibold text-sm">{examData.instructor}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Description & Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Mô tả bài thi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{examData.description}</p>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-3">Nội dung kiểm tra:</h4>
                    <div className="flex flex-wrap gap-2">
                      {examData.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Cấu trúc đề thi:</h4>
                    <div className="space-y-2">
                      {examData.questionTypes.map((qt, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span>{qt.type}</span>
                          <Badge variant="outline">{qt.count} câu</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Thời gian thi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Bắt đầu</p>
                      <p className="font-medium">{formatDate(examData.startDate)}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Kết thúc</p>
                      <p className="font-medium">{formatDate(examData.endDate)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rules */}
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Quy định làm bài
                  </CardTitle>
                  <CardDescription>
                    Vui lòng đọc kỹ các quy định trước khi bắt đầu làm bài
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {examData.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 text-destructive text-sm flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>

                  <Separator />

                  <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
                    <Checkbox 
                      id="agree-rules" 
                      checked={agreedToRules}
                      onCheckedChange={(checked) => setAgreedToRules(checked as boolean)}
                    />
                    <label 
                      htmlFor="agree-rules" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Tôi đã đọc và đồng ý với các quy định làm bài
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Quay lại
                </Button>
                <Button 
                  size="lg" 
                  disabled={!agreedToRules || remainingAttempts <= 0}
                  onClick={handleStartExam}
                  className="gap-2"
                >
                  <Play className="h-4 w-4" />
                  Bắt đầu làm bài
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ExamPreview;
