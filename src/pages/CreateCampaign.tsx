
import Header from "@/components/Header";
import CampaignForm from "@/components/CampaignForm";

const CreateCampaign = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <Header />
      
      <div className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-violet-600 to-indigo-500">Create Your Campaign</h1>
          <p className="text-center text-muted-foreground mb-8">
            Fill in the details below to launch your crowdfunding campaign
          </p>
          
          <CampaignForm />
        </div>
      </div>
      
      <footer className="bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-violet-200">&copy; {new Date().getFullYear()} FundFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CreateCampaign;
