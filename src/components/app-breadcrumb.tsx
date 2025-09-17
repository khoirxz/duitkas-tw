import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";

type AppBreadcrumbProps = {
  data: {
    name: string;
    link: string;
  }[];
};

export function AppBreadcrumb({ data }: AppBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {data.map((item, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={item.link}
                className={`${
                  index === data.length - 1 ? "text-zinc-700" : "text-blue-700"
                } font-semibold text-lg`}>
                {item.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < data.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
