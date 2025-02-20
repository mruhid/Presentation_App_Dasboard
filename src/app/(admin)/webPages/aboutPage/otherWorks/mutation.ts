import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OtherWorksSectionProps } from "@/lib/type";
import { updateOtherWorksFN } from "./action";

export function useUpdateOtherWorksMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateOtherWorksFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["other-works-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<OtherWorksSectionProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<OtherWorksSectionProps>>(
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
        queryClient.setQueryData("other-works-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update other works  section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Other works section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["other-works-feed"]);
    },
  });

  return mutation;
}
