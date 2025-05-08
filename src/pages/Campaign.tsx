
import Header from "@/components/Header";
import CampaignDetails from "@/components/CampaignDetails";

const Campaign = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1">
        <CampaignDetails />
      </div>
      
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FundFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Campaign;
