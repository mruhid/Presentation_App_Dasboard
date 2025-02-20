import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ToolTipProps extends React.PropsWithChildren {
    title?: string;
}

export default function ToolTipElement({ children, title }: ToolTipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>
                <span>{title}</span>
            </TooltipContent>
        </Tooltip>
    );
}
