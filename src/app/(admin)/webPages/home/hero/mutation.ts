import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HeroSectionMediaProps, HeroSectionProps } from "@/lib/type";
import { updateHeroMedia, updateHeroSection } from "./action";

export function useUpdateHeroSocialMedia() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateHeroMedia, // Function to update company details

    onMutate: async ({ data }) => {
      const queryFilter = { queryKey: ["hero-hero_section_media"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<HeroSectionMediaProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<HeroSectionMediaProps>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ...data, // Merge the new data into the existing cache
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
          "hero-hero_section_media",
          context.previousData
        );
      }

      toast({
        variant: "destructive",
        description: "Failed to update Hero section data!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Hero section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["hero-hero_section_media"]);
    },
  });

  return mutation;
}

export function useUpdateHeroSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateHeroSection,

    onMutate: async ({ hero }) => {
      const queryFilter = { queryKey: ["hero-hero_section"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<HeroSectionProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<HeroSectionProps>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ...hero,
          };
        }
      );

      // Return a rollback function for the previous data
      return { previousData };
    },

    onError: (error, _, context) => {
      // Rollback the cache to previous data if an error occurs
      if (context?.previousData) {
        queryClient.setQueryData("hero-hero_section", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update Hero section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Hero section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["hero-hero_section"]);
    },
  });

  return mutation;
}
