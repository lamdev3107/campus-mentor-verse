import { Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
  image: string;
  category: string;
}

const CourseCard = ({
  title,
  instructor,
  duration,
  students,
  rating,
  progress,
  image,
  category,
}: CourseCardProps) => {
  return (
    <Card className="bg-course-card shadow-card hover:shadow-hover transition-all duration-300 group overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
          {category}
        </Badge>
      </div>

      <CardContent className="p-6">
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">
          Giảng viên: {instructor}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{students}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
          Tiếp tục học
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;