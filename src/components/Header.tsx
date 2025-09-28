import { Button } from "@/components/ui/button";
import { Activity, Upload, Download, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card/50 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Activity className="h-8 w-8 text-primary animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-success rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                InjuryPro AI
              </h1>
              <p className="text-sm text-muted-foreground">Advanced Sports Analytics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="premium" size="sm" className="relative overflow-hidden">
              <span className="relative z-10">Upgrade Pro</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;