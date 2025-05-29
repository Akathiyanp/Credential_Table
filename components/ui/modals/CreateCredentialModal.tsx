


// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { useModalStore } from "@/hooks/useModalStore";
// import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   type: z.string().min(1, "Type is required"),
//   appId: z.string().min(1, "App ID is required"),
//   clientId: z.string().min(1, "Client ID is required"),
//   secret: z.string().min(1, "Secret is required"),
// });

// export default function CreateCredentialModal() {
//   const router = useRouter();
//   const { onClose, isOpen, type } = useModalStore();
//   const isOpen = isOpen && type === ""


//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       type: "",
//       appId: "",
//       clientId: "",
//       secret: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const response = await fetch("/api/credentials", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });
      
//       if (response.ok) {
//         onClose();
//         form.reset();
//         router.refresh();
//       } else {
//         console.error("Failed to create credential");
//       }
//     } catch (error) {
//       console.error("Error creating credential:", error);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="type"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Type</FormLabel>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose type" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Type</SelectLabel>
//                     <SelectItem value="aws">AWS</SelectItem>
//                     <SelectItem value="azure">Azure</SelectItem>
//                     <SelectItem value="google">Google</SelectItem>
//                     <SelectItem value="s3">S3</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="appId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>App ID</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="clientId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Client ID</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="secret"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Secret</FormLabel>
//               <FormControl>
//                 <Input type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="flex justify-end gap-2">
//           <Button variant="outline" type="button" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button type="submit">Save</Button>
//         </div>
//       </form>
//     </Form>
//   );
// }