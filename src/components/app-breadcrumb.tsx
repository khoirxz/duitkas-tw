import { Fragment } from "react";
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
          <Fragment key={index}>
            <BreadcrumbItem>
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
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
