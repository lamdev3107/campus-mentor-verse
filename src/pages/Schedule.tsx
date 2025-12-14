import { useState } from "react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay, isToday } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Filter, List, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ScheduleEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
  category: string;
  color: string;
  description?: string;
}

const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
  general: { bg: "bg-blue-500", text: "text-white", label: "Chung" },
  class: { bg: "bg-cyan-400", text: "text-white", label: "Lịch học" },
  exam: { bg: "bg-pink-400", text: "text-white", label: "Lịch thi" },
  assignment: { bg: "bg-rose-400", text: "text-white", label: "Bài tập" },
  meeting: { bg: "bg-amber-400", text: "text-white", label: "Họp lớp" },
  personal: { bg: "bg-emerald-400", text: "text-white", label: "Cá nhân" },
  other: { bg: "bg-gray-400", text: "text-white", label: "Khác" },
};

const timeSlots = Array.from({ length: 15 }, (_, i) => {
  const hour = i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

const mockEvents: ScheduleEvent[] = [
  {
    id: "1",
    title: "Lập trình Web - Thầy Nguyễn Văn A",
    startTime: "08:00",
    endTime: "10:00",
    date: new Date(),
    category: "class",
    color: "cyan",
    description: "Phòng A1.101",
  },
  {
    id: "2",
    title: "Cơ sở dữ liệu - Cô Trần Thị B",
    startTime: "13:00",
    endTime: "15:00",
    date: new Date(),
    category: "class",
    color: "cyan",
    description: "Phòng B2.202",
  },
  {
    id: "3",
    title: "Thi giữa kỳ - Toán cao cấp",
    startTime: "08:00",
    endTime: "10:00",
    date: addDays(new Date(), 2),
    category: "exam",
    color: "pink",
    description: "Phòng thi C3.301",
  },
  {
    id: "4",
    title: "Họp lớp cuối tuần",
    startTime: "14:00",
    endTime: "16:00",
    date: addDays(new Date(), 3),
    category: "meeting",
    color: "amber",
    description: "Online - MS Teams",
  },
];

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("week");
  const [events, setEvents] = useState<ScheduleEvent[]>(mockEvents);
  const [categoryFilters, setCategoryFilters] = useState<Record<string, boolean>>({
    general: true,
    class: true,
    exam: true,
    assignment: true,
    meeting: true,
    personal: true,
    other: true,
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: "08:00",
    endTime: "09:00",
    category: "personal",
    description: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(true);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const goToPrevious = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const goToNext = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const toggleCategoryFilter = (category: string) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getEventsForDateAndTime = (date: Date, time: string) => {
    return events.filter((event) => {
      if (!isSameDay(event.date, date)) return false;
      if (!categoryFilters[event.category]) return false;
      const eventStartHour = parseInt(event.startTime.split(":")[0]);
      const slotHour = parseInt(time.split(":")[0]);
      return eventStartHour === slotHour;
    });
  };

  const getEventHeight = (event: ScheduleEvent) => {
    const startHour = parseInt(event.startTime.split(":")[0]);
    const endHour = parseInt(event.endTime.split(":")[0]);
    return (endHour - startHour) * 48;
  };

  const handleAddEvent = () => {
    const event: ScheduleEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      date: selectedDate,
      category: newEvent.category,
      color: categoryColors[newEvent.category]?.bg || "bg-gray-400",
      description: newEvent.description,
    };
    setEvents([...events, event]);
    setIsAddDialogOpen(false);
    setNewEvent({
      title: "",
      startTime: "08:00",
      endTime: "09:00",
      category: "personal",
      description: "",
    });
  };

  const upcomingEvents = events
    .filter((e) => e.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Main Calendar Area */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-foreground">Lịch</h1>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <CalendarIcon className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm sự kiện cá nhân
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Thêm sự kiện mới</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Nhập tiêu đề sự kiện"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startTime">Giờ bắt đầu</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newEvent.startTime}
                        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endTime">Giờ kết thúc</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newEvent.endTime}
                        onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Loại sự kiện</Label>
                    <Select
                      value={newEvent.category}
                      onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryColors).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <div className={cn("w-3 h-3 rounded", value.bg)} />
                              {value.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Nhập mô tả (tùy chọn)"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddEvent} disabled={!newEvent.title}>
                    Thêm sự kiện
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                Hôm nay
              </Button>
              <Button variant="outline" size="sm" onClick={goToPrevious}>
                Trước
              </Button>
              <Button variant="outline" size="sm" onClick={goToNext}>
                Sau
              </Button>
              <span className="ml-4 text-lg font-medium">
                {format(weekStart, "dd/MM", { locale: vi })} - {format(addDays(weekStart, 6), "dd/MM", { locale: vi })}
              </span>
            </div>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("month")}
                className="rounded-none"
              >
                Tháng
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("week")}
                className="rounded-none"
              >
                Tuần
              </Button>
              <Button
                variant={viewMode === "day" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("day")}
                className="rounded-none"
              >
                Ngày
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-auto max-h-[calc(100vh-280px)]">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-background z-10">
                    <tr>
                      <th className="w-16 p-2 border-b border-r text-sm font-medium text-muted-foreground"></th>
                      {weekDays.map((day, index) => (
                        <th
                          key={index}
                          className={cn(
                            "p-2 border-b text-center min-w-[120px]",
                            isToday(day) && "bg-cyan-50"
                          )}
                        >
                          <div className="text-xs text-muted-foreground">
                            {format(day, "dd")} T{((day.getDay() + 6) % 7) + 2}
                          </div>
                          {isToday(day) && (
                            <div className="text-xs text-cyan-600 font-medium">Hôm nay</div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time) => (
                      <tr key={time} className="h-12">
                        <td className="p-2 border-r text-xs text-muted-foreground text-right align-top">
                          {time}
                        </td>
                        {weekDays.map((day, dayIndex) => {
                          const dayEvents = getEventsForDateAndTime(day, time);
                          return (
                            <td
                              key={dayIndex}
                              className={cn(
                                "border-b border-r relative",
                                isToday(day) && "bg-cyan-50/50"
                              )}
                            >
                              {dayEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className={cn(
                                    "absolute left-0 right-0 mx-1 p-1 rounded text-xs overflow-hidden cursor-pointer hover:opacity-90 transition-opacity z-10",
                                    categoryColors[event.category]?.bg,
                                    categoryColors[event.category]?.text
                                  )}
                                  style={{ height: `${getEventHeight(event)}px` }}
                                  title={event.title}
                                >
                                  <div className="font-medium text-[10px]">
                                    {event.startTime} - {event.endTime}
                                  </div>
                                  <div className="font-medium truncate">{event.title}</div>
                                  {event.description && (
                                    <div className="text-[10px] opacity-90 truncate">
                                      {event.description}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l bg-background p-4 space-y-4">
          {/* Mini Calendar */}
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>{format(selectedDate, "dd/MM/yyyy")}</span>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md pointer-events-auto"
                locale={vi}
              />
            </CardContent>
          </Card>

          {/* Event Filters */}
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="py-3 px-4 cursor-pointer hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <CardTitle className="text-sm">Bộ lọc sự kiện</CardTitle>
                    </div>
                    <ChevronRight
                      className={cn("h-4 w-4 transition-transform", isFilterOpen && "rotate-90")}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 px-4 pb-4 space-y-2">
                  {Object.entries(categoryColors).map(([key, value]) => (
                    <div
                      key={key}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md cursor-pointer",
                        value.bg,
                        value.text
                      )}
                      onClick={() => toggleCategoryFilter(key)}
                    >
                      <Checkbox
                        checked={categoryFilters[key]}
                        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-primary"
                      />
                      <span className="text-sm font-medium">{value.label}</span>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Upcoming Events */}
          <Collapsible open={isUpcomingOpen} onOpenChange={setIsUpcomingOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="py-3 px-4 cursor-pointer hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Lịch sắp tới</CardTitle>
                    <ChevronRight
                      className={cn("h-4 w-4 transition-transform", isUpcomingOpen && "rotate-90")}
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 px-4 pb-4">
                  {upcomingEvents.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Không có lịch sắp tới</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-2 rounded-md border hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full",
                                categoryColors[event.category]?.bg
                              )}
                            />
                            <span className="text-xs text-muted-foreground">
                              {format(event.date, "dd/MM")} • {event.startTime}
                            </span>
                          </div>
                          <p className="text-sm font-medium truncate mt-1">{event.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
