
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CampaignCard from "@/components/CampaignCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for campaigns - same as in FeaturedCampaigns
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
  },
  {
    id: "7",
    title: "Sustainable Fashion Marketplace",
    description: "A platform connecting ethical clothing manufacturers with conscious consumers.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    goal: 25,
    raised: 12.3,
    daysLeft: 28,
    backers: 189,
    category: "Fashion"
  },
  {
    id: "8",
    title: "Community Urban Garden",
    description: "Transforming empty urban spaces into thriving community gardens for food security.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    goal: 5,
    raised: 2.8,
    daysLeft: 19,
    backers: 97,
    category: "Environment"
  },
  {
    id: "9",
    title: "Virtual Reality Education Tools",
    description: "Making learning more engaging with immersive VR experiences for classrooms.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    goal: 18,
    raised: 7.2,
    daysLeft: 22,
    backers: 143,
    category: "Technology"
  }
];

const Explore = () => {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [allCampaigns, setAllCampaigns] = useState([...MOCK_CAMPAIGNS]);
  
  // Load user-created campaigns from localStorage
  useEffect(() => {
    const userCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    if (userCampaigns.length > 0) {
      setAllCampaigns([...userCampaigns, ...MOCK_CAMPAIGNS]);
    }
  }, []);
  
  // Filter campaigns by category and search term
  const filteredCampaigns = allCampaigns.filter(campaign => {
    const matchesCategory = category === "all" || campaign.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600">
              Explore Campaigns
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Discover innovative projects from creators around the world and support the ones that inspire you
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search campaigns..."
                className="pl-10 border-violet-200 focus-visible:ring-violet-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="mt-6 md:mt-0" onValueChange={setCategory}>
              <TabsList className="bg-gradient-to-r from-indigo-100 to-violet-100 backdrop-blur-sm">
                <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500 data-[state=active]:text-white">All</TabsTrigger>
                <TabsTrigger value="technology" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500 data-[state=active]:text-white">Tech</TabsTrigger>
                <TabsTrigger value="arts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500 data-[state=active]:text-white">Arts</TabsTrigger>
                <TabsTrigger value="environment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500 data-[state=active]:text-white">Environment</TabsTrigger>
                <TabsTrigger value="fashion" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500 data-[state=active]:text-white">Fashion</TabsTrigger>
                <TabsTrigger value="health" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-violet-500 data-[state=active]:text-white">Health</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} {...campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 rounded-xl shadow-sm">
              <h3 className="text-xl font-medium mb-2 text-violet-700">No campaigns found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
              <Button className="mt-4 bg-gradient-to-r from-pink-500 to-violet-600 border-0" onClick={() => {
                setSearchTerm("");
                setCategory("all");
              }}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">FundFlow</h3>
              <p className="text-gray-300">
                Decentralized crowdfunding platform powered by blockchain technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-pink-200">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Button variant="link" className="p-0 h-auto text-gray-300 hover:text-pink-200">Home</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-300 hover:text-pink-200">Explore</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-300 hover:text-pink-200">Create Campaign</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-200">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Button variant="link" className="p-0 h-auto text-gray-300 hover:text-purple-200">How It Works</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-300 hover:text-purple-200">FAQ</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-300 hover:text-purple-200">Support</Button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-indigo-200">Connect</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Button variant="link" className="p-0 h-auto text-gray-300 hover:text-indigo-200">Twitter</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-300 hover:text-indigo-200">Discord</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-300 hover:text-indigo-200">Telegram</Button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FundFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Explore;
