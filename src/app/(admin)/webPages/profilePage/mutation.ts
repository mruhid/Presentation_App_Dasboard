import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfilePageProps } from "@/lib/type";
import { updateProfileDataFN } from "./action";

export function useUpdateProfileMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProfileDataFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["profilePage-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<ProfilePageProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<ProfilePageProps>>(
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
        queryClient.setQueryData("profilePage-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update profile page data!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Profile page data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["profilePage-feed"]);
    },
  });

  return mutation;
}
