
import { useState } from "react";
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

// Mock campaign data (in a real app this would come from an API or blockchain)
const MOCK_CAMPAIGN = {
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
};

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [wallet, setWallet] = useState<string | null>(null);
  const [contribution, setContribution] = useState("0.1");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  
  // In a real app, we would fetch the campaign data using the ID
  const campaign = MOCK_CAMPAIGN;
  
  // Calculate percentage raised
  const percentRaised = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
  
  const handleConnectWallet = async () => {
    const address = await connectWallet();
    setWallet(address);
  };
  
  const handleContribute = async () => {
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
      toast({
        title: "Contribution successful!",
        description: `You have contributed ${amount} ETH to this campaign`,
      });
      
      // In a real app, we would refresh the campaign data
    } else {
      toast({
        title: "Contribution failed",
        description: "There was an error processing your contribution",
        variant: "destructive",
      });
    }
  };
  
  const handleWithdraw = async () => {
    if (!wallet) {
      const address = await connectWallet();
      setWallet(address);
      if (!address) return;
    }
    
    const success = await withdrawDonation(campaign.id);
    if (success) {
      toast({
        title: "Withdrawal successful!",
        description: "Your contribution has been returned to your wallet",
      });
      
      // In a real app, we would refresh the campaign data
    } else {
      toast({
        title: "Withdrawal failed",
        description: "There was an error processing your withdrawal",
        variant: "destructive",
      });
    }
  };

  const handleRefund = async () => {
    if (!wallet) {
      const address = await connectWallet();
      setWallet(address);
      if (!address) return;
    }
    
    // For demo purposes, we assume the user contributed 0.5 ETH
    const refundAmount = 0.5;
    const success = await refundDonation(campaign.id, refundAmount);
    
    if (success) {
      setIsRefundDialogOpen(false);
      toast({
        title: "Refund successful!",
        description: `${refundAmount} ETH has been refunded to your wallet`,
      });
      
      // In a real app, we would refresh the campaign data
    } else {
      toast({
        title: "Refund failed",
        description: "There was an error processing your refund request",
        variant: "destructive",
      });
    }
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: campaign.description,
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
    toast({
      title: "Campaign deleted",
      description: "Your campaign has been removed",
    });
    
    navigate("/");
  };
  
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
              <div className="space-y-4">
                {campaign.contributions.map((contribution, index) => (
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
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-pink-500 via-violet-600 to-indigo-600 hover:from-pink-600 hover:via-violet-700 hover:to-indigo-700 text-white border-0 flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
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
                  
                  {hasContributed && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full border-violet-300 text-violet-700 hover:bg-violet-50 flex items-center gap-2 shadow-sm"
                        onClick={handleWithdraw}
                      >
                        <Wallet className="h-4 w-4" />
                        Withdraw Contribution
                      </Button>
                      
                      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full border-pink-300 text-pink-700 hover:bg-pink-50 flex items-center gap-2 shadow-sm"
                          >
                            <RefreshCcw className="h-4 w-4" />
                            Request Refund
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gradient-to-br from-white to-pink-50 border-pink-100">
                          <DialogHeader>
                            <DialogTitle className="text-center text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-600">Request a Refund</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <p className="text-center text-muted-foreground">
                              You can request a refund if the campaign hasn't reached its funding goal by the deadline. Once confirmed, your contribution will be returned to your wallet.
                            </p>
                            <Button 
                              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 shadow-md"
                              onClick={handleRefund}
                            >
                              Confirm Refund Request
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
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

import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default CampaignDetails;
