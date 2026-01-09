import React from "react";
import { Send, Mail, IndianRupee, Megaphone } from "lucide-react";
import Datacard from "./DataCard";

const MarketingCamp = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      
      <Datacard
        title="Active Campaigns"
        value="3"
        subtitle="Running +1 New"
        change="+1"
        icon={<Megaphone className="text-blue-500" />}
        bg="bg-blue-50"
      />

      <Datacard
        title="WhatsApp Sent"
        value="2,540"
        change="+620"
        icon={<Send className="text-green-500" />}
        bg="bg-green-50"
      />

      <Datacard
        title="Emails Sent"
        value="3,200"
        change="+950"
        icon={<Mail className="text-indigo-500" />}
        bg="bg-indigo-50"
      />

      <Datacard
        title="Revenue Generated"
        value="₹1,28,400"
        change="+₹32,750"
        icon={<IndianRupee className="text-emerald-600" />}
        bg="bg-emerald-50"
      />
      
    </div>
  );
};

export default MarketingCamp;
