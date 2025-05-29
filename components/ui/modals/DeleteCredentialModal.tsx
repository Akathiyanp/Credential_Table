// import React from "react";
// import { Button } from "@/components/ui/button";
// import { useModalStore } from "@/hooks/useModalStore";
// import { useRouter } from "next/navigation";
// import { DeleteCredentialModalProps } from "@/types/Modaltype";

// export default function DeleteCredentialModal({
//   id,
//   name,
// }: DeleteCredentialModalProps) {
//   const router = useRouter();
//   const { onClose } = useModalStore();

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`/api/credentials/${id}`, {
//         method: "DELETE",
//       });
      
//       if (response.ok) {
//         onClose();
//         router.refresh();
//       } else {
//         console.error("Failed to delete credential");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-lg font-semibold">Delete Credential</h2>
//       <p>Are you sure you want to delete the credential {name}?</p>
//       <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
//       <div className="flex justify-end gap-2">
//         <Button variant="outline" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button variant="destructive" onClick={handleDelete}>
//           Delete
//         </Button>
//       </div>
//     </div>
//   );
// }


