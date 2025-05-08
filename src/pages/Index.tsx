
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import FeaturedCampaigns from "@/components/FeaturedCampaigns";
import { Rocket, Compass } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 gradient-bg opacity-80"></div>
          
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-3xl text-center mx-auto text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Fund Your Dreams, Support Innovation
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-10">
                Decentralized crowdfunding platform that connects creators with backers worldwide. Launch your campaign or support others with crypto.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/create">
                  <Button size="lg" className="px-8 bg-white text-primary hover:bg-white/90 flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    Launch Your Campaign
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white/20 flex items-center gap-2">
                    <Compass className="h-5 w-5" />
                    Explore Campaigns
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L48 8.3C96 16.7 192 33.3 288 46.7C384 60 480 70 576 66.7C672 63.3 768 46.7 864 36.7C960 26.7 1056 23.3 1152 30C1248 36.7 1344 53.3 1392 61.7L1440 70V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" fill="white"/>
            </svg>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <p className="text-3xl font-bold gradient-text mb-2">100+</p>
                <p className="text-muted-foreground">Active Campaigns</p>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold gradient-text mb-2">500+</p>
                <p className="text-muted-foreground">Total Backers</p>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold gradient-text mb-2">250 ETH</p>
                <p className="text-muted-foreground">Funds Raised</p>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold gradient-text mb-2">30+</p>
                <p className="text-muted-foreground">Successful Projects</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Campaigns */}
        <FeaturedCampaigns />
        
        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our decentralized crowdfunding platform makes it easy to launch your campaign and collect contributions through MetaMask
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Your Campaign</h3>
                <p className="text-muted-foreground">
                  Set up your campaign with details, images, and your funding goal in just a few steps
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Share with Everyone</h3>
                <p className="text-muted-foreground">
                  Promote your campaign using our sharing tools and your social networks
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Funded</h3>
                <p className="text-muted-foreground">
                  Receive contributions directly to your wallet through MetaMask integration
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Campaign?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of creators who have successfully funded their projects through our platform
            </p>
            <Link to="/create">
              <Button size="lg" className="px-8 bg-white text-primary hover:bg-white/90">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FundFlow</h3>
              <p className="text-gray-400">
                Decentralized crowdfunding platform powered by blockchain technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/explore" className="hover:text-white transition-colors">Explore</Link></li>
                <li><Link to="/create" className="hover:text-white transition-colors">Create Campaign</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Telegram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} FundFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
