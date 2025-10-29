import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import StudyMaterials from "./pages/StudyMaterials";
import ExamPrep from "./pages/ExamPrep";
import OnlineLearning from "./pages/OnlineLearning";
import CourseDetail from "./pages/CourseDetail";
import VideoLearning from "./pages/VideoLearning";
import CreateCourse from "./pages/CreateCourse";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserRolesManagement from "./pages/admin/UserRolesManagement";
import TeacherManagement from "./pages/admin/TeacherManagement";
import StudentManagement from "./pages/admin/StudentManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/calendar" element={<Index />} />
          <Route path="/discussions" element={<Index />} />
          <Route path="/groups" element={<Index />} />
          <Route path="/study-materials" element={<StudyMaterials />} />
          <Route path="/exam-prep" element={<ExamPrep />} />
          <Route path="/online-learning" element={<OnlineLearning />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/roles" element={<UserRolesManagement />} />
          <Route path="/admin/teachers" element={<TeacherManagement />} />
          <Route path="/admin/students" element={<StudentManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
