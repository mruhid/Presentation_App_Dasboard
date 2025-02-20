import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ItemProps {
    name: string;
    pathName: string;
}
interface SectionItems {
    items: ItemProps[];
    title: string,
    variant: string,
    className: string
}
export default function SectionItems({ items, title, variant, className }: SectionItems) {
    const defaultClassName = "flex flex-wrap gap-5 justify-around  items-center"
    return (
        <main className=" w-full min-w-0 text-center   rounded   mx-auto text-muted-foreground ">
            <h1 className="block font-bold text-xl p-5 my-4 rounded bg-secondary">{title}</h1>
            <div className={cn("my-5", className || defaultClassName)}>
                {items.map((a) => (
                    <Link
                        key={a.pathName}
                        href={a.pathName}
                    >
                        <Button
                            size="lg"
                            variant={variant}
                            className="text-xl font-bold py-10 hover:bg-secondary"
                        >
                            {a.name}
                        </Button>
                    </Link>
                ))}
            </div>
            <h1 className="block font-bold text-xl p-5 my-4 rounded bg-secondary">--</h1>
        </main>
    )

}