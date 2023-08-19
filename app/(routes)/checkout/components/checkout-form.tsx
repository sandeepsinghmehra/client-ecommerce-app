"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { Currency } from "@/components/ui/currency";


interface ProductFormProps {
    data: any;
    initiatePayment: (data:any) => void;
    totalPrice: string;
}

const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    address: z.string().min(1),
    phone: z.string().min(10),
    city: z.string().min(1),
    state: z.string().min(1),
    pincode: z.string().min(6)
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const CheckoutForm: React.FC<ProductFormProps> = ({
    data,
    initiatePayment,
    totalPrice
}) => {
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            address: '',
            phone: '',
            city: '',
            state: '',
            pincode: '',
        }
    });

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setLoading(true);
            initiatePayment(data);
            // router.refresh();
            // router.push(`/${params.storeId}/products`)
            // toast.success(toastMessage);
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <h3 className="font-semibold text-xl">Delivery Details</h3>
                    <div className="grid grid-cols-3 gap-8">
                    
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="address"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Your address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="phone"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="8523423323" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField 
                            control={form.control}
                            name="city"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Your city" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField 
                            control={form.control}
                            name="state"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Your state" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField 
                            control={form.control}
                            name="pincode"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Pincode</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="233233" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Separator />
                    <div className="mt-6 space-y-4">
                        <h3 className="font-semibold text-xl">Review Cart Items & Pay Order</h3>
                        {data.length !== 0 && (
                            <DataTable
                                columns={columns}
                                data={data}
                                searchKey={""}
                            />
                        )}
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <div className="text-base font-medium text-gray-900">Order total</div>
                            <Currency value={totalPrice} />
                        </div>
                    </div>
                    <Separator />
                    {data.length !== 0 && (
                        <Button disabled={loading} className="ml-auto" type="submit">
                            Pay Now
                        </Button>
                    )}
                </form>
            </Form>
        </>
    )
}
export default CheckoutForm;