import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderFormsDataProps } from "@/lib/type";
import { updateOrderFormsDataFN } from "./action";

export function useUpdateOrderFormsDataMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateOrderFormsDataFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["formsData"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<OrderFormsDataProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<OrderFormsDataProps>>(
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
        queryClient.setQueryData("formsData", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update order forms data!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Order forms data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["formsData"]);
    },
  });

  return mutation;
}
