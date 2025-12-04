import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Clock, CheckCircle, Circle, AlertTriangle, Flag, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  type: "single" | "multiple";
  answers: Answer[];
  points: number;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  totalPoints: number;
  questions: Question[];
}

const mockExam: Exam = {
  id: "1",
  title: "Kiểm tra giữa kỳ - Lập trình Web",
  subject: "Lập trình Web",
  duration: 60,
  totalPoints: 100,
  questions: [
    {
      id: "q1",
      text: "HTML là viết tắt của?",
      type: "single",
      points: 10,
      answers: [
        { id: "a1", text: "Hyper Text Markup Language", isCorrect: true },
        { id: "a2", text: "High Tech Modern Language", isCorrect: false },
        { id: "a3", text: "Hyper Transfer Markup Language", isCorrect: false },
        { id: "a4", text: "Home Tool Markup Language", isCorrect: false },
      ],
    },
    {
      id: "q2",
      text: "Những thuộc tính nào sau đây là thuộc tính CSS hợp lệ?",
      type: "multiple",
      points: 10,
      answers: [
        { id: "a1", text: "color", isCorrect: true },
        { id: "a2", text: "font-size", isCorrect: true },
        { id: "a3", text: "text-color", isCorrect: false },
        { id: "a4", text: "background-color", isCorrect: true },
      ],
    },
    {
      id: "q3",
      text: "Thẻ nào dùng để tạo liên kết trong HTML?",
      type: "single",
      points: 10,
      answers: [
        { id: "a1", text: "<link>", isCorrect: false },
        { id: "a2", text: "<a>", isCorrect: true },
        { id: "a3", text: "<href>", isCorrect: false },
        { id: "a4", text: "<url>", isCorrect: false },
      ],
    },
    {
      id: "q4",
      text: "JavaScript có thể được đặt ở đâu trong tài liệu HTML?",
      type: "multiple",
      points: 10,
      answers: [
        { id: "a1", text: "Trong thẻ <head>", isCorrect: true },
        { id: "a2", text: "Trong thẻ <body>", isCorrect: true },
        { id: "a3", text: "Trong file .js riêng biệt", isCorrect: true },
        { id: "a4", text: "Trong thẻ <style>", isCorrect: false },
      ],
    },
    {
      id: "q5",
      text: "Cách khai báo biến trong JavaScript ES6?",
      type: "multiple",
      points: 10,
      answers: [
        { id: "a1", text: "var", isCorrect: true },
        { id: "a2", text: "let", isCorrect: true },
        { id: "a3", text: "const", isCorrect: true },
        { id: "a4", text: "variable", isCorrect: false },
      ],
    },
    {
      id: "q6",
      text: "CSS Box Model bao gồm những thành phần nào?",
      type: "multiple",
      points: 10,
      answers: [
        { id: "a1", text: "Content", isCorrect: true },
        { id: "a2", text: "Padding", isCorrect: true },
        { id: "a3", text: "Border", isCorrect: true },
        { id: "a4", text: "Margin", isCorrect: true },
      ],
    },
    {
      id: "q7",
      text: "Đâu là cách chọn phần tử có id='demo' trong CSS?",
      type: "single",
      points: 10,
      answers: [
        { id: "a1", text: ".demo", isCorrect: false },
        { id: "a2", text: "#demo", isCorrect: true },
        { id: "a3", text: "demo", isCorrect: false },
        { id: "a4", text: "*demo", isCorrect: false },
      ],
    },
    {
      id: "q8",
      text: "Phương thức nào dùng để thêm phần tử vào cuối mảng trong JavaScript?",
      type: "single",
      points: 10,
      answers: [
        { id: "a1", text: "push()", isCorrect: true },
        { id: "a2", text: "pop()", isCorrect: false },
        { id: "a3", text: "shift()", isCorrect: false },
        { id: "a4", text: "unshift()", isCorrect: false },
      ],
    },
    {
      id: "q9",
      text: "Các giá trị display hợp lệ trong CSS là?",
      type: "multiple",
      points: 10,
      answers: [
        { id: "a1", text: "block", isCorrect: true },
        { id: "a2", text: "inline", isCorrect: true },
        { id: "a3", text: "flex", isCorrect: true },
        { id: "a4", text: "show", isCorrect: false },
      ],
    },
    {
      id: "q10",
      text: "React là gì?",
      type: "single",
      points: 10,
      answers: [
        { id: "a1", text: "Một ngôn ngữ lập trình", isCorrect: false },
        { id: "a2", text: "Một thư viện JavaScript để xây dựng giao diện người dùng", isCorrect: true },
        { id: "a3", text: "Một cơ sở dữ liệu", isCorrect: false },
        { id: "a4", text: "Một hệ điều hành", isCorrect: false },
      ],
    },
  ],
};

const ExamTaking = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(mockExam.duration * 60);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = mockExam.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / mockExam.questions.length) * 100;

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSingleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: [answerId],
    }));
  };

  const handleMultipleAnswer = (questionId: string, answerId: string, checked: boolean) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      if (checked) {
        return { ...prev, [questionId]: [...current, answerId] };
      } else {
        return { ...prev, [questionId]: current.filter((id) => id !== answerId) };
      }
    });
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const calculateScore = () => {
    let totalScore = 0;
    mockExam.questions.forEach((question) => {
      const userAnswers = answers[question.id] || [];
      const correctAnswers = question.answers.filter((a) => a.isCorrect).map((a) => a.id);

      if (question.type === "single") {
        if (userAnswers.length === 1 && correctAnswers.includes(userAnswers[0])) {
          totalScore += question.points;
        }
      } else {
        const isCorrect =
          userAnswers.length === correctAnswers.length &&
          userAnswers.every((a) => correctAnswers.includes(a));
        if (isCorrect) {
          totalScore += question.points;
        }
      }
    });
    return totalScore;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);
    setShowSubmitDialog(false);
    toast({
      title: "Đã nộp bài!",
      description: `Điểm của bạn: ${finalScore}/${mockExam.totalPoints}`,
    });
  };

  const getQuestionStatus = (questionId: string) => {
    const isAnswered = answers[questionId] && answers[questionId].length > 0;
    const isFlagged = flaggedQuestions.has(questionId);
    return { isAnswered, isFlagged };
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Kết quả bài thi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {score}/{mockExam.totalPoints}
                </div>
                <p className="text-muted-foreground">
                  {score >= mockExam.totalPoints * 0.8
                    ? "Xuất sắc! 🎉"
                    : score >= mockExam.totalPoints * 0.5
                    ? "Khá tốt! 👍"
                    : "Cần cố gắng thêm! 💪"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold text-green-600">
                    {mockExam.questions.filter((q) => {
                      const userAnswers = answers[q.id] || [];
                      const correctAnswers = q.answers.filter((a) => a.isCorrect).map((a) => a.id);
                      if (q.type === "single") {
                        return userAnswers.length === 1 && correctAnswers.includes(userAnswers[0]);
                      }
                      return (
                        userAnswers.length === correctAnswers.length &&
                        userAnswers.every((a) => correctAnswers.includes(a))
                      );
                    }).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Câu đúng</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-semibold text-red-600">
                    {mockExam.questions.length -
                      mockExam.questions.filter((q) => {
                        const userAnswers = answers[q.id] || [];
                        const correctAnswers = q.answers.filter((a) => a.isCorrect).map((a) => a.id);
                        if (q.type === "single") {
                          return userAnswers.length === 1 && correctAnswers.includes(userAnswers[0]);
                        }
                        return (
                          userAnswers.length === correctAnswers.length &&
                          userAnswers.every((a) => correctAnswers.includes(a))
                        );
                      }).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Câu sai</p>
                </div>
              </div>

              <Button className="w-full" onClick={() => navigate("/exam-prep")}>
                Quay lại danh sách đề thi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-lg">{mockExam.title}</h1>
              <p className="text-sm text-muted-foreground">{mockExam.subject}</p>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  timeLeft < 300 ? "bg-destructive/10 text-destructive" : "bg-muted"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <Button onClick={() => setShowSubmitDialog(true)}>
                <Send className="w-4 h-4 mr-2" />
                Nộp bài
              </Button>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Tiến độ làm bài</span>
              <span className="font-medium">
                {answeredCount}/{mockExam.questions.length} câu
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-base px-3 py-1">
                      Câu {currentQuestionIndex + 1}
                    </Badge>
                    <Badge variant={currentQuestion.type === "multiple" ? "default" : "secondary"}>
                      {currentQuestion.type === "multiple" ? "Nhiều đáp án" : "Một đáp án"}
                    </Badge>
                    <Badge variant="outline">{currentQuestion.points} điểm</Badge>
                  </div>
                  <Button
                    variant={flaggedQuestions.has(currentQuestion.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFlag(currentQuestion.id)}
                  >
                    <Flag className="w-4 h-4 mr-1" />
                    {flaggedQuestions.has(currentQuestion.id) ? "Đã đánh dấu" : "Đánh dấu"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg font-medium">{currentQuestion.text}</p>

                {currentQuestion.type === "single" ? (
                  <RadioGroup
                    value={answers[currentQuestion.id]?.[0] || ""}
                    onValueChange={(value) => handleSingleAnswer(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion.answers.map((answer, index) => (
                      <div
                        key={answer.id}
                        className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <RadioGroupItem value={answer.id} id={answer.id} />
                        <Label htmlFor={answer.id} className="flex-1 cursor-pointer">
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {answer.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-3">
                    {currentQuestion.answers.map((answer, index) => (
                      <div
                        key={answer.id}
                        className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <Checkbox
                          id={answer.id}
                          checked={answers[currentQuestion.id]?.includes(answer.id) || false}
                          onCheckedChange={(checked) =>
                            handleMultipleAnswer(currentQuestion.id, answer.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={answer.id} className="flex-1 cursor-pointer">
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {answer.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Câu trước
                  </Button>
                  <span className="text-muted-foreground">
                    {currentQuestionIndex + 1} / {mockExam.questions.length}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentQuestionIndex((prev) =>
                        Math.min(mockExam.questions.length - 1, prev + 1)
                      )
                    }
                    disabled={currentQuestionIndex === mockExam.questions.length - 1}
                  >
                    Câu sau
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="text-base">Danh sách câu hỏi</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-5 gap-2">
                    {mockExam.questions.map((question, index) => {
                      const { isAnswered, isFlagged } = getQuestionStatus(question.id);
                      return (
                        <button
                          key={question.id}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={`relative w-10 h-10 rounded-lg border text-sm font-medium transition-all
                            ${currentQuestionIndex === index ? "ring-2 ring-primary" : ""}
                            ${isAnswered ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}
                          `}
                        >
                          {index + 1}
                          {isFlagged && (
                            <Flag className="absolute -top-1 -right-1 w-3 h-3 text-orange-500 fill-orange-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>

                <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary" />
                    <span>Đã trả lời ({answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted border" />
                    <span>Chưa trả lời ({mockExam.questions.length - answeredCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span>Đã đánh dấu ({flaggedQuestions.size})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận nộp bài?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Bạn đã trả lời {answeredCount}/{mockExam.questions.length} câu hỏi.</p>
              {answeredCount < mockExam.questions.length && (
                <p className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="w-4 h-4" />
                  Còn {mockExam.questions.length - answeredCount} câu chưa trả lời!
                </p>
              )}
              {flaggedQuestions.size > 0 && (
                <p className="flex items-center gap-2 text-orange-600">
                  <Flag className="w-4 h-4" />
                  Có {flaggedQuestions.size} câu đã đánh dấu cần xem lại.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tiếp tục làm bài</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Nộp bài</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamTaking;
