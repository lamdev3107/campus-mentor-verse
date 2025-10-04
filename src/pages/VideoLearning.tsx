import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  BookmarkPlus,
  MessageSquare,
  BookOpen,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface Chapter {
  id: number;
  title: string;
  lessonCount: number;
  duration: string;
  lessons: Lesson[];
  expanded: boolean;
}

interface Note {
  id: number;
  timestamp: string;
  lessonTitle: string;
  content: string;
  createdAt: string;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

const VideoLearning = () => {
  const [notesOpen, setNotesOpen] = useState(false);
  const [qnaOpen, setQnaOpen] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 1,
      title: "1. IIFE, Scope, Closure",
      lessonCount: 9,
      duration: "01:46:18",
      expanded: true,
      lessons: [
        { id: 1, title: "1. Giới thiệu khóa học", duration: "05:23", completed: true },
        { id: 2, title: "2. Cài đặt môi trường", duration: "08:15", completed: true },
        { id: 3, title: "3. Biến và kiểu dữ liệu", duration: "12:30", completed: true },
        { id: 4, title: "4. Toán tử và biểu thức", duration: "10:45", completed: true },
        { id: 5, title: "5. Câu lệnh điều kiện", duration: "15:20", completed: true },
        { id: 6, title: "6. Vòng lặp", duration: "13:40", completed: true },
        { id: 7, title: "7. Hàm trong JavaScript", duration: "18:25", completed: true },
        { id: 8, title: "8. Scope và Closure", duration: "20:15", completed: true },
        { id: 9, title: "9. Ôn tập về khái niệm Closure", duration: "01:03", completed: false },
      ],
    },
    {
      id: 2,
      title: "2. Hoisting, Strict Mode, Data Types",
      lessonCount: 6,
      duration: "01:11:58",
      expanded: false,
      lessons: [
        { id: 10, title: "1. Hoisting là gì?", duration: "12:30", completed: false },
        { id: 11, title: "2. Strict Mode", duration: "08:45", completed: false },
        { id: 12, title: "3. Kiểu dữ liệu nguyên thủy", duration: "15:20", completed: false },
        { id: 13, title: "4. Kiểu dữ liệu tham chiếu", duration: "18:30", completed: false },
        { id: 14, title: "5. Ép kiểu dữ liệu", duration: "10:15", completed: false },
        { id: 15, title: "6. Bài tập thực hành", duration: "06:38", completed: false },
      ],
    },
    {
      id: 3,
      title: "3. This, Bind, Call, Apply",
      lessonCount: 5,
      duration: "01:39:54",
      expanded: false,
      lessons: [
        { id: 16, title: "1. This keyword", duration: "22:15", completed: false },
        { id: 17, title: "2. Bind method", duration: "18:40", completed: false },
        { id: 18, title: "3. Call method", duration: "16:25", completed: false },
        { id: 19, title: "4. Apply method", duration: "14:30", completed: false },
        { id: 20, title: "5. Thực hành tổng hợp", duration: "28:04", completed: false },
      ],
    },
  ]);

  const [notes] = useState<Note[]>([
    {
      id: 1,
      timestamp: "01:06",
      lessonTitle: "Khái niệm Closure?",
      content: "Một function khi nó được gọi thì nó sẽ tạo ra một phạm vì (scope) riêng biệt của hàm đó...",
      createdAt: "2 ngày trước",
    },
    {
      id: 2,
      timestamp: "00:42",
      lessonTitle: "Scope là gì?",
      content: "Scope - Phạm vi\n- Các loại phạm vi:\n+) Global - Toàn cầu: var\n+) Code block...",
      createdAt: "3 ngày trước",
    },
  ]);

  const [comments] = useState<Comment[]>([
    {
      id: 1,
      author: "Hoang Tu Ech",
      avatar: "",
      content: "****có bạn nào cứ dến nửa video là hiện cảnh báo như mình ko, mặc dù k tua dành phải qua ýtb xem vậy :(((", 
      timestamp: "2 tháng trước",
    },
    {
      id: 2,
      author: "Nguyen Van A",
      avatar: "",
      content: "Video rất hay và dễ hiểu, cảm ơn thầy!",
      timestamp: "1 tuần trước",
    },
  ]);

  const currentLesson = {
    title: "9. Ôn tập về khái niệm Closure",
    chapter: "1. IIFE, Scope, Closure",
  };

  const toggleChapter = (chapterId: number) => {
    setChapters(chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, expanded: !chapter.expanded }
        : chapter
    ));
  };

  const completedLessons = chapters.reduce((total, chapter) => 
    total + chapter.lessons.filter(lesson => lesson.completed).length, 0
  );
  const totalLessons = chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="bg-[#1a1d29] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 rounded-lg px-2 py-1 font-bold text-sm">F8</div>
            <h1 className="text-base font-medium">Lập Trình JavaScript Nâng Cao</h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-white/20"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                  className="text-orange-500"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                {progress}%
              </span>
            </div>
            <span className="text-sm">{completedLessons}/{totalLessons} bài học</span>
          </div>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={() => setNotesOpen(true)}
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Ghi chú
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={() => setQnaOpen(true)}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Hỏi đáp
          </Button>

          <Button variant="ghost" className="text-white hover:bg-white/10">
            <BookOpen className="h-5 w-5 mr-2" />
            Hướng dẫn
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Video Section */}
        <div className="flex-1 bg-black">
          <div className="relative aspect-video bg-gradient-to-br from-orange-500 via-red-500 to-purple-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <h2 className="text-6xl font-bold">IIFE là gì?</h2>
                <p className="text-2xl">JavaScript<br/>{"{Nâng cao}"}</p>
                <p className="text-xl">fullstack.edu.vn</p>
              </div>
            </div>
          </div>

          {/* Video Info & Controls */}
          <div className="bg-background p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-2">IIFE là gì?</h1>
              
              <div className="flex items-center justify-between mt-6">
                <Button variant="outline" size="lg">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  BÀI TRƯỚC
                </Button>

                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  BÀI TIẾP THEO
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="mt-6 flex gap-4">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setNotesOpen(true)}
                >
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Thêm ghi chú tại 00:00
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setQnaOpen(true)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Hỏi đáp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div className="w-[400px] border-l bg-background">
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">Nội dung khóa học</h2>
          </div>

          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="p-4 space-y-2">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="border rounded-lg">
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-sm">{chapter.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {chapter.lessonCount}/{chapter.lessonCount} | {chapter.duration}
                      </p>
                    </div>
                    {chapter.expanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>

                  {chapter.expanded && (
                    <div className="border-t">
                      {chapter.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          className="w-full p-3 px-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b last:border-b-0"
                        >
                          {lesson.completed ? (
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          ) : (
                            <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-muted-foreground" />
                          )}
                          <div className="text-left flex-1 min-w-0">
                            <p className="text-sm truncate">{lesson.title}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Notes Drawer */}
      <Sheet open={notesOpen} onOpenChange={setNotesOpen}>
        <SheetContent className="w-[600px] sm:max-w-[600px]">
          <SheetHeader>
            <SheetTitle>Ghi chú của tôi</SheetTitle>
            <SheetDescription>
              Ghi chú giúp bạn ghi nhớ những kiến thức quan trọng
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="flex gap-2">
              <Select defaultValue="current">
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Trong chương hiện tại</SelectItem>
                  <SelectItem value="all">Tất cả các chương</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="newest">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="bg-orange-500">
                          {note.timestamp}
                        </Badge>
                        <h4 className="font-semibold">{note.lessonTitle}</h4>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-2 pt-4 border-t">
              <Textarea
                placeholder="Nhập ghi chú của bạn..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline">HỦY BỎ</Button>
                <Button className="bg-primary">LƯU LẠI</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Q&A Drawer */}
      <Sheet open={qnaOpen} onOpenChange={setQnaOpen}>
        <SheetContent className="w-[600px] sm:max-w-[600px]">
          <SheetHeader>
            <SheetTitle>Hỏi đáp</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{comments.length} bình luận</h3>
              <p className="text-xs text-muted-foreground">
                Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé
              </p>
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Textarea
                  placeholder="Nhập bình luận mới của bạn"
                  className="min-h-[80px] border-0 focus-visible:ring-0 p-0"
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-primary">
                            {comment.author}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex gap-4 mt-2">
                          <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary">
                            Thích
                          </Button>
                          <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary">
                            Phản hồi
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default VideoLearning;
