import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderFormsPriceProps } from "@/lib/type";
import { updateFormsPriceFN } from "./action";

export function useUpdateFormsPriceMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateFormsPriceFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["orderPrice-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<OrderFormsPriceProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<OrderFormsPriceProps>>(
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
        queryClient.setQueryData("orderPrice-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update order forms price!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Order forms price was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["orderPrice-feed"]);
    },
  });

  return mutation;
}
