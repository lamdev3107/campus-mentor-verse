import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  Users, 
  Settings 
} from "lucide-react";

const quickActions = [
  {
    title: "Lịch học",
    description: "Xem lịch học hôm nay",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Thảo luận",
    description: "Tham gia forum",
    icon: MessageSquare,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Thư viện",
    description: "Tài liệu tham khảo",
    icon: BookOpen,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Bài tập",
    description: "Xem bài tập mới",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Nhóm học",
    description: "Kết nối bạn bè",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Cài đặt",
    description: "Tùy chỉnh tài khoản",
    icon: Settings,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
];

const QuickActions = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Thao tác nhanh</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-4 flex flex-col items-start text-left hover:bg-muted/50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${action.bgColor} mb-2`}>
                <action.icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <div>
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {action.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;