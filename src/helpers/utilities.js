import { knowledgeDocs, metadata } from "./metadata";

const weekday = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

const dark = () => {
  document.documentElement.classList.toggle(DARK);
  localStorage.theme = DARK;
  window.dispatchEvent(new Event("storage"));
};

const light = () => {
  document.documentElement.classList.toggle(DARK);
  localStorage.theme = LIGHT;
  window.dispatchEvent(new Event("storage"));
};

export const DARK = "dark";
export const LIGHT = "light";

export function showTime() {
  const time = new Date();
  return (
    weekday[time.getDay()] +
    " " +
    time.getHours() +
    ":" +
    time.getMinutes() +
    ", Bengaluru"
  );
}

export const themeSwitcher = (mode) => {
  if (!("theme" in localStorage)) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dark();
    } else {
      light();
    }
  } else {
    if (mode === DARK) {
      dark();
    } else {
      light();
    }
  }
};

export function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(array) {
  let currentIndex = array.length;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export function getMapOfTags(content) {
  const mapOfTags = {};
  for (const obj of content) {
    for (const tag of obj["tags"]) {
      if (mapOfTags[tag]) {
        mapOfTags[tag] = mapOfTags[tag] + 1;
      } else {
        mapOfTags[tag] = 1;
      }
    }
  }
  return mapOfTags;
}

export function getMapOfPosts(content) {
  const mapOfPosts = new Map();
  for (const obj of content) {
    const year = obj.date.split("-")[0];
    const num = Number(year);
    if (mapOfPosts.has(num)) {
      mapOfPosts.get(num).push(obj);
    } else {
      mapOfPosts.set(num, [obj]);
    }
  }
  return mapOfPosts;
}

export function dateToReadable(date) {
  const dateString = new Date(Date.parse(date)).toDateString();
  const firstIndex = dateString.indexOf(" ");
  const lastIndex = dateString.lastIndexOf(" ");
  return dateString.slice(firstIndex + 1, lastIndex);
}

export function isPostAvailable(sublink, post) {
  let listOfArticles = [];
  if (sublink === "knowledge") {
    listOfArticles = knowledgeDocs;
  } else if (sublink === "posts") {
    listOfArticles = metadata;
  }
  let flag = false;
  for (let i = 0; i < listOfArticles.length; i++) {
    if (listOfArticles[i].link === post) {
      flag = true;
      break;
    }
  }
  return flag;
}

export const emailSVG =
  "M15.61 12c0 1.99-1.62 3.61-3.61 3.61-1.99 0-3.61-1.62-3.61-3.61 0-1.99 1.62-3.61 3.61-3.61 1.99 0 3.61 1.62 3.61 3.61M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c2.424 0 4.761-.722 6.76-2.087l.034-.024-1.617-1.879-.027.017A9.494 9.494 0 0 1 12 21.54c-5.26 0-9.54-4.28-9.54-9.54 0-5.26 4.28-9.54 9.54-9.54 5.26 0 9.54 4.28 9.54 9.54a9.63 9.63 0 0 1-.225 2.05c-.301 1.239-1.169 1.618-1.82 1.568-.654-.053-1.42-.52-1.426-1.661V12A6.076 6.076 0 0 0 12 5.93 6.076 6.076 0 0 0 5.93 12 6.076 6.076 0 0 0 12 18.07a6.02 6.02 0 0 0 4.3-1.792 3.9 3.9 0 0 0 3.32 1.805c.874 0 1.74-.292 2.437-.821.719-.547 1.256-1.336 1.553-2.285.047-.154.135-.504.135-.507l.002-.013c.175-.76.253-1.52.253-2.457 0-6.617-5.383-12-12-12";
export const linkedInSVG =
  "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z";
export const githubSVG =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";
export const leetcodeSVG =
  "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z";
export const twitterSVG =
  "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z";
export const externalArrowSVG =
  "M21 9.00001L21 3.00001M21 3.00001H15M21 3.00001L12 12M10 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V14";
export const linkSVG =
  "M13.723 18.654l-3.61 3.609c-2.316 2.315-6.063 2.315-8.378 0-1.12-1.118-1.735-2.606-1.735-4.188 0-1.582.615-3.07 1.734-4.189l4.866-4.865c2.355-2.355 6.114-2.262 8.377 0 .453.453.81.973 1.089 1.527l-1.593 1.592c-.18-.613-.5-1.189-.964-1.652-1.448-1.448-3.93-1.51-5.439-.001l-.001.002-4.867 4.865c-1.5 1.499-1.5 3.941 0 5.44 1.517 1.517 3.958 1.488 5.442 0l2.425-2.424c.993.284 1.791.335 2.654.284zm.161-16.918l-3.574 3.576c.847-.05 1.655 0 2.653.283l2.393-2.389c1.498-1.502 3.94-1.5 5.44-.001 1.517 1.518 1.486 3.959 0 5.442l-4.831 4.831-.003.002c-1.438 1.437-3.886 1.552-5.439-.002-.473-.474-.785-1.042-.956-1.643l-.084.068-1.517 1.515c.28.556.635 1.075 1.088 1.528 2.245 2.245 6.004 2.374 8.378 0l4.832-4.831c2.314-2.316 2.316-6.062-.001-8.377-2.317-2.321-6.067-2.313-8.379-.002z";

export const paragraphs = {
  aboutme: [
    "I am a software engineer based out of Bengaluru. I am currently working at Walmart.",
    "This website is my humble abode on the internet, where I pen my musings in here about software development, specifically JavaScript, TypeScript and web technologies in general.",
    "In the world of AI I still fascinate for Frontend Ecosystem.",
  ],
};

export const textBlocks = {
  experience: [
    [
      "SDE III, SDE II (2y), Intern (6m)",
      "Walmart / Jan20...",
      "Working as Full stack developer as well as Automation Engineer, got Bravo award for exceptional contribution and multiple badges as well.",
    ],
    [
      "Associate Software Engineer",
      "Accenture / Oct15 - Oct16",
      "Worked as a Developer, this position involved Data Conversion, Report Generation and Developing Interfaces in Oracle Applications",
    ],
    [
      "Homo Sapien",
      "Earth / Jan94...",
      "Living life at fullest. Making mistakes, forming bonds, creating memories along the way.",
    ],
  ],
  corpprojects: [
    [
      "Service Principal / Nov 21...",
      "Service Principal is an identity created for use with applications, hosted services, and automated tools to access Azure resources. We provide a portal and dashboard for application team to directly access service principal without having the deep knowledge of azure portal and even DBA team's intervention which in turn helps both the team to save majority of the time",
      "Tech Stack : Spring Boot, React JS, PostgresDB, Azure Portal, Akeyless",
    ],
    [
      "Firepass / June 21...",
      "It is a privileged access management (PAM) system for normal/ emergency time-bound ad-hoc remote access to databases by operational users (privileged, application developers, non-service accounts) to perform certain tasks. It is a mechanism of Authentication and Authorization of user to the database securely and Generates and manages ephemeral database credentials based on Role-Based Ac- cess Controls (RBAC)",
      "Tech Stack : Ansible, Python, Hashicorp Vault, Javascript, Akeyless",
    ],
    [
      "Migration Automation / March 21 - Aug 21",
      "Migration Automation aka DMAAS (Database Migration As A Service) is a automation framework around Attunity tool which offers sql to sql migration and related activities to users and thus minimizing interaction between end user and migration team so that migration team can focus on prioritised complex task and this we saved 1500+ working hours",
      "Tech Stack : Ansible, Python, Attunity, HTML, Javascript",
    ],
  ],
  personalprojects: [
    [
      "Hyperledger Supply Chain (BlockChain)",
      "The project was mainly focused on preventing counterfeiting of drugs by creating fully functional supply chain by using blockchain technology with the help of hyperledger",
      "Tech Stack : Hyperledger Fabric, Node.js, GoLang",
    ],
    [
      "Online Quize using DevOps methodology",
      "This project included creation of web-app in TypeScript and NodeJS and Google Firebase to store the data. Main focus here is to apply the opensource DevOps tools",
      "Tech Stack :Typescript, FireBase, Bootstrap, Git, Jenkins, Docker, Kibana",
    ],
    [
      "SanFrancisco Crime Classification",
      "Trained the model using given dataset that includes Date, Category, DayOfWeek, Latitude, Longitude etc, then predicted the category of crime that occurred, given the time and location only",
      "Tech Stack : Python, Jupyter, Numpy, Pandas, MatPlotLib",
    ],
    [
      "Hyperledger Supply Chain (BlockChain)",
      "The project was mainly focused on preventing counterfeiting of drugs by creating fully functional supply chain by using blockchain technology with the help of hyperledger",
      "Tech Stack : Hyperledger Fabric, Node.js, GoLang",
    ],
    [
      "2048 Game",
      "Simple arrow controls to move blocks in each direction. Coloured states of same number for better visibility",
      "Tech Stack : VueJS, Vite",
      "https://2048.godhani.in",
    ],
    [
      "Memory Game",
      "Grid pattern consisting different kind of characters. Click 2 tiles with same character to make both disappear, otherwise both tile will flip again. Object of tha game is to make all disappear. Click on refresh icon above to change the characters of the grid. Sound is available.",
      "Tech Stack : React, create-react-app",
      "https://memory.godhani.in",
    ],
    [
      "Dragabble ToDo",
      "Simple todo app with priority tag. ToDo list and Done list vertically placed. Animation and drag and drop between both the status is possible.",
      "Tech Stack : Typescript, Vite, HeroUI, Tailwindcss, Motion",
      "https://todo.godhani.in",
    ],
    [
      "Game of Life",
      "John Conway's Game of Life. No intro needed. Cellular Automation based on birth, death and survival",
      "Tech Stack : VueJS, Vite, Tailwindcss",
      "https://life.godhani.in",
    ],
    [
      "Spaced Repetition App",
      "App that remind you the article, topic, or even a word in specific interval. Spaced repetition is great for memorizing something.",
      "Tech Stack : pnpm, Typescript, NodeJS, ExpressJS, Supabase",
      "https://remember.godhani.in",
    ],
    [
      "Dev Tinder",
      "App that connects developers just like tinder. Login functionality available. Once request accepted then both user can chat with each other. User can accept, reject or ignore the requests. User can update the profile with photo as well.",
      "Tech Stack : React, TailwindCSS, socket-io, DaisyUI, NodeJS",
      "https://devtinder.godhani.in",
    ],
    [
      "Infinite Pokemon",
      "Load pokemons on scroll. Infinite scroll until pokemon list is reached. Each pokemon card is clickable which display pokemon's power and stats.",
      "Tech Stack : React, Vite",
      "https://pokemon.godhani.in",
    ],
  ],
};

export const textList = {
  skills: [
    "Programming : ReactJS, NodeJS, ExpressJS, Spring Boot, Javascript, Java, PostgresDB",
    "Additional : Akeyless, Hashicorp Vault, Github, Ansible, Docker, Jenkins, Attunity, Photoshop",
  ],
  certifications: [
    "Introduction to Mathematical Thinking by Standford Online",
    "Mathematics for Machine Learning: Linear Algebra by Imperial College London",
    "Prompt Engineering for ChatGPT by Vanderbilt University",
    "Storytelling and influencing: Communicate with impact by Macquarie University",
  ],
  achievements: [
    "Received a Walmart Excellence Award, Bravo Award and Rookie of the Year Award",
    "Graphic Designer in 8BIT IIITB college magazine",
    "Organized Online Gaming event in IIITB college sportfest Spandan-2019 and volunteering in alumni event Sangam-2018",
    "Secured B Grade in Drawing competition conducted by Gujarat state examination board",
    "Core Team Member (Designing) at National Level Event of Human Powered Vehicle Challenge EGVC-2014",
    "Event Organizer in LDCE College Festival Teqnix-2013",
    "CCNA : Completed certified course in HCL Technology",
  ],
};
