import React, { useState } from "react";
import { Trash2, CheckCircle } from "lucide-react";

/* ---------- Reusable Modal ---------- */
const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">{title}</h3>

        {children}

        <button
          onClick={onClose}
          className="absolute text-gray-400 top-3 right-3 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const Settings = () => {
  const [twoStep, setTwoStep] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoStepModal, setShowTwoStepModal] = useState(false);

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Safari on Mac OS X",
      location: "Ninh Binh, Vietnam",
      status: "Current session",
      flag: "🇻🇳",
    },
    {
      id: 2,
      name: "Kari’s MacBook Pro",
      location: "Ninh Binh, Vietnam",
      status: "1 month ago",
      flag: "🇻🇳",
    },
    {
      id: 3,
      name: "Safari on Mac OS X",
      location: "Mexico City, Mexico",
      status: "1 month ago",
      flag: "🇲🇽",
    },
  ]);

  const removeDevice = (id) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  return (
    <>
      <div className="max-w-4xl p-4 mx-auto sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Security</h2>
          <p className="text-sm text-gray-500">
            Manage your account security and devices.
          </p>
        </div>

        {/* Password */}
        <div className="flex flex-col items-start justify-between gap-4 pb-4 border-b sm:flex-row sm:items-center">
          <div>
            <h3 className="font-medium text-gray-800">Password</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <span>••••••••••••</span>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-600">Very secure</span>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
          >
            Edit
          </button>
        </div>

        {/* Two Step Verification */}
        <div className="flex flex-col items-start justify-between gap-4 py-4 border-b sm:flex-row sm:items-center">
          <div>
            <h3 className="font-medium text-gray-800">
              Two-step verification
            </h3>
            <p className="max-w-md text-sm text-gray-500">
              Require a verification code in addition to your password.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTwoStep(!twoStep)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                twoStep ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  twoStep ? "translate-x-5" : ""
                }`}
              />
            </button>

            <button
              onClick={() => setShowTwoStepModal(true)}
              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Devices */}
        <div className="pt-6">
          <h3 className="mb-1 font-medium text-gray-800">
            Browsers and devices
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            These browsers and devices are currently signed in to your account.
          </p>

          <div className="space-y-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex flex-col items-start justify-between gap-3 p-3 border rounded-lg sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{device.name}</p>
                  <p className="text-sm text-gray-500">
                    {device.flag} {device.location}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {device.status}
                  </span>
                  <button
                    onClick={() => removeDevice(device.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {devices.length === 0 && (
              <p className="text-sm text-center text-gray-500">
                No devices connected.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <Modal
          title="Change Password"
          onClose={() => setShowPasswordModal(false)}
        >
          <input
            type="password"
            placeholder="New password"
            className="w-full px-3 py-2 mb-3 border rounded-md"
          />
          <button className="w-full py-2 text-white bg-black rounded-md">
            Save
          </button>
        </Modal>
      )}

      {/* Two-Step Modal */}
      {showTwoStepModal && (
        <Modal
          title="Two-step Verification"
          onClose={() => setShowTwoStepModal(false)}
        >
          <p className="mb-4 text-sm text-gray-600">
            Two-step verification is currently{" "}
            <strong>{twoStep ? "enabled" : "disabled"}</strong>.
          </p>
          <button
            onClick={() => {
              setTwoStep(!twoStep);
              setShowTwoStepModal(false);
            }}
            className="w-full py-2 text-white bg-black rounded-md"
          >
            {twoStep ? "Disable" : "Enable"}
          </button>
        </Modal>
      )}
    </>
  );
};

export default Settings;
