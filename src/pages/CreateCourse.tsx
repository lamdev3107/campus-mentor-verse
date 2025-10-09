import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("intended-learners");
  const [learningObjectives, setLearningObjectives] = useState([
    "ytyfv",
    "uyfyuxf",
    "jfuJufyufy",
    "Example: Complete a case study to manage a project from conception to completion",
    "rfyufrfu"
  ]);
  const [requirements, setRequirements] = useState([
    "ưffrưeưer",
    "Example: No programming experience needed. You will learn everything you need to know"
  ]);
  const [targetAudience, setTargetAudience] = useState([
    "qeưneqưneser",
    "Example: Beginner Python developers curious about data science"
  ]);

  const sections = [
    { id: "intended-learners", label: "Intended learners" },
    { id: "practice-tests", label: "Practice tests" },
    { id: "landing-page", label: "Course landing page" },
    { id: "pricing", label: "Pricing" },
    { id: "promotions", label: "Promotions" },
    { id: "messages", label: "Course messages" }
  ];

  const addLearningObjective = () => {
    setLearningObjectives([...learningObjectives, ""]);
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const addTargetAudience = () => {
    setTargetAudience([...targetAudience, ""]);
  };

  const updateLearningObjective = (index: number, value: string) => {
    const updated = [...learningObjectives];
    updated[index] = value;
    setLearningObjectives(updated);
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const updateTargetAudience = (index: number, value: string) => {
    const updated = [...targetAudience];
    updated[index] = value;
    setTargetAudience(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to courses
            </button>
            <div className="flex items-center gap-3">
              <span className="font-semibold">ytuyiut</span>
              <span className="px-2 py-1 text-xs bg-muted rounded">DRAFT</span>
              <span className="text-sm text-muted-foreground">0min of video content uploaded</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="default">Save</Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 border-r min-h-[calc(100vh-60px)] bg-card p-6">
          <RadioGroup value={selectedSection} onValueChange={setSelectedSection}>
            <div className="space-y-3">
              {sections.map((section) => (
                <div key={section.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={section.id} id={section.id} />
                  <Label htmlFor={section.id} className="cursor-pointer font-normal">
                    {section.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <Button className="w-full mt-8 bg-primary hover:bg-primary/90">
            Publish Course
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-4xl">
          {selectedSection === "intended-learners" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">Intended learners</h1>
                <p className="text-muted-foreground">
                  The following descriptions will be publicly visible on your{" "}
                  <a href="#" className="text-primary underline">Course Landing Page</a> and will have a direct impact on your
                  course performance. These descriptions will help learners decide if your course is right for them.
                </p>
              </div>

              {/* Learning Objectives */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    What will students learn in your course?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    You must enter at least 4{" "}
                    <a href="#" className="text-primary underline">learning objectives or outcomes</a> that learners can
                    expect to achieve after completing your course.
                  </p>
                </div>

                <div className="space-y-3">
                  {learningObjectives.map((objective, index) => (
                    <div key={index} className="relative">
                      <Input
                        value={objective}
                        onChange={(e) => updateLearningObjective(index, e.target.value)}
                        maxLength={160}
                        placeholder="Example: Define the roles and responsibilities of a project manager"
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        {objective.length > 0 ? 160 - objective.length : 160}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addLearningObjective}
                  className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
                >
                  + Add more to your response
                </button>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    What are the requirements or prerequisites for taking your course?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    List the required skills, experience, tools or equipment learners should have prior to taking your course.
                    If there are no requirements, use this space as an opportunity to lower the barrier for beginners.
                  </p>
                </div>

                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index}>
                      <Textarea
                        value={requirement}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        placeholder="Example: No programming experience needed. You will learn everything you need to know"
                        className="min-h-[60px] resize-none"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={addRequirement}
                  className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
                >
                  + Add more to your response
                </button>
              </div>

              {/* Target Audience */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    Who is this course for?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Write a clear description of the{" "}
                    <a href="#" className="text-primary underline">intended learners</a> for your course who will find your
                    course content valuable.
                    This will help you attract the right learners to your course.
                  </p>
                </div>

                <div className="space-y-3">
                  {targetAudience.map((audience, index) => (
                    <div key={index}>
                      <Textarea
                        value={audience}
                        onChange={(e) => updateTargetAudience(index, e.target.value)}
                        placeholder="Example: Beginner Python developers curious about data science"
                        className="min-h-[60px] resize-none"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={addTargetAudience}
                  className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
                >
                  + Add more to your response
                </button>
              </div>
            </div>
          )}

          {selectedSection !== "intended-learners" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">
                {sections.find(s => s.id === selectedSection)?.label}
              </h2>
              <p className="text-muted-foreground">This section is under construction</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;
