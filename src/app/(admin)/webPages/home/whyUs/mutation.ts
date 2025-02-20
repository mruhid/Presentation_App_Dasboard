import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WhyUsFeaturesProps, WhyUsProps } from "@/lib/type";
import { updateWhyUsFeature, updateWhyUsTitle } from "./action";

export function useUpdateWhyUsTitle() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateWhyUsTitle,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["WhyUsSection"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData = queryClient.getQueryData<WhyUsProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<WhyUsSection>>(
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
        queryClient.setQueryData("WhyUsSection", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update whyus section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Whyus section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["WhyUsSection"]);
    },
  });

  return mutation;
}

export function useUpdateWhyUsFeature() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateWhyUsFeature,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["whyUsFeatures"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<WhyUsFeaturesProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<WhyUsFeaturesProps>>(
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
        queryClient.setQueryData("whyUsFeatures", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update whyUs section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "WhyUS section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["whyUsFeatures"]);
    },
  });

  return mutation;
}
