import React from 'react';

// Custom Layout Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import OrderStatusTracker, { OrderStatus } from '../components/OrderStatusTracker';

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Placeholder data
const mostRecentOrder = {
  id: "ORD789",
  date: "2024-10-27",
  total: "£32.50",
  status: "Pending Verification" as OrderStatus,
};

const orderHistory = [
  {
    id: "ORD456",
    date: "2024-09-15",
    total: "£75.00",
    status: "Delivered",
  },
  {
    id: "ORD123",
    date: "2024-08-20",
    total: "£112.30",
    status: "Delivered",
  },
  {
    id: "ORD007",
    date: "2024-07-01",
    total: "£25.99",
    status: "Cancelled",
  },
];

const userProfile = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  memberSince: "August 2023"
};

const UserDashboardPage = () => {
  console.log('UserDashboardPage loaded');

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Delivered":
        return "default"; // Will render with primary color (like success)
      case "Shipped":
        return "secondary";
      case "Pending Verification":
      case "Processing":
        return "secondary"; // Will render with a muted/warning-like color
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight mb-6">My Dashboard</h1>
          
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Recent Order Status</CardTitle>
                    <CardDescription>Tracking for order {mostRecentOrder.id}, placed on {mostRecentOrder.date}.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OrderStatusTracker currentStatus={mostRecentOrder.status} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>A list of all your past orders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderHistory.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <Badge variant={getBadgeVariant(order.status)}>{order.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">{order.total}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">View Details</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and account settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userProfile.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={userProfile.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" type="password" placeholder="Enter a new password (optional)" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Address Management</CardTitle>
                        <CardDescription>Update your default shipping address.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="address1">Address Line 1</Label>
                                <Input id="address1" defaultValue="123 Pharmacy Lane" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                                <Input id="address2" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" defaultValue="Healthville" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postcode">Postcode</Label>
                                <Input id="postcode" defaultValue="M3D 1C1" />
                            </div>
                        </div>
                         <Button>Update Address</Button>
                    </CardContent>
                </Card>
            </TabsContent>

          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;