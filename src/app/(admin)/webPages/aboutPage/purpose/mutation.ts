import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PurposeSectionProps } from "@/lib/type";
import { updatePurposeFN } from "./action";

export function useUpdatePurposeMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePurposeFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["purpose-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<PurposeSectionProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<PurposeSectionProps>>(
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
        queryClient.setQueryData("purpose-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update company purpose  section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Company purpose section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["purpose-feed"]);
    },
  });

  return mutation;
}
