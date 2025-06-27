import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PrescriptionUploadForm from '@/components/PrescriptionUploadForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HeartPulse, Pill, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductDetailPage = () => {
  console.log('ProductDetailPage loaded');
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const product = {
    id: 'prod_12345',
    name: 'Amoxicillin 500mg Capsules',
    price: 25.99,
    requiresPrescription: true,
    description: 'A broad-spectrum antibiotic used to treat a wide variety of bacterial infections. This medication is a penicillin-type antibiotic.',
    images: [
      'https://placehold.co/600x600/E2E8F0/4A5568?text=Medication+View+1',
      'https://placehold.co/600x600/E2E8F0/4A5568?text=Packaging',
      'https://placehold.co/600x600/E2E8F0/4A5568?text=Pill+Close-Up',
    ],
    details: {
      dosage: 'Take one capsule every 8 hours, or as directed by your doctor. Complete the full course of treatment even if you feel better.',
      sideEffects: 'Common side effects may include nausea, vomiting, or diarrhea. Contact your doctor if you experience severe side effects like skin rash, itching, or swelling.',
      storage: 'Store at room temperature away from moisture and heat. Keep out of reach of children and pets.',
    }
  };

  const handleUploadSuccess = (file: File, productId: string | number) => {
    console.log(`Prescription for ${productId} uploaded successfully:`, file.name);
    // Here you would typically add the item to the cart state and associate the prescription
    setIsPrescriptionModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50/50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column: Image Carousel */}
            <div className="flex items-center justify-center">
              <Carousel className="w-full max-w-md">
                <CarouselContent>
                  {product.images.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img
                          src={src}
                          alt={`${product.name} - view ${index + 1}`}
                          className="w-full h-auto aspect-square object-cover rounded-lg border"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2" />
                <CarouselNext className="absolute right-2" />
              </Carousel>
            </div>

            {/* Right Column: Product Info */}
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
              
              {product.requiresPrescription && (
                <Badge variant="destructive" className="w-fit">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Prescription Required
                </Badge>
              )}

              <p className="text-3xl font-semibold text-primary">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              
              <div className="pt-4">
                <Dialog open={isPrescriptionModalOpen} onOpenChange={setIsPrescriptionModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full md:w-auto">
                      <Pill className="mr-2 h-5 w-5" />
                      Add to Cart & Upload Prescription
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload Prescription for {product.name}</DialogTitle>
                    </DialogHeader>
                    <PrescriptionUploadForm 
                        productId={product.id}
                        onUploadSuccess={handleUploadSuccess}
                        onClose={() => setIsPrescriptionModalOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
                <p className="text-xs text-muted-foreground mt-2">
                  You'll be able to proceed to checkout after prescription upload.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full pt-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Dosage & Instructions</AccordionTrigger>
                  <AccordionContent>{product.details.dosage}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Potential Side Effects</AccordionTrigger>
                  <AccordionContent>{product.details.sideEffects}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Storage Information</AccordionTrigger>
                  <AccordionContent>{product.details.storage}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

           {/* Related Products Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <HeartPulse className="mr-2 h-6 w-6 text-primary" />
              Customers Also Viewed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Placeholder for related product cards */}
                <div className="border rounded-lg p-4 text-center">
                    <img src="https://placehold.co/200x200/E2E8F0/4A5568?text=Drug+A" alt="Related Drug A" className="mx-auto mb-2 rounded" />
                    <h3 className="font-semibold text-sm">Pain-Relief Tablets</h3>
                    <p className="text-xs text-muted-foreground">$12.50</p>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <Link to="/product-detail">View</Link>
                    </Button>
                </div>
                <div className="border rounded-lg p-4 text-center">
                    <img src="https://placehold.co/200x200/E2E8F0/4A5568?text=Drug+B" alt="Related Drug B" className="mx-auto mb-2 rounded" />
                    <h3 className="font-semibold text-sm">Allergy Syrup</h3>
                    <p className="text-xs text-muted-foreground">$8.99</p>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <Link to="/product-detail">View</Link>
                    </Button>
                </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;