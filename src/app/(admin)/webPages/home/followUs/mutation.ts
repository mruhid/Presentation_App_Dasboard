import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FollowUsMediaProps, FollowUsProps } from "@/lib/type";
import { updateFollowUsMedia, updateFollowUsTitle } from "./action";

export function useUpdateFollowUsTitle() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateFollowUsTitle,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["social_section"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData = queryClient.getQueryData<FollowUsProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<FollowUsProps>>(
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
        queryClient.setQueryData("social_section", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update followUs section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "FollowUs section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["social_section"]);
    },
  });

  return mutation;
}

export function useUpdateFollowUsMedia() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateFollowUsMedia,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["social_section_media"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<FollowUsMediaProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<FollowUsMediaProps>>(
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
        queryClient.setQueryData("social_section_media", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update follow-US section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "FollowUS section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["social_section_media"]);
    },
  });

  return mutation;
}
