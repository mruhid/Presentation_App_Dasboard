import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Company" }
export default function Page() {
    return <main className=" w-full min-w-0 text-center   rounded   mx-auto text-muted-foreground ">
        <h1 className="block font-bold text-xl p-5 my-4 rounded bg-secondary">Company main informations</h1>
        <div className="my-5 flex flex-wrap gap-5 justify-around  items-center">
            <Link href="company/companyDetails"><Button size="lg" variant="default" className="text-xl font-bold py-10 hover:bg-card">Company details</Button> </Link>
            <Link href="company/socialMedias"><Button size="lg" variant="default" className="text-xl font-bold py-10 hover:bg-card">Social media platforms</Button> </Link>
        </div>
        <h1 className="block font-bold text-xl p-5 my-4 rounded bg-secondary">--</h1>


    </main>
}