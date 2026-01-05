import React from 'react';

const RecentActivity = () => {
  // Recent activity data
  const activities = [
    {
      id: 1,
      name: 'Emma Johnson',
      userId: '#USER7892',
      image: 'https://images.unsplash.com/photo-1464863979621-258859e62245?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdpcmxzfGVufDB8fDB8fHww',
      activity: 'Completed profile verification',
      time: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sophia Williams',
      userId: '#USER4512',
      image: 'https://play-lh.googleusercontent.com/Bo_vGIMCHsje7K2EOVdidfQyqoWPuTZ_Juz3G8P2ybVqRO52oeehMpL6uv3yNrjajQ=w240-h480-rw',
      activity: 'Made a new withdrawal request',
      time: '3 hours ago'
    },
    {
      id: 3,
      name: 'Olivia Brown',
      userId: '#USER3345',
      image: 'https://photosweek.in/wp-content/uploads/Instagram-Girl-DP-2.jpg',
      activity: 'Updated payment information',
      time: '5 hours ago'
    }
  ];

  return (
    <div className="bg-gray-50 p-4 md:p-6">
      {/* Labels - No Card Background */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Recent Activity</h1>
        <p className="text-gray-600">Latest user activities and updates in real-time</p>
      </div>

      {/* Activity Grid - Align to flex-start */}
      <div className="flex flex-col items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow w-full max-w-sm"
              style={{ height: '140px' }} // Fixed shorter height
            >
              <div className="p-4 h-full">
                <div className="flex items-start gap-3 h-full">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={activity.image} 
                      alt={activity.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                    />
                  </div>

                  {/* User Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg truncate">
                          {activity.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">{activity.userId}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm line-clamp-2 mb-2">
                      {activity.activity}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                       
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More activities label */}
        <div className="mt-6 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
            {/* Additional activity cards with same design */}
           
           
          </div>
        </div>

        {/* Stats label */}
       
      </div>
    </div>
  );
};

export default RecentActivity;