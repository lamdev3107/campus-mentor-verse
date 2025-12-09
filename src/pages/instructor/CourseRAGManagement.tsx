import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  FileText, 
  Trash2, 
  Bot, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2,
  Brain,
  Database,
  MessageSquare,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  status: "processing" | "completed" | "failed";
  progress: number;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const CourseRAGManagement = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Giáo trình Lập trình Web.pdf",
      size: "2.5 MB",
      uploadedAt: "2024-01-15",
      status: "completed",
      progress: 100
    },
    {
      id: "2",
      name: "Bài giảng React Cơ bản.pdf",
      size: "1.8 MB",
      uploadedAt: "2024-01-16",
      status: "completed",
      progress: 100
    },
    {
      id: "3",
      name: "Tài liệu TypeScript.pdf",
      size: "3.2 MB",
      uploadedAt: "2024-01-17",
      status: "processing",
      progress: 65
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Xin chào! Tôi là trợ lý AI của khóa học. Tôi đã được huấn luyện với các tài liệu của khóa học này. Hãy đặt câu hỏi để kiểm tra kiến thức nhé!",
      timestamp: "10:00"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);

    Array.from(files).forEach((file, index) => {
      if (file.type !== "application/pdf") {
        toast({
          title: "Lỗi",
          description: `File "${file.name}" không phải định dạng PDF`,
          variant: "destructive"
        });
        return;
      }

      const newDoc: Document = {
        id: Date.now().toString() + index,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        uploadedAt: new Date().toISOString().split("T")[0],
        status: "processing",
        progress: 0
      };

      setDocuments(prev => [...prev, newDoc]);

      // Simulate processing progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setDocuments(prev =>
            prev.map(doc =>
              doc.id === newDoc.id
                ? { ...doc, status: "completed", progress: 100 }
                : doc
            )
          );
          toast({
            title: "Hoàn thành",
            description: `Tài liệu "${file.name}" đã được xử lý và lưu trữ thành công`
          });
        } else {
          setDocuments(prev =>
            prev.map(doc =>
              doc.id === newDoc.id ? { ...doc, progress: Math.min(progress, 99) } : doc
            )
          );
        }
      }, 500);
    });

    setIsUploading(false);
    event.target.value = "";
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    toast({
      title: "Đã xóa",
      description: "Tài liệu đã được xóa khỏi hệ thống RAG"
    });
  };

  const handleReprocessDocument = (docId: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId ? { ...doc, status: "processing", progress: 0 } : doc
      )
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDocuments(prev =>
          prev.map(doc =>
            doc.id === docId ? { ...doc, status: "completed", progress: 100 } : doc
          )
        );
        toast({
          title: "Hoàn thành",
          description: "Tài liệu đã được xử lý lại thành công"
        });
      } else {
        setDocuments(prev =>
          prev.map(doc =>
            doc.id === docId ? { ...doc, progress: Math.min(progress, 99) } : doc
          )
        );
      }
    }, 500);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsSending(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(newMessage),
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsSending(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const responses = [
      "Dựa trên tài liệu khóa học, React là một thư viện JavaScript để xây dựng giao diện người dùng. React sử dụng Virtual DOM để tối ưu hiệu năng render.",
      "Theo giáo trình, TypeScript là một ngôn ngữ lập trình mở rộng từ JavaScript, bổ sung tính năng kiểu tĩnh giúp phát hiện lỗi sớm hơn trong quá trình phát triển.",
      "Tài liệu cho thấy useState là một Hook trong React cho phép thêm state vào functional component. Cú pháp: const [state, setState] = useState(initialValue).",
      "Dựa vào bài giảng, useEffect được sử dụng để thực hiện side effects trong component như gọi API, đăng ký sự kiện, hoặc cập nhật DOM."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getStatusBadge = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Hoàn thành
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Đang xử lý
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <AlertCircle className="w-3 h-3 mr-1" />
            Thất bại
          </Badge>
        );
    }
  };

  const completedDocs = documents.filter(d => d.status === "completed").length;
  const processingDocs = documents.filter(d => d.status === "processing").length;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopBar />
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quản lý tài liệu AI (RAG)</h1>
            <p className="text-muted-foreground mt-1">
              Upload tài liệu PDF để AI học và hỗ trợ sinh viên trong khóa học
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{documents.length}</p>
                    <p className="text-sm text-muted-foreground">Tổng tài liệu</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedDocs}</p>
                    <p className="text-sm text-muted-foreground">Đã xử lý</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{processingDocs}</p>
                    <p className="text-sm text-muted-foreground">Đang xử lý</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedDocs > 0 ? "Sẵn sàng" : "Chưa"}</p>
                    <p className="text-sm text-muted-foreground">Trạng thái AI</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="documents" className="space-y-4">
            <TabsList>
              <TabsTrigger value="documents" className="gap-2">
                <FileText className="w-4 h-4" />
                Tài liệu
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="gap-2" disabled={completedDocs === 0}>
                <Bot className="w-4 h-4" />
                Test Chatbot
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upload tài liệu</CardTitle>
                  <CardDescription>
                    Tải lên các file PDF để AI học và lưu trữ vào hệ thống RAG
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 rounded-full bg-primary/10">
                          <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Kéo thả file PDF hoặc click để chọn
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Hỗ trợ nhiều file, tối đa 50MB mỗi file
                          </p>
                        </div>
                        <Button variant="outline" disabled={isUploading}>
                          {isUploading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Đang tải lên...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Chọn file
                            </>
                          )}
                        </Button>
                      </div>
                    </label>
                  </div>

                  <div className="mt-4 p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium text-sm mb-2">Quy trình xử lý:</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
                        Upload file
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</span>
                        Trích xuất văn bản
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</span>
                        Tạo embeddings
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-1">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">4</span>
                        Lưu vào Vector DB
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Danh sách tài liệu ({documents.length})</CardTitle>
                  <CardDescription>
                    Quản lý các tài liệu đã upload vào hệ thống RAG
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {documents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Chưa có tài liệu nào được upload</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="p-2 rounded-lg bg-red-500/10">
                            <FileText className="w-6 h-6 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{doc.name}</p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>{doc.uploadedAt}</span>
                            </div>
                            {doc.status === "processing" && (
                              <div className="mt-2">
                                <Progress value={doc.progress} className="h-2" />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Đang xử lý: {Math.round(doc.progress)}%
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(doc.status)}
                            {doc.status === "failed" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleReprocessDocument(doc.id)}
                              >
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteDocument(doc.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chatbot">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Test AI Chatbot</CardTitle>
                      <CardDescription>
                        Kiểm tra khả năng trả lời của AI dựa trên tài liệu đã học
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {message.role === "assistant" && (
                              <div className="flex items-center gap-2 mb-2">
                                <Bot className="w-4 h-4" />
                                <span className="text-xs font-medium">AI Assistant</span>
                              </div>
                            )}
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isSending && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-sm">AI đang suy nghĩ...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <Separator />
                  <div className="p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nhập câu hỏi để test AI..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                        disabled={isSending}
                      />
                      <Button onClick={handleSendMessage} disabled={isSending || !newMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      <MessageSquare className="w-3 h-3 inline mr-1" />
                      AI sẽ trả lời dựa trên {completedDocs} tài liệu đã được xử lý
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CourseRAGManagement;
