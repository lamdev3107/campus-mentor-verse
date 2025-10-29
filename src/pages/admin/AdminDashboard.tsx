import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, TrendingUp, UserCheck, Activity } from "lucide-react";
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const statsData = [
  { name: "Tổng học sinh", value: "1,234", icon: Users, change: "+12%", color: "text-blue-600" },
  { name: "Tổng giảng viên", value: "89", icon: GraduationCap, change: "+5%", color: "text-green-600" },
  { name: "Khóa học đang mở", value: "156", icon: BookOpen, change: "+8%", color: "text-purple-600" },
  { name: "Tỷ lệ hoàn thành", value: "78%", icon: TrendingUp, change: "+5%", color: "text-orange-600" },
];

const monthlyData = [
  { month: "T1", students: 1000, teachers: 75, courses: 120 },
  { month: "T2", students: 1050, teachers: 78, courses: 125 },
  { month: "T3", students: 1100, teachers: 82, courses: 135 },
  { month: "T4", students: 1150, teachers: 85, courses: 145 },
  { month: "T5", students: 1200, teachers: 87, courses: 150 },
  { month: "T6", students: 1234, teachers: 89, courses: 156 },
];

const completionData = [
  { month: "T1", rate: 72 },
  { month: "T2", rate: 75 },
  { month: "T3", rate: 73 },
  { month: "T4", rate: 76 },
  { month: "T5", rate: 77 },
  { month: "T6", rate: 78 },
];

const engagementData = [
  { category: "Tham gia lớp học", value: 85 },
  { category: "Nộp bài tập", value: 78 },
  { category: "Thảo luận", value: 65 },
  { category: "Đánh giá khóa học", value: 70 },
];

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-xl font-semibold">Bảng điều khiển quản trị</h1>
          </header>

          <main className="flex-1 p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statsData.map((stat) => (
                <Card key={stat.name}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.name}
                    </CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-600">{stat.change}</span> so với tháng trước
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Thống kê tăng trưởng</CardTitle>
                  <CardDescription>Biểu đồ tăng trưởng học sinh, giảng viên và khóa học</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      students: { label: "Học sinh", color: "hsl(var(--chart-1))" },
                      teachers: { label: "Giảng viên", color: "hsl(var(--chart-2))" },
                      courses: { label: "Khóa học", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="students" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Học sinh" />
                        <Line type="monotone" dataKey="teachers" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Giảng viên" />
                        <Line type="monotone" dataKey="courses" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Khóa học" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tỷ lệ hoàn thành khóa học</CardTitle>
                  <CardDescription>Tỷ lệ hoàn thành trung bình theo tháng (%)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      rate: { label: "Tỷ lệ hoàn thành", color: "hsl(var(--chart-4))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={completionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="rate" fill="hsl(var(--chart-4))" name="Tỷ lệ %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Mức độ tương tác</CardTitle>
                <CardDescription>Tỷ lệ tham gia các hoạt động học tập</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagementData.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-muted-foreground">{item.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Table */}
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
                <CardDescription>Các hoạt động mới nhất trên hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Nguyễn Văn A", action: "đã đăng ký khóa học Lập trình Web", time: "5 phút trước", icon: BookOpen },
                    { user: "Trần Thị B", action: "đã hoàn thành bài kiểm tra Cấu trúc dữ liệu", time: "15 phút trước", icon: UserCheck },
                    { user: "GV. Lê Văn C", action: "đã tạo khóa học mới về Trí tuệ nhân tạo", time: "1 giờ trước", icon: GraduationCap },
                    { user: "Phạm Thị D", action: "đã tham gia thảo luận trong nhóm học", time: "2 giờ trước", icon: Activity },
                    { user: "Hoàng Văn E", action: "đã nộp bài tập Thuật toán nâng cao", time: "3 giờ trước", icon: BookOpen },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <activity.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
