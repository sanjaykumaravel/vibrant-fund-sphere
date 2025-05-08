
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Users, DollarSign } from "lucide-react";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  daysLeft: number;
  backers: number;
  category: string;
}

const CampaignCard = ({ 
  id, title, description, image, goal, raised, daysLeft, backers, category 
}: CampaignCardProps) => {
  // Calculate percentage raised
  const percentRaised = Math.min(Math.round((raised / goal) * 100), 100);
  
  return (
    <Link to={`/campaign/${id}`}>
      <Card className="overflow-hidden campaign-card group hover:shadow-lg transition-all transform hover:translate-y-[-5px] h-full border-t-4 border-t-violet-500">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white border-0">
            {category}
          </Badge>
        </div>
        
        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-2 line-clamp-1 group-hover:text-violet-700 transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{raised} ETH raised</span>
                <span className="text-muted-foreground">{percentRaised}%</span>
              </div>
              <Progress 
                value={percentRaised} 
                className="h-2 bg-violet-100" 
                indicatorClassName="bg-gradient-to-r from-violet-500 to-indigo-600" 
              />
              <div className="flex justify-end text-xs text-muted-foreground mt-1">
                Goal: {goal} ETH
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-5 py-4 border-t flex justify-between text-sm bg-gradient-to-br from-white to-violet-50">
          <div className="flex items-center gap-1 text-violet-700">
            <CalendarDays className="h-4 w-4" />
            <span>{daysLeft} days left</span>
          </div>
          
          <div className="flex items-center gap-1 text-violet-700">
            <Users className="h-4 w-4" />
            <span>{backers} donaters</span>
          </div>
          
          <div className="flex items-center gap-1 text-violet-700">
            <DollarSign className="h-4 w-4" />
            <span>Min. 0.01 ETH</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CampaignCard;
