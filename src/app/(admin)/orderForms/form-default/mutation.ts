import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderFormsDefaultProps } from "@/lib/type";
import { updateOrderFormsDefault } from "./action";

export function useUpdateFormDefault() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateOrderFormsDefault,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["form-default-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<OrderFormsDefaultProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<OrderFormsDefaultProps>>(
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
        queryClient.setQueryData("form-default-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update forms default variables!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Forms default variables was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["form-default-feed"]);
    },
  });

  return mutation;
}
