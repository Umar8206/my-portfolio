import { openLink } from "./methods";

const outer = {
  title1: `G'day, I'm`,
  title2: "Muhammad Umar,",
  decrypTexts: [
    "A Software Engineer",
    "A Full Stack Developer",
    "I build scalable applications",
    "A Mobile Application Developer",
    "A Backend Developer",
    "A Cloud-Savvy Developer",
  ],
  desciption: `I’m a skilled mobile app developer with over 4 years of experience in the IT industry. Using React Native, I create full-stack mobile apps that cater to the needs of diverse clients. My expertise lies in developing hybrid apps for both Android and iOS platforms, ensuring that users have access to efficient and user-friendly applications. With a deep understanding of the mobile app development process, I am able to deliver high-quality results that exceed expectations. If you’re looking for a reliable mobile app developer to bring your ideas to life, I’m here to help!
`,
  button: {
    label: "Contact me!",
    onClick: () => openLink("mailto:muhammadumar879@gmail.com?subject=Hello"),
  },
};

export default outer;
