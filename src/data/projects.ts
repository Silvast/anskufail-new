export interface Project {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  link: {
    url: string;
    isExternal: boolean;
  };
  technologies: string[];
}

const projects: Project[] = [
  {
    id: "ruokalistasovellus",
    title: "Ruokalistasovellus",
    description: "Clojure-appis ruokalistojen ja ostoslistojen generoimiseen.",
    imagePath: "/images/projects/ruokalista.png",
    link: {
      url: "https://github.com/Silvast/safka-front",
      isExternal: true
    },
    technologies: ["Clojure", "ClojureScript", "Re-frame", "AWS Lambda", "AWS DynamoDB"]
  },
  {
    id: "valihuuto",
    title: "ValihuutoBot",
    description: "BlueSky-bot, joka parsii välihuudot Eduskunnan pöytäkirjoista ja lähettää ne BlueSkyhin.",
    imagePath: "/images/projects/valihuuto.png",
    link: {
      url: "https://github.com/Silvast/valihuuto-lambdas",
      isExternal: true
    },
    technologies: ["Rust", "AWS Lambda", "AWS SQS", "AWS DynamoDB"]
  },
  {
    id: "homepage",
    title: "Tämä sivusto",
    description: "Tämä kotosivu, joka hakee WordPress-apilta sisällöt ja visualisoi ne NextJS:llä.",
    imagePath: "/images/projects/homepage.png",
    link: {
      url: "https://ansku.fail",
      isExternal: true
    },
    technologies: ["NextJS", "TailwindCSS", "REST API", "WordPress"]
  }
];

export default projects; 