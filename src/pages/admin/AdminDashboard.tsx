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
  { name: "Khóa học", value: "156", icon: BookOpen, change: "+8%", color: "text-purple-600" },
  { name: "Người dùng hoạt động", value: "892", icon: UserCheck, change: "+18%", color: "text-orange-600" },
];

const monthlyData = [
  { month: "T1", students: 1000, teachers: 75, courses: 120 },
  { month: "T2", students: 1050, teachers: 78, courses: 125 },
  { month: "T3", students: 1100, teachers: 82, courses: 135 },
  { month: "T4", students: 1150, teachers: 85, courses: 145 },
  { month: "T5", students: 1200, teachers: 87, courses: 150 },
  { month: "T6", students: 1234, teachers: 89, courses: 156 },
];

const revenueData = [
  { month: "T1", revenue: 45000000 },
  { month: "T2", revenue: 52000000 },
  { month: "T3", revenue: 48000000 },
  { month: "T4", revenue: 61000000 },
  { month: "T5", revenue: 55000000 },
  { month: "T6", revenue: 67000000 },
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
                  <CardTitle>Doanh thu</CardTitle>
                  <CardDescription>Doanh thu theo tháng (VNĐ)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: { label: "Doanh thu", color: "hsl(var(--chart-4))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="hsl(var(--chart-4))" name="Doanh thu" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Activity Table */}
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
                <CardDescription>Các hoạt động mới nhất trên hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "Nguyễn Văn A", action: "đã đăng ký khóa học React Nâng cao", time: "5 phút trước", icon: Activity },
                    { user: "Trần Thị B", action: "đã hoàn thành bài kiểm tra JavaScript", time: "15 phút trước", icon: UserCheck },
                    { user: "Lê Văn C", action: "đã thêm khóa học mới về TypeScript", time: "1 giờ trước", icon: BookOpen },
                    { user: "Phạm Thị D", action: "đã được thăng cấp thành giảng viên", time: "2 giờ trước", icon: GraduationCap },
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
