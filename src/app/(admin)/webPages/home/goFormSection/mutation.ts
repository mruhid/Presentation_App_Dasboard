import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoFormSectionProps } from "@/lib/type";
import { updateGoFormSection } from "./action";

export function useUpdateGoFormMutate() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateGoFormSection,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["go-form-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<GoFormSectionProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<GoFormSectionProps>>(
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
        queryClient.setQueryData("go-form-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update go form section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Go form section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["go-form-feed"]);
    },
  });

  return mutation;
}
