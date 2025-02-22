import { CompanyDetailsProps } from "@/lib/type";
import SaveDataDialog from "./SaveDataDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function DataCompunents({ data }: { data: CompanyDetailsProps }) {
    const [details, setDetails] = useState<CompanyDetailsProps>(data);
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="flex flex-col gap-4 py-4">
                {Object.entries(details).map(([key, value]) =>
                    key !== "id" && (
                        <div
                            key={key}
                            className="grid bg-secondary rounded grid-cols-4 items-center gap-4"
                        >
                            <Label
                                htmlFor={key}
                                className="text-left font-semibold capitalize p-6"
                            >
                                {key}
                            </Label>
                            <Input
                                type="text"
                                id={key}
                                name={key}
                                value={value}
                                onChange={handleInput}
                                className="col-span-3 p-6"
                                autoComplete="off"
                            />
                        </div>
                    )
                )}
            </div>
            <div className=" flex py-4 justify-end ">
                <div>
                    <SaveDataDialog data={details} cachedCompanyData={data} />
                </div>
            </div>
        </>
    );

}