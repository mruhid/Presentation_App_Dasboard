import { useToast } from "@/hooks/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteCulomn } from "./action";
import { BooksProps } from "@/lib/type";

export function useDeleteBookMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCulomn,
    onMutate: async (deletedColumn) => {
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
              books: page.books.filter((book) => book.id !== deletedColumn.id),
            })),
          };
        }
      );

      // Return a rollback function
      return { previousData };
    },
    onError: (error, _, context) => {
      console.error("Error deleting column:", error);

      // Rollback the cache
      if (context?.previousData) {
        queryClient.setQueriesData("books", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to delete column!",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["books"]);
    },
    onSuccess: (deletedColumn) => {
      toast({
        description: "Column was deleted!",
      });

      // Redirect if the user is on the deleted column's page
    },
  });

  return mutation;
}
