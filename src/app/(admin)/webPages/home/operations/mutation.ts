import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OperationsProps, OperationTitleProps } from "@/lib/type";
import { updateOperations, updateOperationTitle } from "./action";

export function useUpdateOperationTitle() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateOperationTitle,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["operation_section"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<OperationTitleProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<OperationTitleProps>>(
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
        queryClient.setQueryData("operation_section", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update Operation section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Operation section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["operation_section"]);
    },
  });

  return mutation;
}

export function useUpdateOperations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateOperations,

    onMutate: async ({ newData }) => {
      const queryFilter = { queryKey: ["operations"] };

      // Cancel ongoing queries for admin data
      await queryClient.cancelQueries(queryFilter);

      // Snapshot the previous data
      const previousData =
        queryClient.getQueryData<OperationsProps>(queryFilter);

      // Optimistically update the cache with the new data
      queryClient.setQueriesData<InfiniteData<OperationsProps>>(
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
        queryClient.setQueryData("operations", context.previousData);
      }

      toast({
        variant: "destructive",
        description: "Failed to update operation section!",
      });
    },

    onSuccess: () => {
      toast({
        description: "Operation section data was updated successfully!",
      });
    },

    onSettled: () => {
      // After the mutation settles, invalidate the query to refetch the data from the server
      queryClient.invalidateQueries(["operations"]);
    },
  });

  return mutation;
}
