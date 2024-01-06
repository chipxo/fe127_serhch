import SectionsTitle from "../common/SectionsTitle";
import ProjectsCard from "../containers/ProjectCard";
import cards from "../data/projectsData.json";

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative my-24 scroll-mt-24 overflow-clip pt-4"
    >
      <div className="container grid gap-y-10 md:gap-y-12 lg:gap-y-24">
        <SectionsTitle text={"What we do"} isBgDark={false} isTitle={true} />
        <div className="grid gap-y-20 lg:gap-y-[140px]">
          {cards.map(
            ({ id, subTitle, title, description, location, image, href }) => (
              <ProjectsCard
                key={id}
                subTitle={subTitle}
                title={title}
                description={description}
                location={location}
                image={image}
                href={href}
                isNumber={id % 2 === 0 ? true : false}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
