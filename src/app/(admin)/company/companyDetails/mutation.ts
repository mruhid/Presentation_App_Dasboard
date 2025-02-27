import { useToast } from "@/hooks/use-toast";
import {
  useMutation,
  QueryFilters,
  useQueryClient,
} from "@tanstack/react-query";
import { updateCompanyDetails } from "./action"; // Replace with your actual mutation function
import { CompanyDetailsProps } from "@/lib/type";

export function useUpdateAdminDataMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCompanyDetails, // Function to update company details

    onMutate: async ({ data }) => {
      const queryFilter: QueryFilters = { queryKey: ["admin-data-for-edit"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<CompanyDetailsProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<CompanyDetailsProps>>(
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
      console.error("Error updating company data:", error);

      // Rollback the cache to previous data if an error occurs
      if (context?.previousData) {
        queryClient.setQueryData("admin-data-for-edit", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update company data!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Company data was updated successfully!",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries(["admin-data-for-edit"]);
    },
  });

  return mutation;
}
