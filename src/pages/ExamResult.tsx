import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Trophy, 
  Clock, 
  Target,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswers: number[];
  userAnswers: number[];
  type: "single" | "multiple";
}

// Mock data - kết quả bài thi
const examResult = {
  examTitle: "Kiểm tra giữa kỳ - Lập trình Web",
  submittedAt: "2024-01-15 10:45:00",
  duration: "45 phút",
  timeSpent: "38 phút 22 giây",
  totalQuestions: 10,
  correctCount: 7,
  wrongCount: 3,
  score: 70,
  passingScore: 60,
  questions: [
    {
      id: 1,
      question: "HTML là viết tắt của từ gì?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      correctAnswers: [0],
      userAnswers: [0],
      type: "single" as const
    },
    {
      id: 2,
      question: "CSS được sử dụng để làm gì?",
      options: [
        "Tạo cấu trúc trang web",
        "Định dạng và trang trí giao diện",
        "Xử lý logic phía server",
        "Quản lý cơ sở dữ liệu"
      ],
      correctAnswers: [1],
      userAnswers: [1],
      type: "single" as const
    },
    {
      id: 3,
      question: "Những thuộc tính nào thuộc về CSS Box Model?",
      options: ["margin", "padding", "font-size", "border"],
      correctAnswers: [0, 1, 3],
      userAnswers: [0, 1],
      type: "multiple" as const
    },
    {
      id: 4,
      question: "JavaScript là ngôn ngữ lập trình?",
      options: [
        "Phía client",
        "Phía server",
        "Cả client và server",
        "Không phải ngôn ngữ lập trình"
      ],
      correctAnswers: [2],
      userAnswers: [0],
      type: "single" as const
    },
    {
      id: 5,
      question: "React là gì?",
      options: [
        "Một framework backend",
        "Một thư viện JavaScript để xây dựng UI",
        "Một cơ sở dữ liệu",
        "Một ngôn ngữ lập trình"
      ],
      correctAnswers: [1],
      userAnswers: [1],
      type: "single" as const
    },
    {
      id: 6,
      question: "Các hook cơ bản trong React bao gồm?",
      options: ["useState", "useEffect", "useRouter", "useContext"],
      correctAnswers: [0, 1, 3],
      userAnswers: [0, 1, 3],
      type: "multiple" as const
    },
    {
      id: 7,
      question: "NPM là viết tắt của?",
      options: [
        "Node Package Manager",
        "New Programming Method",
        "Node Program Manager",
        "Network Package Manager"
      ],
      correctAnswers: [0],
      userAnswers: [0],
      type: "single" as const
    },
    {
      id: 8,
      question: "Flexbox được sử dụng để?",
      options: [
        "Tạo layout một chiều",
        "Tạo layout hai chiều",
        "Xử lý animation",
        "Quản lý state"
      ],
      correctAnswers: [0],
      userAnswers: [1],
      type: "single" as const
    },
    {
      id: 9,
      question: "TypeScript là?",
      options: [
        "Một ngôn ngữ hoàn toàn mới",
        "Một superset của JavaScript",
        "Một framework",
        "Một thư viện CSS"
      ],
      correctAnswers: [1],
      userAnswers: [1],
      type: "single" as const
    },
    {
      id: 10,
      question: "Các phương thức HTTP phổ biến là?",
      options: ["GET", "POST", "SEND", "DELETE"],
      correctAnswers: [0, 1, 3],
      userAnswers: [0, 1, 3],
      type: "multiple" as const
    }
  ] as Question[]
};

const ExamResult = () => {
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  const isPassed = examResult.score >= examResult.passingScore;

  const isCorrect = (question: Question) => {
    if (question.correctAnswers.length !== question.userAnswers.length) return false;
    return question.correctAnswers.every(ans => question.userAnswers.includes(ans));
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const expandAll = () => {
    setExpandedQuestions(examResult.questions.map(q => q.id));
  };

  const collapseAll = () => {
    setExpandedQuestions([]);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kết quả bài thi</h1>
            <p className="text-muted-foreground">{examResult.examTitle}</p>
          </div>
        </div>

        {/* Score Card */}
        <Card className={`border-2 ${isPassed ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5'}`}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center justify-center w-32 h-32 rounded-full bg-background border-4 border-primary">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{examResult.score}</div>
                  <div className="text-sm text-muted-foreground">điểm</div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Trophy className={`h-6 w-6 ${isPassed ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-xl font-semibold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                    {isPassed ? 'Đạt yêu cầu' : 'Chưa đạt yêu cầu'}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Điểm đạt tối thiểu: {examResult.passingScore} điểm
                </p>
                <Progress value={examResult.score} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold">{examResult.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Tổng câu hỏi</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold text-green-600">{examResult.correctCount}</div>
              <div className="text-sm text-muted-foreground">Câu đúng</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 mx-auto text-red-500 mb-2" />
              <div className="text-2xl font-bold text-red-600">{examResult.wrongCount}</div>
              <div className="text-sm text-muted-foreground">Câu sai</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-lg font-bold">{examResult.timeSpent}</div>
              <div className="text-sm text-muted-foreground">Thời gian làm</div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Thời gian cho phép:</span>
                <span className="font-medium">{examResult.duration}</span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Nộp bài lúc:</span>
                <span className="font-medium">{examResult.submittedAt}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Review */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Chi tiết bài làm</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={expandAll}>
                Mở tất cả
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll}>
                Thu gọn
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {examResult.questions.map((question, index) => {
                  const correct = isCorrect(question);
                  const isExpanded = expandedQuestions.includes(question.id);
                  
                  return (
                    <div 
                      key={question.id}
                      className={`border rounded-lg overflow-hidden ${
                        correct ? 'border-green-500/30' : 'border-red-500/30'
                      }`}
                    >
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className={`w-full p-4 flex items-center justify-between text-left ${
                          correct ? 'bg-green-500/5' : 'bg-red-500/5'
                        } hover:bg-muted/50 transition-colors`}
                      >
                        <div className="flex items-center gap-3">
                          {correct ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                          )}
                          <span className="font-medium">Câu {index + 1}</span>
                          <Badge variant={question.type === "multiple" ? "secondary" : "outline"} className="text-xs">
                            {question.type === "multiple" ? "Nhiều đáp án" : "Một đáp án"}
                          </Badge>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="p-4 border-t bg-background space-y-4">
                          <p className="font-medium text-foreground">{question.question}</p>
                          
                          <div className="space-y-2">
                            {question.options.map((option, optIndex) => {
                              const isUserAnswer = question.userAnswers.includes(optIndex);
                              const isCorrectAnswer = question.correctAnswers.includes(optIndex);
                              
                              let bgColor = "bg-muted/30";
                              let borderColor = "border-transparent";
                              
                              if (isCorrectAnswer) {
                                bgColor = "bg-green-500/10";
                                borderColor = "border-green-500";
                              } else if (isUserAnswer && !isCorrectAnswer) {
                                bgColor = "bg-red-500/10";
                                borderColor = "border-red-500";
                              }
                              
                              return (
                                <div 
                                  key={optIndex}
                                  className={`p-3 rounded-lg border-2 ${bgColor} ${borderColor} flex items-center justify-between`}
                                >
                                  <span className={isCorrectAnswer ? "text-green-700 dark:text-green-400" : ""}>
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    {isUserAnswer && (
                                      <Badge variant={isCorrectAnswer ? "default" : "destructive"} className="text-xs">
                                        Đã chọn
                                      </Badge>
                                    )}
                                    {isCorrectAnswer && (
                                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate('/exam-prep')}>
            Quay lại danh sách
          </Button>
          <Button onClick={() => navigate('/exam-taking')}>
            Làm lại bài thi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
