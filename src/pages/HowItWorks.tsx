
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Rocket, Settings, PiggyBank, Users, BarChart } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-100">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-violet-500 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How FundFlow Works</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-10">
              Our decentralized crowdfunding platform makes it easy to launch campaigns
              and receive contributions through secure blockchain technology
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/create">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium">
                  Start Your Campaign
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Explore Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Step by Step Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-700">
                The Process: Step by Step
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                From project concept to successful funding, we've made the process
                simple and transparent for creators and supporters
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-xl shadow-md p-8 transform transition-transform hover:scale-105 hover:shadow-lg border-t-4 border-violet-500">
                <div className="h-14 w-14 rounded-full bg-violet-100 flex items-center justify-center mb-6 mx-auto">
                  <Rocket className="h-7 w-7 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">1. Create Your Campaign</h3>
                <p className="text-gray-600 text-center">
                  Set up your campaign with details, images, funding goals, and your story.
                  Make it compelling to attract potential supporters.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Build your campaign page with our easy-to-use tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Set funding goals and campaign duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Add compelling visuals and your story</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8 transform transition-transform hover:scale-105 hover:shadow-lg border-t-4 border-indigo-500 md:mt-10">
                <div className="h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center mb-6 mx-auto">
                  <Users className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">2. Share & Promote</h3>
                <p className="text-gray-600 text-center">
                  Share your campaign with your network and the FundFlow community to
                  gain visibility and attract supporters.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Share campaign links on social media platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Engage with potential supporters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Post regular updates to build trust</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-8 transform transition-transform hover:scale-105 hover:shadow-lg border-t-4 border-blue-500 md:mt-20">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                  <PiggyBank className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">3. Receive Funding</h3>
                <p className="text-gray-600 text-center">
                  As supporters contribute to your campaign, you'll receive funds
                  directly through secure blockchain transactions.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Receive contributions through MetaMask</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Track funding progress in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Access funds directly through your wallet</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Supporters */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-violet-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-700">
                For Supporters
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Supporting innovative projects on FundFlow is easy, secure, and transparent
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-violet-600" />
                  </span>
                  How to Contribute
                </h3>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <span className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0 text-violet-600 font-medium">1</span>
                    <div>
                      <h4 className="font-medium mb-1">Browse Projects</h4>
                      <p className="text-gray-600 text-sm">
                        Explore campaigns and find projects that align with your interests and values
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0 text-violet-600 font-medium">2</span>
                    <div>
                      <h4 className="font-medium mb-1">Connect Your Wallet</h4>
                      <p className="text-gray-600 text-sm">
                        Use MetaMask to securely connect your cryptocurrency wallet to FundFlow
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0 text-violet-600 font-medium">3</span>
                    <div>
                      <h4 className="font-medium mb-1">Support Projects</h4>
                      <p className="text-gray-600 text-sm">
                        Contribute ETH to campaigns you want to support with just a few clicks
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0 text-violet-600 font-medium">4</span>
                    <div>
                      <h4 className="font-medium mb-1">Track Progress</h4>
                      <p className="text-gray-600 text-sm">
                        Follow campaign updates and see how your contribution helps projects succeed
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-indigo-600" />
                  </span>
                  Supporter Benefits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Transparent Transactions</h4>
                      <p className="text-gray-600 text-sm">
                        All contributions are recorded on the blockchain, ensuring complete transparency
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Withdraw Option</h4>
                      <p className="text-gray-600 text-sm">
                        If you change your mind, you can withdraw your contribution before the campaign ends
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Project Updates</h4>
                      <p className="text-gray-600 text-sm">
                        Receive updates from campaign creators about project progress and milestones
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Support Innovation</h4>
                      <p className="text-gray-600 text-sm">
                        Help bring innovative ideas and solutions to life by providing necessary funding
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-violet-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join the FundFlow community today and start creating or supporting innovative campaigns
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/create">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium">
                  Launch Your Campaign
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Explore Campaigns
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-300">FundFlow</h3>
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
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
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

export default HowItWorks;
