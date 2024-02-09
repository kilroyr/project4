import React from 'react';

function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My PC Build</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">CPU</h2>
          {/* CPU details or form inputs go here */}
        </div>
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Motherboard</h2>
          {/* Motherboard details or form inputs go here */}
        </div>
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">RAM</h2>
          {/* RAM details or form inputs go here */}
        </div>
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Storage</h2>
          {/* Storage details or form inputs go here */}
        </div>
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">GPU</h2>
          {/* GPU details or form inputs go here */}
        </div>
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">PSU</h2>
          {/* PSU details or form inputs go here */}
        </div>
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Case</h2>
          {/* Case details or form inputs go here */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;