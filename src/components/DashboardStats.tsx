import { BookOpen, Clock, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Khóa học đang học",
    value: "6",
    icon: BookOpen,
    description: "2 khóa mới tuần này",
    color: "text-primary",
  },
  {
    title: "Giờ học",
    value: "24.5",
    icon: Clock,
    description: "Tuần này",
    color: "text-accent",
  },
  {
    title: "Điểm trung bình",
    value: "8.7",
    icon: Trophy,
    description: "Tăng 0.3 điểm",
    color: "text-green-600",
  },
  {
    title: "Bài tập",
    value: "12",
    icon: Users,
    description: "3 sắp hết hạn",
    color: "text-orange-600",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-card hover:shadow-hover transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;