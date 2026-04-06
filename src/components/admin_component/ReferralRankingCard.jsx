import { User } from "lucide-react";

function ReferralRankingCard({ title, linkText, users }) {
  return (
    <div className="max-w-md mx-auto overflow-hidden bg-white border-2 border-blue-500 rounded-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h2 className="font-semibold text-md">{title}</h2>
        <button className="text-sm font-medium text-blue-600 hover:underline">
          {linkText} &gt;
        </button>
      </div>

      {/* List */}
      <div>
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
                <User className="w-4 h-4 text-white" />
              </div>

              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">Level {user.level}</p>
              </div>
            </div>

            <p className="text-sm font-medium">₹{user.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReferralRankingCard;
