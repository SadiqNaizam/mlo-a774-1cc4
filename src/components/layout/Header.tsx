import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Pill, Search, User, ShoppingCart, Menu } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link to="/" className="flex items-center gap-2">
              <Pill className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">PharmaDirect</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="grid gap-4 py-6">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/product-listing" className={navLinkClasses}>Products</NavLink>
          <NavLink to="/user-dashboard" className={navLinkClasses}>Dashboard</NavLink>
          <NavLink to="/checkout" className={navLinkClasses}>Cart</NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <div className="md:hidden mr-2">
            <MobileNav />
          </div>
          <Link to="/" className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-lg">PharmaDirect</span>
          </Link>
        </div>
        
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for medications..."
              className="w-full pl-9"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <NavLink to="/product-listing" className={navLinkClasses}>
            Products
          </NavLink>
          <NavLink to="/user-dashboard" className={navLinkClasses}>
            Dashboard
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 ml-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/user-dashboard">
              <User className="h-5 w-5" />
              <span className="sr-only">User Account</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;