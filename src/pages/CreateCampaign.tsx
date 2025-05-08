
import Header from "@/components/Header";
import CampaignForm from "@/components/CampaignForm";

const CreateCampaign = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1 text-center">Create Your Campaign</h1>
          <p className="text-center text-muted-foreground mb-8">
            Fill in the details below to launch your crowdfunding campaign
          </p>
          
          <CampaignForm />
        </div>
      </div>
      
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FundFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CreateCampaign;
