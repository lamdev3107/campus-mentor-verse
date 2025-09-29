import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, FileText, MessageCircle, Trophy } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "course",
    title: "Hoàn thành bài học 'React Hooks'",
    course: "Lập trình React nâng cao",
    time: "2 giờ trước",
    icon: BookOpen,
    color: "bg-primary",
  },
  {
    id: 2,
    type: "assignment",
    title: "Nộp bài tập 'Database Design'",
    course: "Hệ quản trị cơ sở dữ liệu",
    time: "5 giờ trước",
    icon: FileText,
    color: "bg-accent",
  },
  {
    id: 3,
    type: "discussion",
    title: "Trả lời thảo luận trong forum",
    course: "Kỹ thuật phần mềm",
    time: "1 ngày trước",
    icon: MessageCircle,
    color: "bg-green-500",
  },
  {
    id: 4,
    type: "achievement",
    title: "Đạt huy hiệu 'Quick Learner'",
    course: "Thành tích học tập",
    time: "2 ngày trước",
    icon: Trophy,
    color: "bg-yellow-500",
  },
];

const RecentActivity = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Avatar className="w-10 h-10">
              <AvatarFallback className={`${activity.color} text-white`}>
                <activity.icon className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.course}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;