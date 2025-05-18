
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Edit, Trash2, Share, Plus, Calendar, Users, DollarSign, Wallet, RefreshCcw } from "lucide-react";
import { connectWallet, donate, withdrawDonation, refundDonation } from "@/lib/metamask";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Mock campaign data (in a real app this would come from an API or blockchain)
const MOCK_CAMPAIGNS = [
  {
    id: "1",
    title: "Eco-Friendly Water Purifier",
    description: "A revolutionary water purifier that works without electricity and removes 99.9% of contaminants.",
    story: `Our eco-friendly water purifier is designed to provide clean drinking water to communities around the world without the need for electricity or complex infrastructure.

The purifier uses a multi-stage filtration system that removes bacteria, viruses, heavy metals, and other contaminants, making previously unsafe water sources drinkable.

## Why This Matters
  
Access to clean water is a fundamental human right, yet millions of people still lack this basic necessity. Our purifier can be deployed in remote areas, during disasters, or in regions with limited infrastructure.

## Technical Specifications

- Removes 99.9% of waterborne pathogens
- No electricity required
- Filters up to 1,000 liters before replacement
- Portable design for easy transportation
- Affordable replacement filters

## Timeline

- Month 1-2: Finalize production design
- Month 3: Begin manufacturing
- Month 4: Quality testing and certifications
- Month 5: Initial shipments to backers
- Month 6: Production scaling

With your support, we can bring this life-changing technology to those who need it most.`,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    goal: 10,
    raised: 6.5,
    daysLeft: 12,
    backers: 114,
    category: "Environment",
    creator: "0xf23...45ab",
    contributions: [
      { address: "0xab1...c23d", amount: 0.5, timestamp: "2023-05-06T14:22:10Z" },
      { address: "0x45d...8f9g", amount: 1.2, timestamp: "2023-05-05T09:15:32Z" },
      { address: "0xh12...j34k", amount: 0.8, timestamp: "2023-05-04T18:40:45Z" },
    ]
  },
  {
    id: "2",
    title: "AI-Powered Education Platform",
    description: "Personalized learning experience powered by artificial intelligence for K-12 students.",
    story: `Our AI-powered education platform revolutionizes how children learn by adapting to their individual learning styles, pace, and interests.

## The Problem

Traditional education uses a one-size-fits-all approach that leaves many students behind or bored. Our platform changes this paradigm by providing truly personalized learning.

## Our Solution

Using advanced machine learning algorithms, our platform:
- Identifies each student's strengths and weaknesses
- Adapts content difficulty in real-time
- Provides personalized recommendations 
- Offers insights to teachers and parents
- Makes learning fun through gamification

## Impact

Early pilots show:
- 40% improvement in subject comprehension
- 35% increase in student engagement
- 25% reduction in time needed to master new concepts

## Roadmap

- Phase 1: Core platform development
- Phase 2: Content creation for K-6 math and reading
- Phase 3: Expansion to grades 7-12
- Phase 4: Mobile app development
- Phase 5: Global language support

Help us bring personalized education to every child, regardless of their circumstances.`,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    goal: 15,
    raised: 9.2,
    daysLeft: 18,
    backers: 207,
    category: "Education",
    creator: "0xb52...78cd",
    contributions: [
      { address: "0xfe3...d21c", amount: 2.0, timestamp: "2023-05-10T08:15:10Z" },
      { address: "0x67a...f45e", amount: 1.5, timestamp: "2023-05-08T16:30:22Z" },
      { address: "0x89b...34ac", amount: 3.0, timestamp: "2023-05-04T11:45:33Z" },
    ]
  },
  {
    id: "3",
    title: "Smart Indoor Garden",
    description: "Grow fresh vegetables and herbs year-round with this automated indoor garden system.",
    story: `Our Smart Indoor Garden brings sustainable food production right into your home with minimal effort required.

## The Future of Home Gardening

Traditional gardening requires outdoor space, favorable weather, and regular attention. Our system eliminates these barriers, allowing anyone to grow fresh food year-round.

## Key Features

- Automated watering system that precisely delivers nutrients
- Smart lighting that mimics optimal growing conditions
- Companion app that monitors plant health and growth
- Space-efficient vertical design for small apartments
- Energy-efficient operation using just pennies of electricity per day

## Environmental Impact

- Reduces carbon footprint by eliminating transportation of produce
- Uses 95% less water than traditional gardening
- No pesticides or harmful chemicals needed
- Reduces food waste through harvest-as-needed approach

## Development Timeline

- Month 1: Finalize hardware design
- Month 2-3: Software development
- Month 4: Manufacturing setup
- Month 5: Assembly and quality control
- Month 6: Shipping to backers

Join us in creating a more sustainable food future, starting right in your own home!`,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    goal: 8,
    raised: 7.6,
    daysLeft: 5,
    backers: 183,
    category: "Food",
    creator: "0xc67...12de",
    contributions: [
      { address: "0xab9...f56d", amount: 1.0, timestamp: "2023-05-11T10:20:15Z" },
      { address: "0x34e...c78b", amount: 2.8, timestamp: "2023-05-07T14:35:22Z" },
      { address: "0x90f...23ae", amount: 1.5, timestamp: "2023-05-03T09:45:33Z" },
    ]
  },
  {
    id: "4",
    title: "Portable Solar Generator",
    description: "Compact and powerful solar generator for outdoor enthusiasts and emergency situations.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    story: `Our Portable Solar Generator provides reliable, renewable energy anywhere the sun shines, making it perfect for camping, emergencies, and off-grid living.

## Energy Independence in a Box

When power is unavailable or unreliable, our generator delivers clean electricity without noise, fumes, or ongoing fuel costs.

## Technical Specifications

- 1500W continuous output (3000W surge)
- 2kWh battery capacity with LiFePO4 chemistry (2000+ cycle life)
- Multiple output options: AC, USB-C, USB-A, and 12V DC
- Foldable 200W solar panel array
- Weighs just 25 pounds
- Charges from solar, wall outlet, or car
- Weather-resistant design

## Use Cases

- Emergency home backup during power outages
- Camping and outdoor recreation
- Remote work setups
- Construction sites
- Disaster relief operations
- Off-grid tiny homes and cabins

## Manufacturing Plan

- Month 1: Finalize component sourcing
- Month 2: Production setup
- Month 3-4: Initial manufacturing run
- Month 5: Quality testing and certification
- Month 6: Fulfillment to backers

Embrace energy independence with a sustainable power solution for both adventures and emergencies.`,
    goal: 12,
    raised: 3.8,
    daysLeft: 24,
    backers: 72,
    category: "Energy",
    creator: "0xd34...56ef",
    contributions: [
      { address: "0x12c...e45f", amount: 1.2, timestamp: "2023-05-08T11:25:30Z" },
      { address: "0x78d...a12c", amount: 0.8, timestamp: "2023-05-06T16:40:22Z" },
      { address: "0x45f...89bd", amount: 0.5, timestamp: "2023-05-01T09:15:45Z" },
    ]
  }
];

// Add user-created campaigns from localStorage to our mock data
const getUserCampaigns = () => {
  try {
    const userCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    return [...MOCK_CAMPAIGNS, ...userCampaigns];
  } catch (error) {
    console.error("Error loading user campaigns:", error);
    return MOCK_CAMPAIGNS;
  }
};

// Function to get a campaign by ID
const getCampaignById = (campaignId: string) => {
  const allCampaigns = getUserCampaigns();
  return allCampaigns.find(campaign => campaign.id === campaignId) || null;
};

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [wallet, setWallet] = useState<string | null>(null);
  const [contribution, setContribution] = useState("0.1");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  
  // Get the campaign data based on the ID from the URL
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) {
      toast({
        title: "Campaign not found",
        description: "Could not find the campaign you're looking for",
        variant: "destructive",
      });
      navigate("/explore");
      return;
    }

    // Get campaign by ID
    const campaignData = getCampaignById(id);
    if (campaignData) {
      setCampaign(campaignData);
    } else {
      toast({
        title: "Campaign not found",
        description: "Could not find the campaign you're looking for",
        variant: "destructive",
      });
      navigate("/explore");
    }
    
    setLoading(false);
  }, [id, navigate, toast]);
  
  // Calculate percentage raised
  const percentRaised = campaign ? Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100) : 0;
  
  const handleConnectWallet = async () => {
    const address = await connectWallet();
    setWallet(address);
  };
  
  const triggerProgressAnimation = () => {
    setAnimateProgress(true);
    setTimeout(() => setAnimateProgress(false), 1000);
  };
  
  const handleContribute = async () => {
    if (!campaign) return;
    
    if (!wallet) {
      const address = await connectWallet();
      setWallet(address);
      if (!address) return;
    }
    
    const amount = parseFloat(contribution);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid contribution amount",
        variant: "destructive",
      });
      return;
    }
    
    const success = await donate(amount, campaign.id);
    if (success) {
      setIsDialogOpen(false);
      
      // Trigger animation
      triggerProgressAnimation();
      
      // Update campaign state with new contribution
      setCampaign(prevCampaign => {
        // Add new contribution
        const newContribution = {
          address: wallet || "Unknown",
          amount: amount,
          timestamp: new Date().toISOString()
        };
        
        // Calculate new raised amount
        const newRaisedAmount = prevCampaign.raised + amount;
        
        // Update backers count (only if this is a new backer)
        const isNewBacker = !prevCampaign.contributions.some(c => c.address === wallet);
        const newBackersCount = isNewBacker ? prevCampaign.backers + 1 : prevCampaign.backers;
        
        return {
          ...prevCampaign,
          raised: parseFloat(newRaisedAmount.toFixed(2)), // Round to 2 decimal places
          backers: newBackersCount,
          contributions: [newContribution, ...prevCampaign.contributions]
        };
      });
      
      toast({
        title: "Contribution successful!",
        description: `You have contributed ${amount} ETH to this campaign. The progress has been updated.`,
      });
      
      // Update the campaign in localStorage if it's a user-created campaign
      updateCampaignInStorage(campaign.id);
      
    } else {
      toast({
        title: "Contribution failed",
        description: "There was an error processing your contribution",
        variant: "destructive",
      });
    }
  };
  
  const handleWithdraw = async () => {
    if (!campaign) return;
    
    if (!wallet) {
      const address = await connectWallet();
      setWallet(address);
      if (!address) return;
    }
    
    const success = await withdrawDonation(campaign.id);
    if (success) {
      // Find user's contribution amount from the campaign
      const userContribution = campaign.contributions.find(c => c.address === wallet);
      const withdrawAmount = userContribution ? userContribution.amount : 0;
      
      // Trigger animation
      triggerProgressAnimation();
      
      // Update campaign state
      if (withdrawAmount > 0) {
        setCampaign(prevCampaign => {
          const newContributions = prevCampaign.contributions.filter(c => c.address !== wallet);
          const newRaisedAmount = Math.max(0, prevCampaign.raised - withdrawAmount);
          const newBackersCount = prevCampaign.backers - 1;
          
          return {
            ...prevCampaign,
            raised: parseFloat(newRaisedAmount.toFixed(2)),
            backers: Math.max(0, newBackersCount),
            contributions: newContributions
          };
        });
        
        // Update the campaign in localStorage if it's a user-created campaign
        updateCampaignInStorage(campaign.id);
      }
      
      toast({
        title: "Withdrawal successful!",
        description: "Your contribution has been returned to your wallet",
      });
    } else {
      toast({
        title: "Withdrawal failed",
        description: "There was an error processing your withdrawal",
        variant: "destructive",
      });
    }
  };

  const handleRefund = async () => {
    if (!campaign) return;
    
    if (!wallet) {
      const address = await connectWallet();
      setWallet(address);
      if (!address) return;
    }
    
    // Find user's contribution from the campaign
    const userContribution = campaign.contributions.find(c => c.address === wallet);
    
    if (!userContribution) {
      toast({
        title: "No contribution found",
        description: "You don't have any contribution to refund",
        variant: "destructive",
      });
      return;
    }
    
    const refundAmount = userContribution.amount;
    
    if (refundAmount <= 0) {
      toast({
        title: "No contribution found",
        description: "You don't have any contribution to refund",
        variant: "destructive",
      });
      return;
    }
    
    console.log(`Attempting to refund ${refundAmount} ETH - exact user contribution amount`);
    
    const success = await refundDonation(campaign.id, refundAmount);
    
    if (success) {
      setIsRefundDialogOpen(false);
      
      // Trigger animation
      triggerProgressAnimation();
      
      // Update campaign state
      setCampaign(prevCampaign => {
        const newContributions = prevCampaign.contributions.filter(c => c.address !== wallet);
        const newRaisedAmount = Math.max(0, prevCampaign.raised - refundAmount);
        const newBackersCount = prevCampaign.backers - 1;
        
        return {
          ...prevCampaign,
          raised: parseFloat(newRaisedAmount.toFixed(2)),
          backers: Math.max(0, newBackersCount),
          contributions: newContributions
        };
      });
      
      // Update the campaign in localStorage if it's a user-created campaign
      updateCampaignInStorage(campaign.id);
      
      toast({
        title: "Refund successful!",
        description: `${refundAmount} ETH has been refunded to your wallet`,
      });
    } else {
      toast({
        title: "Refund failed",
        description: "There was an error processing your refund request",
        variant: "destructive",
      });
    }
  };
  
  // Update campaign in localStorage if it's a user-created campaign
  const updateCampaignInStorage = (campaignId: string) => {
    try {
      const userCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      const index = userCampaigns.findIndex((c: any) => c.id === campaignId);
      
      if (index !== -1) {
        // It's a user-created campaign, update it
        userCampaigns[index] = { ...campaign };
        localStorage.setItem('campaigns', JSON.stringify(userCampaigns));
      }
    } catch (error) {
      console.error("Error updating campaign in storage:", error);
    }
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign?.title || "Campaign",
          text: campaign?.description || "Check out this campaign",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Campaign link copied to clipboard",
      });
    }
  };
  
  const handleDelete = () => {
    // In a real app, this would delete the campaign from the blockchain or database
    try {
      const userCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      const updatedCampaigns = userCampaigns.filter((c: any) => c.id !== campaign?.id);
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      
      toast({
        title: "Campaign deleted",
        description: "Your campaign has been removed",
      });
      
      navigate("/explore");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast({
        title: "Error",
        description: "Failed to delete campaign",
        variant: "destructive",
      });
    }
  };
  
  // If campaign is loading or not found
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-violet-500 border-violet-100 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading campaign details...</p>
        </div>
      </div>
    );
  }
  
  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Campaign Not Found</h2>
          <p className="text-muted-foreground mb-4">The campaign you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/explore")}>
            Explore Campaigns
          </Button>
        </div>
      </div>
    );
  }
  
  const isCreator = wallet === campaign.creator;
  const hasContributed = campaign.contributions.some(c => c.address === wallet);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 hover:bg-transparent hover:text-primary" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to campaigns
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Campaign info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative rounded-xl overflow-hidden h-[400px] shadow-xl">
            <img 
              src={campaign.image} 
              alt={campaign.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 border-0 shadow-lg">{campaign.category}</Badge>
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">{campaign.title}</h1>
            <p className="text-muted-foreground mb-4">{campaign.description}</p>
          </div>
          
          <Tabs defaultValue="story" className="bg-white rounded-xl shadow-md overflow-hidden border border-violet-100">
            <TabsList className="mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-1 w-full justify-start">
              <TabsTrigger value="story" className="data-[state=active]:bg-white data-[state=active]:text-violet-700">Story</TabsTrigger>
              <TabsTrigger value="updates" className="data-[state=active]:bg-white data-[state=active]:text-violet-700">Updates</TabsTrigger>
              <TabsTrigger value="donaters" className="data-[state=active]:bg-white data-[state=active]:text-violet-700">Donaters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="story" className="prose prose-slate max-w-none px-6 py-4">
              <div className="whitespace-pre-line">
                {campaign.story}
              </div>
            </TabsContent>
            
            <TabsContent value="updates" className="px-6 py-4">
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No updates yet</p>
              </div>
            </TabsContent>
            
            <TabsContent value="donaters" className="px-6 py-4">
              {campaign.contributions && campaign.contributions.length > 0 ? (
                <div className="space-y-4 animate-fade-in">
                  {campaign.contributions.map((contribution: any, index: number) => (
                    <Card key={index} className="overflow-hidden border-l-4 border-l-violet-500 animate-fade-in hover:shadow-md transition-all">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            {contribution.address.substring(0, 6)}...
                            {contribution.address.substring(contribution.address.length - 4)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(contribution.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-violet-600">{contribution.amount} ETH</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No donations yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column: Campaign status and actions */}
        <div className="space-y-6">
          <Card className="border-2 border-violet-200 overflow-hidden bg-gradient-to-br from-white via-violet-50 to-indigo-50 shadow-xl rounded-xl">
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{campaign.raised} ETH raised</span>
                  <span className="text-muted-foreground">{percentRaised}%</span>
                </div>
                <Progress 
                  value={percentRaised} 
                  className="h-3 bg-violet-100 rounded-full" 
                  indicatorClassName="bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500"
                  animate={animateProgress}
                />
                <div className="flex justify-end text-xs text-muted-foreground mt-1">
                  Goal: {campaign.goal} ETH
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-2 bg-white/70 rounded-lg p-4 shadow-inner">
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Calendar className="h-5 w-5 text-pink-500" />
                  </div>
                  <p className="font-bold">{campaign.daysLeft}</p>
                  <p className="text-xs text-muted-foreground">Days Left</p>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <DollarSign className="h-5 w-5 text-violet-500" />
                  </div>
                  <p className="font-bold">{campaign.raised}</p>
                  <p className="text-xs text-muted-foreground">ETH Raised</p>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    <Users className="h-5 w-5 text-indigo-500" />
                  </div>
                  <p className="font-bold">{campaign.backers}</p>
                  <p className="text-xs text-muted-foreground">Donaters</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-3 pt-2 pb-6 px-6">
              {isCreator ? (
                <>
                  <Button className="w-full bg-gradient-to-r from-pink-500 via-violet-600 to-indigo-600 hover:from-pink-600 hover:via-violet-700 hover:to-indigo-700 text-white border-0 flex items-center gap-2 shadow-md" asChild>
                    <Link to={`/campaign/edit/${campaign.id}`}>
                      <Edit className="h-4 w-4" />
                      Edit Campaign
                    </Link>
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full flex items-center gap-2 shadow-md"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Campaign
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex gap-3 w-full">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex-1 bg-gradient-to-r from-pink-500 via-violet-600 to-indigo-600 hover:from-pink-600 hover:via-violet-700 hover:to-indigo-700 text-white border-0 flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                          <Plus className="h-4 w-4" />
                          Support This Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gradient-to-br from-white to-violet-50 border-violet-100">
                        <DialogHeader>
                          <DialogTitle className="text-center text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-600">Support this campaign</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="contribution">Contribution Amount (ETH)</Label>
                            <Input
                              id="contribution"
                              type="number"
                              min="0.01"
                              step="0.01"
                              value={contribution}
                              onChange={(e) => setContribution(e.target.value)}
                              placeholder="0.1"
                              className="border-violet-200 focus-visible:ring-violet-400"
                            />
                            <p className="text-xs text-muted-foreground">
                              Minimum contribution: 0.01 ETH
                            </p>
                          </div>
                          
                          <Button 
                            className="w-full bg-gradient-to-r from-pink-500 via-violet-600 to-indigo-600 hover:from-pink-600 hover:via-violet-700 hover:to-indigo-700 text-white border-0 shadow-md"
                            onClick={handleContribute}
                          >
                            {wallet ? "Contribute Now" : "Connect Wallet & Contribute"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1 border-pink-300 text-pink-700 hover:bg-pink-50 flex items-center gap-2 shadow-sm"
                      onClick={() => {
                        if (!wallet) {
                          handleConnectWallet().then(() => {
                            if (wallet) {
                              handleRefund();
                            }
                          });
                        } else {
                          handleRefund();
                        }
                      }}
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Refund
                    </Button>
                  </div>
                  
                  {hasContributed && (
                    <Button 
                      variant="outline" 
                      className="w-full border-violet-300 text-violet-700 hover:bg-violet-50 flex items-center gap-2 shadow-sm"
                      onClick={handleWithdraw}
                    >
                      <Wallet className="h-4 w-4" />
                      Withdraw Contribution
                    </Button>
                  )}
                </>
              )}
              
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 border-indigo-200 hover:bg-indigo-50 text-indigo-700"
                onClick={handleShare}
              >
                <Share className="h-4 w-4" />
                Share Campaign
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-violet-200 bg-gradient-to-br from-white to-indigo-50 shadow-md rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 via-violet-400 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                  <span className="font-medium">
                    {campaign.creator.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">Created by</p>
                  <p className="text-sm text-muted-foreground">
                    {campaign.creator.substring(0, 6)}...{campaign.creator.substring(campaign.creator.length - 4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
