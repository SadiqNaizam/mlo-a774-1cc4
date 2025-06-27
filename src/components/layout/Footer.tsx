import React from 'react';
import { Link } from 'react-router-dom';
import { Pill } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Pill className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">PharmaDirect</span>
            </div>
            <p className="text-sm">
              Your trusted source for safe, convenient, and reliable access to pharmaceutical care.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm hover:text-primary transition-colors">About Us</Link>
              <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
              <Link to="/careers" className="text-sm hover:text-primary transition-colors">Careers</Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/terms-of-service" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/privacy-policy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/disclaimer" className="text-sm hover:text-primary transition-colors">Disclaimer</Link>
            </nav>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4 bg-background/50 p-4 rounded-lg border">
             <h3 className="font-semibold text-foreground">Important Notice</h3>
             <p className="text-xs">
                PharmaDirect provides a platform for ordering medications and does not offer medical advice. Always consult with a qualified healthcare professional for any health concerns or before starting any new treatment.
             </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm">
            &copy; {currentYear} PharmaDirect. All rights reserved.
          </p>
          {/* Placeholder for social media or other links if needed in the future */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;