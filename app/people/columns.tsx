/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Person } from "@/people";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { useCallback, useState } from "react";
import React from "react";
import { deleteCredential } from "@/prismadb";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "zustand";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string().min(1, {
    message: "Please select a type.",
  }),
  appId: z.string().min(1, {
    message: "App ID is required.",
  }),
  clientId: z.string().min(1, {
    message: "Client ID is required.",
  }),
  secret: z.string().min(1, {
    message: "Secret is required.",
  }),
});

// Add Zustand store: track which row is being edited or deleted
interface ActionCellState {
  openConfirm: boolean;
  openEdit: boolean;
  editingId: string | null;
  deletingId: string | null;
  setOpenConfirm: (value: boolean, id?: string) => void;
  setOpenEdit: (value: boolean, id?: string) => void;
}

export const useActionCellStore = create<ActionCellState>((set) => ({
  openConfirm: false,
  openEdit: false,
  editingId: null,
  deletingId: null,
  setOpenConfirm: (value, id) =>
    set((state) => ({
      openConfirm: value,
      deletingId: value ? id ?? state.deletingId : null,
    })),
  setOpenEdit: (value, id) =>
    set((state) => ({
      openEdit: value,
      editingId: value ? id ?? state.editingId : null,
    })),
}));

// Separate component for the action cell, Which fixes the Invalid hook call
const ActionCell = ({ person }: { person: Person }) => {
  const openConfirm = useActionCellStore((state) => state.openConfirm);
  const setOpenConfirm = useActionCellStore((state) => state.setOpenConfirm);
  const openEdit = useActionCellStore((state) => state.openEdit);
  const setOpenEdit = useActionCellStore((state) => state.setOpenEdit);
  const editingId = useActionCellStore((state) => state.editingId);
  const deletingId = useActionCellStore((state) => state.deletingId);
  const router = useRouter();
  const [currentName, setCurrentName] = useState(person.name);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: person.name || "",
      type: person.type || "",
      appId: person.appId || "",
      clientId: person.clientId || "",
      secret: person.secret || "",
    },
  });

  // Form values update when person changes ( after creating a new person )
  React.useEffect(() => {
    form.reset({
      name: person.name || "",
      type: person.type || "",
      appId: person.appId || "",
      clientId: person.clientId || "",
      secret: person.secret || "",
    });
  }, [person, form]);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        const res = await fetch(`/api/credentials/${person.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          setOpenEdit(false);
          setCurrentName(values.name); // Update the current name
          form.reset();
          router.refresh();
        } else {
          alert("Failed to update credential");
        }
      } catch (error) {
        console.error("Error updating credential:", error);
        alert("Failed to update credential");
      }
    },
    [person.id, form, router, setOpenEdit]
  );

  const handleEditDialogClose = useCallback(() => {
    setOpenEdit(false);
    form.reset({
      name: person.name || "",
      type: person.type || "",
      appId: person.appId || "",
      clientId: person.clientId || "",
      secret: person.secret || "",
    });
  }, [form, setOpenEdit, person]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteCredential(person.id);
      setOpenConfirm(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting credential:", error);
      alert("Failed to delete credential");
    }
  }, [person.id, router, setOpenConfirm]);

  return (
    <div className="flex items-center gap-2">
      {/* View Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            View
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Credential Details</DialogTitle>
            <DialogDescription>
              Details of the selected credential.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            <div className="bg-gray-50 rounded-lg shadow p-6 w-full max-w-md">
              <dl className="divide-y divide-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="font-semibold text-gray-700">Name</dt>
                  <dd className="text-gray-900">{person.name}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="font-semibold text-gray-700">Type</dt>
                  <dd className="text-gray-900">{person.type}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="font-semibold text-gray-700">App ID</dt>
                  <dd className="text-gray-900">{person.appId}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="font-semibold text-gray-700">Client ID</dt>
                  <dd className="text-gray-900">{person.clientId}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="font-semibold text-gray-700">Secret</dt>
                  <dd className="text-gray-900">
                    {"*".repeat(person.secret?.length || 0)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEdit && editingId === person.id}
        onOpenChange={(v) => setOpenEdit(v, person.id)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Credential</DialogTitle>
            <DialogDescription>
              Update the credential information below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter credential name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose credential type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type</SelectLabel>
                          <SelectItem value="aws">AWS</SelectItem>
                          <SelectItem value="azure">Azure</SelectItem>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="s3">S3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>App ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter App ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Client ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter secret"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleEditDialogClose}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openConfirm && deletingId === person.id}
        onOpenChange={(v) => setOpenConfirm(v, person.id)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{person.name}</span>? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenConfirm(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8 p-0 bg-blue-500 hover:bg-blue-700">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 rounded-xl border bg-white shadow-lg mt-2 p-0 mr-8 z-50"
          sideOffset={8}
        >
          <DropdownMenuLabel className="px-4 py-3 font-semibold border-b">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="px-4 py-2 text-base hover:bg-blue-100 focus:bg-blue-100 focus:outline-none transition-colors cursor-pointer"
            onClick={() => setOpenEdit(true, person.id)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenConfirm(true, person.id)}
            className="px-4 py-2 text-base hover:bg-red-100 focus:bg-red-100 focus:outline-none active:bg-red-100 transition-colors cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<Person>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      const person = row.original as Person;
      return <div className="p-2">{person.name}</div>;
    },
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "App ID",
    accessorKey: "appId",
  },
  {
    header: "Client ID",
    accessorKey: "clientId",
  },
  {
    header: "Secret",
    accessorKey: "secret",
    cell: ({ row }) => {
      const person = row.original as Person;
      return "*".repeat(person.secret?.length || 0); // Security Enhancement (asterisks for Secret masking)
    },
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => {
      const person = row.original as Person;
      return <ActionCell person={person} />;
    },
  },
];


// import { ColumnDef } from "@tanstack/react-table";
// import { Person } from "@/people";


// export const columns: ColumnDef<Person>[] = [
//   {
//     header: "Name",
//     accessorKey: "name",
//   },
//   {
//     header: "Type",
//     accessorKey: "type",
//   },
//   {
//     header: "App ID",
//     accessorKey: "appId",
//   },
//   {
//     header: "Client ID",
//     accessorKey: "clientId",
//   },
//   {
//     header: "Secret",
//     accessorKey: "secret",
//     cell: ({ row }) => {
//       const person = row.original as Person;
//       return "*".repeat(person.secret?.length || 0);
//     },
//   },
//   {
//     header: "Action",
//     accessorKey: "action",
   
//   },
// ];