import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface CourseFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  courseCount: number;
}

const CourseFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  courseCount 
}: CourseFilterProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Khóa học của tôi</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {courseCount} khóa học
          </span>
          <button className="text-primary hover:text-primary/80 font-medium">
            Xem tất cả
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === "Tất cả" ? "default" : "secondary"}
          className={`cursor-pointer transition-all ${
            selectedCategory === "Tất cả" 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
          onClick={() => onCategoryChange("Tất cả")}
        >
          Tất cả
        </Badge>
        
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className={`cursor-pointer transition-all ${
              selectedCategory === category 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CourseFilter;