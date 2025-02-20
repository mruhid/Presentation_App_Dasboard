import { Skeleton } from "./ui/skeleton"

export default function TableLoadingSkeleton() {
    return (
        <div className="overflow-hidden mx-auto rounded-lg shadow-lg ">
            <table className="mx-auto table-auto">

                <tbody>
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                </tbody>
            </table>
        </div>
    )
}

function TableRowSkeleton() {
    return (
        <tr className="animate-pulse">
            <td className="px-1 py-1">
                <Skeleton className="h-10 w-12 rounded" />
            </td>
            <td className="px-1 py-1">
                <Skeleton className="h-10 w-32 rounded" />
            </td>
            <td className="px-1 py-1">
                <Skeleton className="h-10 w-24 rounded" />
            </td>
            <td className="px-1 py-1">
                <Skeleton className="h-10 w-24 rounded" />
            </td>
            <td className="px-1 py-1">
                <Skeleton className="h-10 w-24 rounded" />
            </td>
            <td className="px-1 py-1">
                <Skeleton className="h-10 w-32 rounded" />
            </td>

        </tr>
    )
}
