interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
}

export function MenuCard({ name, description, price, image, badge }: MenuCardProps) {
  return (
    <div className="card-menu group">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {badge && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-serif font-semibold text-lg text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="price-tag">₹{price}</span>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
