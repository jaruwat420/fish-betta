interface TestimonialCardProps {
  name: string;
  comment: string;
  rating: number;
  package: string;
}

export default function TestimonialCard({ name, comment, rating, package: packageName }: TestimonialCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-red-500/20">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">⭐</span>
        ))}
      </div>
      <p className="text-lg mb-6 italic">"{comment}"</p>
      <div className="border-t border-white/20 pt-4">
        <div className="font-semibold">{name}</div>
        <div className="text-red-400 text-sm">{packageName}</div>
      </div>
    </div>
  );
}