import projectStyles from "../../styles/projects.module.scss";

export const projects = [
  {
    year: "2024",
    name: "fileportes",
    id: "fileportes-2024",
    title: "FILEPORTES MUDANZAS",
  },
  {
    year: "2022",
    name: "gambitBot",
    id: "gambitBot-2022",
    title: '"GAMBIT" DISCORD BOT',
  },
  {
    year: "2022",
    name: "labelTime",
    id: "labelTime-2022",
    title: '"LABEL TIME" MOBILE APP',
  },
  { year: "2024", name: "inProgress", id: "new-2024", title: "IN PROGRESS" },
];

export const projectDisplay = [
  {
    overview: (
      <p>
        <a href="https://www.Fileportes.com" target="_blank">
          FilePortes.com
        </a>
        &nbsp;is a professional moving company with a clean and user-friendly
        website, designed for quick and easy navigation. The site features
        vibrant and fresh colors, ensuring an inviting and modern look.
      </p>
    ),
    tech: (
      <>
        <li>This is a Next.js project.</li>
        <li>Built with JavaScript, Html & Sass.</li>
        <li>Hosted with AWS.</li>
      </>
    ),
    concept: (
      <p>
        The website is built to provide a seamless user experience, enabling
        quick inquiries and contact with movers. It offers comprehensive
        information about moving services and supports efficient communication
        through Amazon WorkMail.
      </p>
    ),
    development: <></>,
    developmentRight: (
      <p className={projectStyles.belowContainer_bot_right_context}>
        Hosted on AWS, the website utilizes Amazon WorkMail for communications
        and includes a WhatsApp option for instant messaging. The forms on the
        site are designed to be quick to fill out and clearly indicate the
        information needed by the company. Additionally, the concept includes
        the use of QR codes on business cards for easy access to the website,
        ensuring that users have everything they need on the initial page.
      </p>
    ),
  },
  {
    overview: (
      <p>
        This project is a Discord bot built to enhance user interaction within a
        Discord server. It provides a variety of features such as games, balance
        tracking, and more, all designed to keep users engaged. The bot is
        equipped with efficient command handling and offers a seamless
        experience for server members.
      </p>
    ),
    tech: (
      <>
        <li>This is a JavaScript project.</li>
        <li>Built with Discord.js Library.</li>
        <li>Utilized MongoDB for data storage.</li>
      </>
    ),
    concept: (
      <p>
        The Discord bot is designed to create a dynamic and interactive
        experience for users. It includes commands for playing games like
        blackjack, tracking user balances, and sending virtual currency between
        users. The bot supports slash commands for ease of use and offers
        real-time interaction through Discord's API.
      </p>
    ),
    development: (
      <div className={projectStyles.belowContainer_bot_left_wrapper}>
        <div>
          <h1>Command Handling</h1>
          <p>
            The bot organizes commands into separate modules, enabling easy
            maintenance and scalability. It utilizes Discord's slash command
            feature for better user interaction.
          </p>
        </div>
        <div>
          <h1>Database Integration</h1>
          <p>
            Uses MongoDB to store user profiles, balances, and game data. This
            ensures that user progress and data are persistent across sessions.
          </p>
        </div>
        <div>
          <h1>Additional Tools</h1>
          <p>
            Utilizes environment variables for configuration and security. The
            bot also supports dynamic content updates and efficient error
            handling.
          </p>
        </div>
      </div>
    ),
    developmentRight: (
      <div className={projectStyles.belowContainer_bot_right_wrapper}>
        <h1>Features:</h1>
        <div>
          <h1>Games</h1>
          <p>
            Includes a blackjack game with visual elements and bet tracking.
          </p>
        </div>
        <div>
          <h1>User Management</h1>
          <p>
            Users can check their balance, claim daily rewards, and view their
            ranks.
          </p>
        </div>
        <div>
          <h1>Communication</h1>
          <p>
            The bot sends interactive messages using Discord's rich embed
            features, ensuring a visually appealing presentation.
          </p>
        </div>
      </div>
    ),
  },
  {
    overview: (
      <p>
        LabelTime is a mobile application designed to assist users in managing
        item expiration dates effectively. With its sleek and interactive
        design, the app provides an engaging user experience, allowing users to
        input expiration dates and automatically calculate and display the 'use
        by' date in an intuitive manner.
      </p>
    ),
    tech: (
      <>
        <li>
          This is an Apache Cordova project with cross-platform mobile
          compatibility.
        </li>
        <li>JavaScript for dynamic interactions.</li>
        <li>HTML5/SASS for structuring and styling the content.</li>
      </>
    ),
    concept: (
      <p>
        LabelTime is developed to simplify tracking expiration dates for
        perishable items. Users can enter item names and expiration periods,
        with options to switch between days and weeks. The app calculates the
        exact 'use by' date based on the current date, making it an essential
        tool for inventory management in kitchens, offices, and homes.
      </p>
    ),
    development: (
      <div className={projectStyles.belowContainer_bot_left_wrapper}>
        <div>
          <h1>Interactive Interface</h1>
          <p>
            The app features an intuitive user interface with CSS animations
            that provide smooth transitions and visual effects, enhancing user
            engagement.
          </p>
        </div>
        <div>
          <h1>Cross-Platform Compatibility</h1>
          <p>
            Built with Cordova, LabelTime is available on both Android and iOS,
            ensuring seamless user experiences across different devices and
            platforms.
          </p>
        </div>
        <div>
          <h1>Responsive Design</h1>
          <p>
            The app ensures usability across various screen sizes, providing a
            consistent experience on different mobile devices.
          </p>
        </div>
      </div>
    ),
    developmentRight: (
      <div className={projectStyles.belowContainer_bot_right_wrapper}>
        <h1>Features:</h1>
        <div>
          <h1>Dynamic Functionality</h1>
          <p>
            Users can input the number of days or weeks for item expiration, and
            the app calculates and displays the expiration date dynamically.
          </p>
        </div>
        <div>
          <h1>Color and Theme Management</h1>
          <p>
            The app dynamically changes its theme based on the current day same
            as expiration labels, providing a fresh and engaging look daily.
          </p>
        </div>
        <div>
          <h1>Additional Features</h1>
          <p>
            Adapts its layout using responsive design principles for different
            device sizes.
          </p>
        </div>
      </div>
    ),
  },
];
