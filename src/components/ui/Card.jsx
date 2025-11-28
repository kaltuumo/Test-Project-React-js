import React from "react";

const Card = ({ icon: Icon, title, value, iconColor, children }) => {
  return (
    <div className="bg-white shadow-lg hover:shadow-xl rounded-xl p-5 border-l-4 border-blue-500 transition">
      <div className="flex items-center gap-4">
        {Icon && <Icon className={`${iconColor} text-4xl opacity-80`} />}

        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">{value}</p>
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
};

export default Card;
