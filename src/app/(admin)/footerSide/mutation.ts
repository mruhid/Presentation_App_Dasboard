import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FooterSocialMediaProps, FooterTextProps } from "@/lib/type";
import { updateFooterSidePlatformsFN, updateFooterTextFN } from "./action";

export function useUpdateFooterTextMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateFooterTextFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["footer-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<FooterTextProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<FooterTextProps>>(
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
        queryClient.setQueryData("footer-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update footer text!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Footer texts was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["footer-feed"]);
    },
  });

  return mutation;
}

export function useUpdateFooterPlatformMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateFooterSidePlatformsFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["footer_social_media-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<FooterSocialMediaProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<FooterSocialMediaProps>>(
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
        queryClient.setQueryData(
          "footer_social_media-feed",
          context.previousData
        );
      }

      toast({
        variant: "destructive",
        description: "Failed to update footer side platforms!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Footer side platforms was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["footer_social_media-feed"]);
    },
  });

  return mutation;
}
