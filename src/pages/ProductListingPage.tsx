import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';

// shadcn/ui Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Placeholder data for products
const products = [
  { id: 1, name: 'Ibuprofen 200mg (100 Tablets)', price: 8.99, imageUrl: 'https://placehold.co/400x300/EBF5FF/7A7A7A?text=Ibuprofen', requiresPrescription: false, brand: 'HealthPlus' },
  { id: 2, name: 'Amoxicillin 500mg Capsules', price: 15.50, imageUrl: 'https://placehold.co/400x300/D6EAF8/7A7A7A?text=Amoxicillin', requiresPrescription: true, brand: 'PharmaCo' },
  { id: 3, name: 'Vitamin C 1000mg Effervescent', price: 12.00, imageUrl: 'https://placehold.co/400x300/EBF5FF/7A7A7A?text=Vitamin+C', requiresPrescription: false, brand: 'GenericMed' },
  { id: 4, name: 'Lisinopril 10mg (30 Tablets)', price: 22.75, imageUrl: 'https://placehold.co/400x300/D6EAF8/7A7A7A?text=Lisinopril', requiresPrescription: true, brand: 'HealthPlus' },
  { id: 5, name: 'Allergy Relief Antihistamine', price: 9.25, imageUrl: 'https://placehold.co/400x300/EBF5FF/7A7A7A?text=Allergy+Relief', requiresPrescription: false, brand: 'GenericMed' },
  { id: 6, name: 'Metformin 850mg', price: 18.90, imageUrl: 'https://placehold.co/400x300/D6EAF8/7A7A7A?text=Metformin', requiresPrescription: true, brand: 'PharmaCo' },
  { id: 7, name: 'Aspirin Low Dose 81mg', price: 6.49, imageUrl: 'https://placehold.co/400x300/EBF5FF/7A7A7A?text=Aspirin', requiresPrescription: false, brand: 'HealthPlus' },
  { id: 8, name: 'Atorvastatin 20mg (Statins)', price: 35.00, imageUrl: 'https://placehold.co/400x300/D6EAF8/7A7A7A?text=Atorvastatin', requiresPrescription: true, brand: 'GenericMed' },
  { id: 9, name: 'Calcium + Vitamin D Tablets', price: 14.99, imageUrl: 'https://placehold.co/400x300/EBF5FF/7A7A7A?text=Calcium', requiresPrescription: false, brand: 'HealthPlus' },
];

const ProductListingPage = () => {
  console.log('ProductListingPage loaded');
  // In a real app, filtering and sorting state would be managed here with useState and useEffect
  // For this static example, we display all products.

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Brand</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="brand-genericmed" />
                      <Label htmlFor="brand-genericmed">GenericMed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="brand-healthplus" />
                      <Label htmlFor="brand-healthplus">HealthPlus</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="brand-pharmaco" />
                      <Label htmlFor="brand-pharmaco">PharmaCo</Label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3">Requirements</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="filter-prescription" />
                    <Label htmlFor="filter-prescription">Requires Prescription</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} products
              </p>
              <Select>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by: Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  requiresPrescription={product.requiresPrescription}
                />
              ))}
            </div>

            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductListingPage;