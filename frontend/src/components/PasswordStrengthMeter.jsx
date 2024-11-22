import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item, index) => (
        <div key={index} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-red-500 mr-2" />
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrengh = (pass) => {
    let strengh = 0;
    if (pass.length >= 6) strengh++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strengh++;
    if (pass.match(/\d/)) strengh++;
    if (pass.match(/[^A-Za-z0-9]/)) strengh++;
    return strengh;
  };
  const strength = getStrengh(password);

  const getColor = (strengh) => {
    if (strengh === 0) return "bg-red-500";
    if (strengh === 1) return "bg-red-400";
    if (strengh === 2) return "bg-yellow-500";
    if (strengh === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrenghText = (strengh) => {
    if (strengh === 0) return "Very Weak";
    if (strengh === 1) return "Weak";
    if (strengh === 2) return "Fair";
    if (strengh === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="-mt-4 mb-16">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strengh</span>
        <span className="text-xs text-gray-400">
          {getStrenghText(strength)}
        </span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                ${index < strength ? getColor(strength) : "bg-gray-600"}
              `}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
