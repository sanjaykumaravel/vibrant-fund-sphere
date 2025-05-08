
import Header from "@/components/Header";
import CampaignDetails from "@/components/CampaignDetails";

const Campaign = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="flex-1 py-8">
        <CampaignDetails />
      </div>
      
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
                <li><a href="/" className="hover:text-pink-200 transition-colors">Home</a></li>
                <li><a href="/explore" className="hover:text-pink-200 transition-colors">Explore</a></li>
                <li><a href="/create" className="hover:text-pink-200 transition-colors">Create Campaign</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-200">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/how-it-works" className="hover:text-purple-200 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-indigo-200">Connect</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-indigo-200 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-indigo-200 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-indigo-200 transition-colors">Telegram</a></li>
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

export default Campaign;
