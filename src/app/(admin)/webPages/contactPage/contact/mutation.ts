import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactPlatformsProps, ContactTitleProps } from "@/lib/type";
import {
  updateContactPageHeaderFN,
  updateContactPagePlatformsFN,
} from "./action";

export function useUpdateContactTitleMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateContactPageHeaderFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["contact_page-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<ContactTitleProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<ContactTitleProps>>(
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
        queryClient.setQueryData("contact_page-feed", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update contact page platforms!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Contact platforms was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["contact_page-feed"]);
    },
  });

  return mutation;
}

export function useUpdateContactPlatformMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateContactPagePlatformsFN,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["contact_page_social_media-feed"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<ContactPlatformsProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<ContactPlatformsProps>>(
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
          "contact_page_social_media-feed",
          context.previousData
        );
      }

      toast({
        variant: "destructive",
        description: "Failed to update contact page platforms!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Contact page platforms was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["contact_page_social_media-feed"]);
    },
  });

  return mutation;
}
