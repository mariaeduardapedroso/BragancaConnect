import { cn } from "@/lib/utils";

type PageTitleProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageTitle({ title, children, className }: PageTitleProps) {
  return (
    <div className={cn("flex items-center justify-between mb-8", className)}>
      <h1 className="text-4xl font-bold text-foreground">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
