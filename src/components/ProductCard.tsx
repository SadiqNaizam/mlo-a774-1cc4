import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  requiresPrescription?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  requiresPrescription = false,
}) => {
  const { toast } = useToast();
  console.log(`ProductCard loaded for: ${name}`);

  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent the parent Link from navigating when the button is clicked
    e.preventDefault();
    e.stopPropagation();

    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
    });
    console.log(`Product ${id} added to cart.`);
  };

  return (
    <Card className="overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      {/* The entire card is a link to the product detail page */}
      <Link to="/product-detail" className="flex flex-col h-full" aria-label={`View details for ${name}`}>
        <CardHeader className="p-0 border-b relative">
          <AspectRatio ratio={4 / 3}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x300'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
          {requiresPrescription && (
            <Badge className="absolute top-2 right-2 z-10">Prescription Required</Badge>
          )}
        </CardHeader>

        {/* Card content grows to fill available space, aligning footers */}
        <CardContent className="p-4 flex-grow space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">{name}</h3>
          <p className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</p>
        </CardContent>

        <CardFooter className="p-3 pt-0 mt-auto bg-slate-50 border-t">
          {/* Add to Cart button handles its own click event */}
          <Button
            className="w-full"
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;