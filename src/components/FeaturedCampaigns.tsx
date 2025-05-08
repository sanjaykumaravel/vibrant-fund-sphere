
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignCard from "./CampaignCard";

// Mock data for campaigns
const MOCK_CAMPAIGNS = [
  {
    id: "1",
    title: "Eco-Friendly Water Purifier",
    description: "A revolutionary water purifier that works without electricity and removes 99.9% of contaminants.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    goal: 10,
    raised: 6.5,
    daysLeft: 12,
    backers: 114,
    category: "Environment"
  },
  {
    id: "2",
    title: "AI-Powered Education Platform",
    description: "Personalized learning experience powered by artificial intelligence for K-12 students.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    goal: 15,
    raised: 9.2,
    daysLeft: 18,
    backers: 207,
    category: "Education"
  },
  {
    id: "3",
    title: "Smart Indoor Garden",
    description: "Grow fresh vegetables and herbs year-round with this automated indoor garden system.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    goal: 8,
    raised: 7.6,
    daysLeft: 5,
    backers: 183,
    category: "Food"
  },
  {
    id: "4",
    title: "Portable Solar Generator",
    description: "Compact and powerful solar generator for outdoor enthusiasts and emergency situations.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    goal: 12,
    raised: 3.8,
    daysLeft: 24,
    backers: 72,
    category: "Energy"
  },
  {
    id: "5",
    title: "Inclusive Children's Storybooks",
    description: "A series of storybooks featuring diverse characters and teaching inclusivity.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    goal: 6,
    raised: 4.1,
    daysLeft: 9,
    backers: 128,
    category: "Arts"
  },
  {
    id: "6",
    title: "Mental Health Support App",
    description: "A mobile app providing tools and resources for mental health support and wellness.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    goal: 20,
    raised: 15.8,
    daysLeft: 15,
    backers: 310,
    category: "Health"
  }
];

const FeaturedCampaigns = () => {
  const [category, setCategory] = useState("all");
  
  const filteredCampaigns = category === "all" 
    ? MOCK_CAMPAIGNS 
    : MOCK_CAMPAIGNS.filter(campaign => campaign.category.toLowerCase() === category);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Campaigns</h2>
            <p className="text-muted-foreground">Discover innovative projects worth supporting</p>
          </div>
          
          <Tabs defaultValue="all" className="mt-6 md:mt-0" onValueChange={setCategory}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="technology">Tech</TabsTrigger>
              <TabsTrigger value="arts">Arts</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
            View All Campaigns
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
