import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const CampaignForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState("details");
  const [formData, setFormData] = useState({
    title: "",
    goal: "",
    duration: "",
    category: "",
    image: "",
    description: "",
    story: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === "details") {
      if (!formData.title || !formData.goal || !formData.duration || !formData.category || !formData.image || !formData.description) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      setStep("story");
    } else if (step === "story") {
      if (!formData.story) {
        toast({
          title: "Missing story",
          description: "Please add your campaign story",
          variant: "destructive",
        });
        return;
      }
      setStep("review");
    }
  };

  const handlePrevious = () => {
    if (step === "story") {
      setStep("details");
    } else if (step === "review") {
      setStep("story");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the data to a backend API or smart contract
    console.log("Submitting campaign:", formData);
    
    toast({
      title: "Campaign Created!",
      description: "Your campaign has been successfully published",
    });
    
    // Navigate to the campaign page (would use the actual ID in a real app)
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card className="border-2 border-primary/20">
        <CardContent className="pt-6">
          <Tabs value={step} className="mb-8">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="details" disabled={step !== "details"}>
                Campaign Details
              </TabsTrigger>
              <TabsTrigger value="story" disabled={step !== "story"}>
                Your Story
              </TabsTrigger>
              <TabsTrigger value="review" disabled={step !== "review"}>
                Review & Submit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="py-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Campaign Title*</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a clear, specific title"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Funding Goal (ETH)*</Label>
                    <Input
                      id="goal"
                      name="goal"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={formData.goal}
                      onChange={handleChange}
                      placeholder="1.5"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Campaign Duration (days)*</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      min="1"
                      max="60"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="30"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category*</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Arts">Arts</option>
                    <option value="Environment">Environment</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Food">Food</option>
                    <option value="Energy">Energy</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Campaign Image URL*</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description*</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly describe your campaign (100-150 words)"
                    className="resize-none"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                    Next: Add Your Story
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="story" className="py-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="story">Campaign Story*</Label>
                  <Textarea
                    id="story"
                    name="story"
                    value={formData.story}
                    onChange={handleChange}
                    placeholder="Tell potential backers about your project. What are you trying to accomplish? Why does it matter? What's your plan to make it happen?"
                    className="min-h-[300px]"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    Previous: Campaign Details
                  </Button>
                  <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                    Next: Review & Submit
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="review" className="py-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Review Your Campaign</h3>
                  
                  <div className="space-y-4 border rounded-lg p-4">
                    <div>
                      <span className="font-medium">Title:</span> {formData.title}
                    </div>
                    <div>
                      <span className="font-medium">Goal:</span> {formData.goal} ETH
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {formData.duration} days
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {formData.category}
                    </div>
                    <div>
                      <span className="font-medium">Description:</span> {formData.description}
                    </div>
                    <div className="pt-2 border-t">
                      <span className="font-medium">Story Preview:</span>
                      <p className="mt-1 text-sm">{formData.story.substring(0, 200)}...</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious}>
                    Previous: Your Story
                  </Button>
                  <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                    Publish Campaign
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignForm;
