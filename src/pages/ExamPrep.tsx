import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Target, Trophy, BookOpen, PlayCircle } from "lucide-react";

// Mock data for exam preparation
const examSets = [
  {
    id: "1",
    title: "Kiểm tra giữa kỳ - React Fundamentals",
    subject: "Lập trình React nâng cao",
    type: "Trắc nghiệm",
    questions: 30,
    duration: "45 phút",
    difficulty: "Trung bình",
    attempts: 156,
    averageScore: 78,
    myBestScore: 85,
    completedAttempts: 3,
    lastAttempt: "2024-01-20",
  },
  {
    id: "2",
    title: "Đề thi cuối kỳ - Database Design",
    subject: "Hệ quản trị cơ sở dữ liệu",
    type: "Tự luận + Trắc nghiệm",
    questions: 25,
    duration: "90 phút",
    difficulty: "Khó",
    attempts: 89,
    averageScore: 72,
    myBestScore: 0,
    completedAttempts: 0,
    lastAttempt: null,
  },
  {
    id: "3",
    title: "Quiz tuần 3 - Software Engineering",
    subject: "Kỹ thuật phần mềm",
    type: "Trắc nghiệm",
    questions: 15,
    duration: "20 phút",
    difficulty: "Dễ",
    attempts: 234,
    averageScore: 84,
    myBestScore: 93,
    completedAttempts: 2,
    lastAttempt: "2024-01-18",
  },
  {
    id: "4",
    title: "Bài kiểm tra - Machine Learning Basics",
    subject: "Trí tuệ nhân tạo",
    type: "Trắc nghiệm",
    questions: 40,
    duration: "60 phút",
    difficulty: "Khó",
    attempts: 67,
    averageScore: 69,
    myBestScore: 76,
    completedAttempts: 1,
    lastAttempt: "2024-01-15",
  },
];

const studyPlans = [
  {
    id: "1",
    title: "Ôn tập React Hooks",
    subject: "Lập trình React nâng cao",
    progress: 75,
    totalLessons: 8,
    completedLessons: 6,
    estimatedTime: "2 giờ",
    dueDate: "2024-02-01",
  },
  {
    id: "2",
    title: "Ôn tập SQL & NoSQL",
    subject: "Hệ quản trị cơ sở dữ liệu",
    progress: 40,
    totalLessons: 12,
    completedLessons: 5,
    estimatedTime: "4 giờ",
    dueDate: "2024-02-05",
  },
  {
    id: "3",
    title: "Thuật toán Machine Learning",
    subject: "Trí tuệ nhân tạo",
    progress: 20,
    totalLessons: 15,
    completedLessons: 3,
    estimatedTime: "6 giờ",
    dueDate: "2024-02-10",
  },
];

const ExamPrep = () => {
  const [selectedTab, setSelectedTab] = useState("exams");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ": return "bg-green-100 text-green-800";
      case "Trung bình": return "bg-yellow-100 text-yellow-800";
      case "Khó": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    if (type.includes("Trắc nghiệm")) return "bg-blue-100 text-blue-800";
    if (type.includes("Tự luận")) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ôn luyện thi
          </h1>
          <p className="text-muted-foreground">
            Luyện tập với các đề thi mẫu và theo dõi tiến độ ôn tập của bạn.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <button
              onClick={() => setSelectedTab("exams")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedTab === "exams"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Đề thi & Kiểm tra
            </button>
            <button
              onClick={() => setSelectedTab("study-plans")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedTab === "study-plans"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Kế hoạch ôn tập
            </button>
          </div>
        </div>

        {/* Exam Sets Tab */}
        {selectedTab === "exams" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {examSets.map((exam) => (
              <Card key={exam.id} className="bg-course-card shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">{exam.title}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge className={getDifficultyColor(exam.difficulty)}>
                        {exam.difficulty}
                      </Badge>
                      <Badge className={getTypeColor(exam.type)}>
                        {exam.type}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{exam.subject}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span>{exam.questions} câu hỏi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{exam.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{exam.attempts} lượt thi</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-muted-foreground" />
                      <span>TB: {exam.averageScore}%</span>
                    </div>
                  </div>

                  {exam.completedAttempts > 0 && (
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Kết quả của bạn</span>
                        <Badge variant="outline" className="text-primary">
                          Điểm cao nhất: {exam.myBestScore}%
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Đã làm {exam.completedAttempts} lần • Lần cuối: {exam.lastAttempt}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {exam.completedAttempts > 0 ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Xem kết quả
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Làm lại
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="w-full bg-gradient-primary hover:opacity-90">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Bắt đầu thi
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Study Plans Tab */}
        {selectedTab === "study-plans" && (
          <div className="space-y-6">
            {studyPlans.map((plan) => (
              <Card key={plan.id} className="bg-course-card shadow-card hover:shadow-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {plan.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{plan.subject}</p>
                    </div>
                    <Badge variant="outline" className="text-accent">
                      Hạn: {plan.dueDate}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Tiến độ</span>
                        <span className="font-medium">{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Bài học:</span>
                        <div className="font-medium">
                          {plan.completedLessons}/{plan.totalLessons}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Thời gian còn lại:</span>
                        <div className="font-medium">{plan.estimatedTime}</div>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                          Tiếp tục
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamPrep;