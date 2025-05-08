
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { connectWallet } from "@/lib/metamask";
import { Rocket, Compass } from "lucide-react";

const Header = () => {
  const [wallet, setWallet] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleConnectWallet = async () => {
    const address = await connectWallet();
    setWallet(address);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-b shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold gradient-text">FundFlow</Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-gray-700 hover:text-primary transition-colors">
            Explore
          </Link>
          <Link to="/how-it-works" className="text-gray-700 hover:text-primary transition-colors">
            How It Works
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/create">
            <Button className="hidden sm:flex gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 border-0">
              <Rocket className="h-4 w-4" />
              <span>Launch Campaign</span>
            </Button>
          </Link>
          
          <Link to="/explore">
            <Button variant="outline" className="hidden sm:flex gap-2 border-primary text-primary hover:bg-primary/10">
              <Compass className="h-4 w-4" />
              <span>Explore</span>
            </Button>
          </Link>
          
          {wallet ? (
            <Button variant="ghost" className="text-xs sm:text-sm truncate max-w-[150px]">
              {wallet.substring(0, 6)}...{wallet.substring(wallet.length - 4)}
            </Button>
          ) : (
            <Button 
              variant="secondary" 
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-indigo-400 to-violet-500 text-white hover:from-indigo-500 hover:to-violet-600 border-0"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
