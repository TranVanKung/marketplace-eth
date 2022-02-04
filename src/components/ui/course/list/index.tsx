import { CourseCard } from "@/components/ui/course";

interface ListProps {
  courses: any[];
  children?: any;
}

const List = (props: ListProps) => {
  const { courses, children } = props;

  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses?.map((course) => children(course))}
    </section>
  );
};

export default List;
