"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { Loader2 } from "lucide-react";
import PaginationContainer from "@/components/PaginationContainer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataDialog from "@/components/DataDialog";
import TableLoadingSkeleton from "@/components/TableLoadingSkeleton";
import DeleteCulomnButton from "@/components/books/deleteOne/DeleteCulomnButton";
import { BooksProps } from "@/lib/type";
import StatusButton from "@/components/books/customerStatus/StatusButton";
import { formatRelativeDate } from "@/lib/utils";
import { formatDate } from "date-fns";
import DeleteAllDialog from "@/components/books/deleteAll/DeleteAllDialog";



type CustomersPage = {
  customers: BooksProps;
  nextPaginationCursor: string | null;
  totalPrice: number | null;
};

export default function CustomersFeed() {
  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["customers-feed"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/users/books",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<CustomersPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextPaginationCursor,
  });

  const customers = data?.pages.flatMap((page) => page.customers) || [];

  // Calculate the total price from all pages



  if (status == "pending") {
    return <TableLoadingSkeleton />;
  }

  if (status === "error") {
    return <p className="text-center text-destructive">Failed to load customers</p>;
  }

  if (status === "success" && !customers.length && !hasNextPage) {
    return <p className="text-center text-muted-foreground">No customers found!</p>;
  }
  const totalPrice = data?.pages
    .flatMap((page) => (page.totalPrice !== null ? parseFloat(page.totalPrice.toString()) : 0))
    .reduce((acc, price) => acc + price, 0);
  return (
    <PaginationContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      className="space-y-5"
    >
      <h1 className="font-semibold text-2xl p-4 text-center text-muted-foreground">Customers details</h1>

      <div className="text-secondary-foreground rounded flex items-center justify-between py-4 px-3 bg-secondary ">
        <h1 className="font-semibold ">Total</h1>
        <div className="flex px-4 py-2 justify-center gap-8 items-center">
          <div><DeleteAllDialog /></div>
          <h1 className="text-primary font-bold text-xl">${totalPrice}</h1>
        </div>

      </div>
      <Table className="capitalize">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead className="hidden sm:table-cell">Full name</TableHead>
            <TableHead className="hidden sm:table-cell">Book date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right w-[100px]">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-bold">
          {customers.map((a, index) => (
            a?.id ? (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <DeleteCulomnButton index={index + 1} id={a.id} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">{a.data.fullName}</TableCell>
                <TableCell title={formatDate(a.bookDate, "MMM d,yyyy")} className="hidden sm:table-cell cursor-pointer">{formatRelativeDate(a.bookDate)}</TableCell>
                <TableCell><DataDialog data={a} /></TableCell>
                <TableCell><StatusButton id={a.id} status={a.check} /></TableCell>
                <TableCell className="text-right">${a.price}</TableCell>
              </TableRow>
            ) : null
          ))}
          {hasNextPage && (
            <TableRow>
              <TableCell>...</TableCell>
              <TableCell>...</TableCell>
              <TableCell>...</TableCell>
              <TableCell>...</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>

      {/* Mobile Total */}


      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </PaginationContainer>

  );
}
