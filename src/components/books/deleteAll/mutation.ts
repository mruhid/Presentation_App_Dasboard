import { useToast } from "@/hooks/use-toast";
import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import { BooksProps } from "@/lib/type";
import { DeleteAllClients } from "./action";

export function useDeleteAllClients() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: DeleteAllClients,

    onMutate: async (action: boolean) => {
      const queryKey = ["books"];

      // Cancel ongoing queries
      await queryClient.cancelQueries(queryKey);

      // Snapshot previous data
      const previousData =
        queryClient.getQueryData<InfiniteData<BooksProps>>(queryKey);

      // Optimistically update cache
      queryClient.setQueryData<InfiniteData<BooksProps>>(
        queryKey,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              books: action
                ? page.books.filter((book) => book.check === false) // Keep unchecked if action is true
                : [], // Empty array if action is false
            })),
          };
        }
      );

      return { previousData };
    },

    onError: (error, action, context) => {
      console.error("Error during deletion:", error);

      // Rollback cache
      if (context?.previousData) {
        queryClient.setQueryData(["books"], context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to delete clients!",
      });
    },

    onSuccess: (data) => {
      toast({
        description: data.message,
      });
    },

    onSettled: () => {
      // Invalidate query to refresh data
      queryClient.invalidateQueries(["books"]);
    },
  });

  return mutation;
}
