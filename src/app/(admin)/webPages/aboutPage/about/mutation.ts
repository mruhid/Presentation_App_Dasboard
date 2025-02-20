import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AboutUsSectionProps } from "@/lib/type";
import { updateAboutUsSection } from "./action";

export function useUpdateAboutUsMurarion() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAboutUsSection,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["about-us-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<AboutUsSectionProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<AboutUsSectionProps>>(
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
        queryClient.setQueryData("about-us-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update about us section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "About us section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["go-form-feed"]);
    },
  });

  return mutation;
}
