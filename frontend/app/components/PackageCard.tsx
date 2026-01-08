interface PackageCardProps {
  pkg: {
    id: string;
    name: string;
    duration: string;
    price: string;
    originalPrice: string;
    features: string[];
    badge: string;
    color: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function PackageCard({ pkg, isSelected, onSelect }: PackageCardProps) {
  return (
    <div
      className={`relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-3xl ${
        isSelected ? 'ring-4 ring-red-500' : ''
      }`}
    >
      {/* Badge */}
      {pkg.badge && (
        <div className={`absolute top-0 right-0 bg-gradient-to-r ${pkg.color} text-white px-4 py-1 rounded-bl-2xl text-sm font-semibold`}>
          {pkg.badge}
        </div>
      )}

      <div className={`p-8 bg-gradient-to-br ${pkg.color} text-white text-center`}>
        <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
        <div className="text-4xl font-bold mb-1">{pkg.price}</div>
        <div className="text-lg opacity-90 line-through">{pkg.originalPrice}</div>
        <div className="text-lg font-semibold mt-2">{pkg.duration}</div>
      </div>

      <div className="p-8">
        <ul className="space-y-4 mb-8">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white mr-3 text-sm">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onSelect(pkg.id)}
          className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
            isSelected
              ? 'bg-green-500 text-white'
              : `bg-gradient-to-r ${pkg.color} text-white hover:shadow-xl`
          }`}
        >
          {isSelected ? '✓ Selected' : 'Select Package'}
        </button>
      </div>
    </div>
  );
}