import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StepperCheckout from '@/components/StepperCheckout';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, AlertTriangle } from 'lucide-react';

// Form Schemas
const shippingSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid ZIP code." }),
  shippingMethod: z.enum(['standard', 'express'], { required_error: "You need to select a shipping method." }),
});

const paymentSchema = z.object({
  cardholderName: z.string().min(2, { message: "Cardholder name is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Invalid card number. Must be 16 digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid expiry date (MM/YY)." }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "Invalid CVC." }),
});

// Placeholder Data
const cartItems = [
    { id: 'prod-001', name: 'Atorvastatin 20mg', quantity: 1, price: 25.50 },
    { id: 'prod-002', name: 'OTC Vitamin D3', quantity: 2, price: 12.00 },
];
const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const shippingCost = 5.00;
const total = subtotal + shippingCost;


const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const steps = ['Shipping', 'Prescription', 'Payment', 'Review'];

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to the backend
    console.log("Order placed!");
    setCurrentStep((prev) => prev + 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ShippingStep onNext={handleNext} />;
      case 2:
        return <PrescriptionStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PaymentStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <ReviewStep onPlaceOrder={handlePlaceOrder} onBack={handleBack} />;
      case 5:
        return <ConfirmationStep onNavigate={() => navigate('/user-dashboard')} />;
      default:
        return <ShippingStep onNext={handleNext} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {currentStep <= 4 && (
            <>
              <h1 className="text-3xl font-bold text-center mb-4">Checkout</h1>
              <p className="text-muted-foreground text-center mb-8">
                Follow the steps below to complete your order.
              </p>
              <StepperCheckout currentStep={currentStep} steps={steps} />
            </>
          )}
          <div className="mt-8">{renderStepContent()}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Step Components
const ShippingStep = ({ onNext }: { onNext: () => void }) => {
  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { fullName: '', address: '', city: '', zipCode: '', shippingMethod: 'standard' },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>Enter the address where you want to receive your order.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)}>
          <CardContent className="space-y-6">
            <FormField name="fullName" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="address" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="city" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Anytown" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="zipCode" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField name="shippingMethod" control={form.control} render={({ field }) => (
              <FormItem className="space-y-3"><FormLabel>Shipping Method</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="standard" /></FormControl>
                      <FormLabel className="font-normal">Standard Shipping (5-7 days) - $5.00</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="express" /></FormControl>
                      <FormLabel className="font-normal">Express Shipping (1-2 days) - $15.00</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl><FormMessage />
              </FormItem>
            )} />
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Continue to Prescription</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

const PrescriptionStep = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <Card>
    <CardHeader>
      <CardTitle>Prescription Status</CardTitle>
      <CardDescription>Review the status of your required prescriptions.</CardDescription>
    </CardHeader>
    <CardContent>
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Pending Verification</AlertTitle>
        <AlertDescription>
          Your prescription for <strong>Atorvastatin 20mg</strong> has been received and is pending verification by our licensed pharmacists. This is a required step for safety. You may proceed with your order.
        </AlertDescription>
      </Alert>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={onBack}>Back to Shipping</Button>
      <Button onClick={onNext}>Continue to Payment</Button>
    </CardFooter>
  </Card>
);

const PaymentStep = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cardholderName: '', cardNumber: '', expiryDate: '', cvc: '' },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your payment information below.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)}>
          <CardContent className="space-y-6">
            <FormField name="cardholderName" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Cardholder Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="cardNumber" control={form.control} render={({ field }) => (
              <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="expiryDate" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="cvc" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onBack}>Back to Prescription</Button>
            <Button type="submit">Continue to Review</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

const ReviewStep = ({ onPlaceOrder, onBack }: { onPlaceOrder: () => void, onBack: () => void }) => (
  <Card>
    <CardHeader>
      <CardTitle>Review Your Order</CardTitle>
      <CardDescription>Please confirm all details are correct before placing your order.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Items in Cart</h3>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <p>{item.name} (x{item.quantity})</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <Separator />
      <div className="space-y-2">
        <div className="flex justify-between text-sm"><p>Subtotal</p><p>${subtotal.toFixed(2)}</p></div>
        <div className="flex justify-between text-sm"><p>Shipping</p><p>${shippingCost.toFixed(2)}</p></div>
        <Separator />
        <div className="flex justify-between font-bold text-lg"><p>Total</p><p>${total.toFixed(2)}</p></div>
      </div>
       <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Final Check</AlertTitle>
        <AlertDescription>
          By placing this order, you confirm that your prescription information is accurate and that this medication is for your personal use.
        </AlertDescription>
      </Alert>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" onClick={onBack}>Back to Payment</Button>
      <Button onClick={onPlaceOrder}>Place Order</Button>
    </CardFooter>
  </Card>
);

const ConfirmationStep = ({ onNavigate }: { onNavigate: () => void }) => (
  <Card className="text-center">
    <CardHeader>
      <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <CardTitle className="mt-4 text-2xl">Order Placed Successfully!</CardTitle>
      <CardDescription>Thank you for your purchase. A confirmation email has been sent.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">You can track the status of your order, including prescription verification, on your user dashboard.</p>
    </CardContent>
    <CardFooter className="justify-center">
      <Button onClick={onNavigate}>Go to My Dashboard</Button>
    </CardFooter>
  </Card>
);

export default CheckoutPage;