import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  Volume2, 
  Settings, 
  Maximize,
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle
} from "lucide-react";

const mockCourses = [
  {
    id: 1,
    title: "Lập trình Web với React",
    instructor: "TS. Nguyễn Văn A",
    thumbnail: "/placeholder.svg",
    totalVideos: 24,
    completedVideos: 8,
    totalDuration: "12 giờ 30 phút",
    rating: 4.8,
    students: 256,
    videos: [
      { id: 1, title: "Giới thiệu về React", duration: "15:30", completed: true },
      { id: 2, title: "JSX và Components", duration: "22:45", completed: true },
      { id: 3, title: "Props và State", duration: "18:20", completed: true },
      { id: 4, title: "Event Handling", duration: "16:15", completed: false },
      { id: 5, title: "Conditional Rendering", duration: "14:30", completed: false },
    ]
  },
  {
    id: 2,
    title: "Cơ sở dữ liệu MySQL",
    instructor: "PGS. Trần Thị B",
    thumbnail: "/placeholder.svg",
    totalVideos: 18,
    completedVideos: 12,
    totalDuration: "8 giờ 45 phút",
    rating: 4.6,
    students: 189,
    videos: [
      { id: 1, title: "Giới thiệu về SQL", duration: "20:15", completed: true },
      { id: 2, title: "Tạo và quản lý bảng", duration: "25:30", completed: true },
      { id: 3, title: "Truy vấn dữ liệu", duration: "30:45", completed: false },
    ]
  },
  {
    id: 3,
    title: "Toán học rời rạc",
    instructor: "TS. Lê Văn C",
    thumbnail: "/placeholder.svg",
    totalVideos: 30,
    completedVideos: 5,
    totalDuration: "15 giờ 20 phút",
    rating: 4.5,
    students: 324,
    videos: [
      { id: 1, title: "Logic mệnh đề", duration: "28:40", completed: true },
      { id: 2, title: "Tập hợp và quan hệ", duration: "32:15", completed: false },
    ]
  },
];

const OnlineLearning = () => {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);
  const [currentVideo, setCurrentVideo] = useState(selectedCourse.videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const progress = (selectedCourse.completedVideos / selectedCourse.totalVideos) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <TopBar />
        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Học trực tuyến</h1>
              <p className="text-muted-foreground mt-2">
                Tham gia các khóa học video từ các giảng viên hàng đầu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player Section */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardContent className="p-0">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <img 
                        src="/placeholder.svg" 
                        alt="Video thumbnail"
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Button
                          size="lg"
                          variant="secondary"
                          className="h-16 w-16 rounded-full"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                        </Button>
                      </div>
                    </div>
                  </AspectRatio>
                  
                  {/* Video Controls */}
                  <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{currentVideo.title}</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={45} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>5:23</span>
                        <span>{currentVideo.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedCourse.title}</CardTitle>
                      <CardDescription className="mt-1">
                        Giảng viên: {selectedCourse.instructor}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {selectedCourse.completedVideos}/{selectedCourse.totalVideos} bài
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Tiến độ học tập</span>
                        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{selectedCourse.totalDuration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{selectedCourse.students} sinh viên</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedCourse.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar with course list and videos */}
            <div className="space-y-4">
              <Tabs defaultValue="playlist" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="playlist">Danh sách</TabsTrigger>
                  <TabsTrigger value="courses">Khóa học</TabsTrigger>
                </TabsList>
                
                <TabsContent value="playlist" className="space-y-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Nội dung khóa học</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedCourse.videos.map((video) => (
                        <div
                          key={video.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                            currentVideo.id === video.id ? 'bg-muted border-primary' : ''
                          }`}
                          onClick={() => setCurrentVideo(video)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {video.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <PlayCircle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{video.title}</p>
                              <p className="text-xs text-muted-foreground">{video.duration}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="courses" className="space-y-2">
                  {mockCourses.map((course) => (
                    <Card 
                      key={course.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedCourse.id === course.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => {
                        setSelectedCourse(course);
                        setCurrentVideo(course.videos[0]);
                      }}
                    >
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <img 
                            src={course.thumbnail} 
                            alt={course.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{course.title}</h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {course.instructor}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {course.completedVideos}/{course.totalVideos}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {Math.round((course.completedVideos / course.totalVideos) * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OnlineLearning;