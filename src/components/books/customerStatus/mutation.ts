import { useToast } from "@/hooks/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { BooksProps } from "@/lib/type";
import { ChangeStatus } from "./action";

export function useChangeStatusMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ChangeStatus, // Function to update the column status
    onMutate: async ({ id, check }) => {
      const queryFilter: QueryFilters = { queryKey: ["books"] };

      // Cancel ongoing queries
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<InfiniteData<BooksProps>>(queryFilter);

      // Optimistically update the cache
      queryClient.setQueriesData<InfiniteData<BooksProps>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              books: page.books.map((book) =>
                book.id === id ? { ...book, check } : book
              ),
            })),
          };
        }
      );

      // Return a rollback function
      return { previousData };
    },
    onError: (error, _, context) => {
      console.error("Error updating column status:", error);

      // Rollback the cache
      if (context?.previousData) {
        queryClient.setQueriesData("books", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update column status!",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["books"]);
    },
    onSuccess: () => {
      toast({
        description: "Column status was updated!",
      });
    },
  });

  return mutation;
}
