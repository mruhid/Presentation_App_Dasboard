import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DocumentSelectionOrdersProps,
  DocumentSelectionTitleProps,
} from "@/lib/type";
import { updateOrderPageSelectionFN, updateOrderPageTitleFN } from "./action";

export function useUpdateOrderPageTitle() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateOrderPageTitleFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["document_selection-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<DocumentSelectionTitleProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<DocumentSelectionTitleProps>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ...newData, // Merge the new data into the existing cache
          };
        }
      );

      // Return a rollback function for the previous data
      return { previousData };
    },

    onError: (error, _, context) => {
      // Rollback the cache to previous data if an error occurs
      if (context?.previousData) {
        queryClient.setQueryData(
          "document_selection-feed",
          context.previousData
        );
      }

      toast({
        variant: "destructive",
        description: "Failed to update order page title!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Order page title was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["document_selection-feed"]);
    },
  });

  return mutation;
}

export function useUpdateOrderPageForms() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateOrderPageSelectionFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["price_option-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<DocumentSelectionOrdersProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<DocumentSelectionOrdersProps>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ...newData,
          };
        }
      );

      // Return a rollback function for the previous data
      return { previousData };
    },

    onError: (error, _, context) => {
      // Rollback the cache to previous data if an error occurs
      if (context?.previousData) {
        queryClient.setQueryData("price_option-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update order page selections!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Order page selections was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["price_option-feed"]);
    },
  });

  return mutation;
}
