import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSocialMediaLinks } from "./action";
import { SocialMediaProps } from "@/lib/type";

export function useUpdateSocialMediaMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const queryKey = ["social-medias"]; // ✅ Correctly defining queryKey

  const mutation = useMutation({
    mutationFn: (updates: SocialMediaProps[]) =>
      updateSocialMediaLinks(updates),

    onMutate: async (updates: SocialMediaProps[]) => {
      // Cancel ongoing queries for social media data
      await queryClient.cancelQueries(queryKey); // ✅ Fixed

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<SocialMediaProps[]>(queryKey);

      // Optimistically update the cache with the new data
      queryClient.setQueryData<SocialMediaProps[]>(
        queryKey,
        (oldData) =>
          oldData
            ? oldData.map((item) => {
                const update = updates.find((update) => update.id === item.id);
                return update ? { ...item, link: update.link } : item;
              })
            : updates // If no old data, just use the new updates
      );

      // Return the rollback context
      return { previousData };
    },

    onError: (error, _, context) => {
      console.error("Error updating social media links:", error);

      // Rollback cache to previous data if an error occurs
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update social media links!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Social media links were updated successfully!",
      });
    },

    onSettled: () => {
      // Invalidate the query to refetch data from the server
      queryClient.invalidateQueries(queryKey); // ✅ Fixed
    },
  });

  return mutation;
}
