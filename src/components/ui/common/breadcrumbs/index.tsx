import { ActiveLink } from "@/components/ui";

const Breadcrumbs = (props: any) => {
  const { items } = props;

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items?.map((item: any, index: number) => (
          <li
            className={`${
              index === 0 ? "pr-4" : "px-4"
            } font-medium text-gray-500 hover:text-gray-900`}
            key={index}
          >
            <ActiveLink href={item?.href}>
              <a>{item?.value}</a>
            </ActiveLink>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
