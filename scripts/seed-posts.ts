import "dotenv/config";
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env.local") });

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { articles } from "../src/lib/db/schema";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL not set");

const neonClient = neon(databaseUrl);
const db = drizzle(neonClient);

const CATEGORIES = ["bollywood", "television", "south-cinema", "hollywood", "korean", "fashion", "lifestyle"];

const POSTS: { title: string; category: string; excerpt: string; content: string; tags: string[] }[] = [
  // === BOLLYWOOD (8 posts) ===
  {
    title: "Shah Rukh Khan's Next Film To Be Shot In Europe",
    category: "bollywood",
    excerpt: "Shah Rukh Khan is all set to begin shooting for his upcoming film in picturesque European locations.",
    content: `<p>Shah Rukh Khan is all set to begin shooting for his upcoming film in picturesque European locations. The film, reportedly a romantic thriller, will be directed by a top Bollywood filmmaker.</p><h3>A Grand European Schedule</h3><p>The production team has reportedly scouted locations in France, Italy, and Switzerland. The film is expected to be a visual spectacle with stunning backdrops.</p><h3>What Fans Can Expect</h3><p>Fans are eagerly awaiting updates on this project, which promises to bring SRK back in a romantic avatar after his recent action-packed releases. The film is slated for a 2026 release.</p>`,
    tags: ["shah-rukh-khan", "bollywood", "europe"],
  },
  {
    title: "Deepika Padukone And Ranveer Singh Welcome Baby Boy",
    category: "bollywood",
    excerpt: "The couple announced the arrival of their first child, a baby boy, earlier this week.",
    content: `<p>Deepika Padukone and Ranveer Singh have officially entered parenthood as they welcomed their baby boy this week. The couple shared the happy news on social media.</p><h3>A New Chapter</h3><p>Both Deepika and Ranveer have been receiving congratulations from across the industry. The couple has always been open about their desire to start a family.</p><h3>Celebrity Wishes Pour In</h3><p>Bollywood stars including Priyanka Chopra, Ranbir Kapoor, and Alia Bhatt sent their warm wishes to the new parents. The couple is currently resting at their Mumbai residence.</p>`,
    tags: ["deepika-padukone", "ranveer-singh", "bollywood"],
  },
  {
    title: "Alia Bhatt To Star In Sanjay Leela Bhansali's Period Drama",
    category: "bollywood",
    excerpt: "Alia Bhatt has been roped in for Sanjay Leela Bhansali's ambitious period drama set in colonial India.",
    content: `<p>Alia Bhatt is set to star in Sanjay Leela Bhansali's next magnum opus, a period drama set in colonial India. The film will be one of the most expensive Bollywood productions ever made.</p><h3>A Grand Vision</h3><p>Bhansali is known for his opulent sets and grand storytelling. This film will be no different, with a reported budget of over 300 crores.</p><h3>Alia's Commitment</h3><p>Alia has been preparing for the role for months, learning horse riding and sword fighting. The film is expected to go on floors later this year.</p>`,
    tags: ["alia-bhatt", "sanjay-leela-bhansali", "bollywood"],
  },
  {
    title: "Salman Khan's Tiger 3 Sequel Officially Announced",
    category: "bollywood",
    excerpt: "Yash Raj Films has officially announced the sequel to Tiger 3, with Salman Khan returning as the spy.",
    content: `<p>Yash Raj Films has officially announced Tiger 4, continuing the blockbuster spy franchise. Salman Khan will reprise his role as Tiger in this action-packed sequel.</p><h3>Bigger Action Sequences</h3><p>The production house promises even bigger action sequences and international locations for the sequel. The film is being planned as a multi-country action thriller.</p><h3>Cast Details</h3><p>While Katrina Kaif is expected to return, there are also rumors of new additions to the cast. The film is slated for a 2026 release.</p>`,
    tags: ["salman-khan", "tiger-3", "bollywood"],
  },
  {
    title: "Hrithik Roshan's Fighter Sequel Gets Green Signal",
    category: "bollywood",
    excerpt: "The sequel to the aerial action film Fighter has been officially given the green light by the producers.",
    content: `<p>After the massive success of Fighter, the producers have officially greenlit the sequel. Hrithik Roshan will return as the lead in this high-octane aerial action film.</p><h3>New Technologies</h3><p>The sequel will feature cutting-edge aerial cinematography and action sequences that push the boundaries of Indian cinema.</p><h3>International Collaboration</h3><p>The film will feature international stunt coordinators and aerial experts to ensure authenticity in the action sequences.</p>`,
    tags: ["hrithik-roshan", "fighter", "bollywood"],
  },
  {
    title: "Priyanka Chopra Returns To Bollywood With New Film",
    category: "bollywood",
    excerpt: "Priyanka Chopra Jonas is making her comeback to Bollywood with an exciting new project.",
    content: `<p>Priyanka Chopra Jonas is all set to make her much-awaited return to Bollywood. The actress has signed a major film that will mark her comeback to Indian cinema.</p><h3>A Fresh Story</h3><p>The film is said to be a contemporary drama that tackles important social themes. Priyanka has been very selective about her projects since moving to Hollywood.</p><h3>Production Details</h3><p>The film will be produced by a major production house and is expected to go on floors in early 2026. Details about the director and co-stars are still under wraps.</p>`,
    tags: ["priyanka-chopra", "bollywood", "comeback"],
  },
  {
    title: "Varun Dhawan And Natasha Dalal Baby Shower Pictures Go Viral",
    category: "bollywood",
    excerpt: "Pictures from Varun Dhawan and Natasha Dalal's baby shower have taken social media by storm.",
    content: `<p>Varun Dhawan and Natasha Dalal's baby shower celebration has become the talk of the town. The couple shared adorable pictures from their intimate celebration with family and close friends.</p><h3>A Beautiful Celebration</h3><p>The baby shower was attended by close family members and a few industry friends. The couple looked radiant as they celebrated this new chapter in their lives.</p><h3>Industry Reactions</h3><p>Fellow actors and friends showered the couple with love and blessings on social media. The couple has been sharing glimpses of their journey to parenthood.</p>`,
    tags: ["varun-dhawan", "natasha-dalal", "bollywood"],
  },
  {
    title: "Karan Johar Announces Multi-Starrer Film For 2026",
    category: "bollywood",
    excerpt: "Karan Johar has announced a multi-starrer film featuring some of the biggest names in Bollywood.",
    content: `<p>Karan Johar has revealed his next big project — a multi-starrer film that will bring together some of the biggest names in Bollywood. The film promises to be a grand family entertainer.</p><h3>Star-Studded Cast</h3><p>While the official cast list hasn't been revealed, reports suggest that the film will feature at least four major stars in lead roles.</p><h3>Release Plans</h3><p>The film is being planned for a holiday release in 2026, with extensive pre-production already underway.</p>`,
    tags: ["karan-johar", "bollywood", "multi-starrer"],
  },

  // === TELEVISION (7 posts) ===
  {
    title: "Anupamaa Takes A Bold New Turn In Upcoming Episodes",
    category: "television",
    excerpt: "The popular show Anupamaa is set to take a dramatic turn as the makers promise major twists ahead.",
    content: `<p>Anupamaa, one of the highest-rated Hindi television shows, is all set for a major storyline twist. The upcoming episodes will see the titular character making life-changing decisions.</p><h3>New Character Entries</h3><p>The show is also introducing new characters that will bring fresh dynamics to the story. Fans are excited to see how these changes will unfold.</p><h3>Rating Boost Expected</h3><p>The makers are confident that these changes will give a significant boost to the show's ratings, which have been facing stiff competition.</p>`,
    tags: ["anupamaa", "television", "tv-show"],
  },
  {
    title: "Bigg Boss 19 To Have A Celebrity Couples Theme",
    category: "television",
    excerpt: "Bigg Boss 19 is reportedly going to feature celebrity couples as contestants for the first time.",
    content: `<p>Bigg Boss 19 is set to break new ground with its upcoming season. The show will reportedly feature celebrity couples as contestants, adding a new dimension to the reality show.</p><h3>A Fresh Format</h3><p>The couples theme will bring new dynamics to the house, as partners will have to navigate relationships while competing against each other.</p><h3>Host Salman Khan</h3><p>Salman Khan is expected to return as host for another season, bringing his signature style to the show's weekend episodes.</p>`,
    tags: ["bigg-boss", "reality-tv", "television"],
  },
  {
    title: "Yeh Rishta Kya Kehlata Hai Completes 15 Years On Air",
    category: "television",
    excerpt: "The long-running soap opera Yeh Rishta Kya Kehlata Hai celebrates its 15th anniversary.",
    content: `<p>Yeh Rishta Kya Kehlata Hai, one of Indian television's most iconic shows, has completed 15 years on air. The show has maintained its popularity through multiple generation leaps.</p><h3>A Legacy Of Success</h3><p>From its debut in 2009, the show has consistently ranked among the top-rated shows on Indian television. It has launched the careers of several popular actors.</p><h3>Future Plans</h3><p>The production team has hinted at special episodes to celebrate this milestone, with some beloved characters expected to make guest appearances.</p>`,
    tags: ["yrkkh", "television", "anniversary"],
  },
  {
    title: "Kumkum Bhagya Actor Shabir Ahluwalia Opens Up About Fitness",
    category: "television",
    excerpt: "Shabir Ahluwalia shares his fitness routine and tips for staying in shape while managing a busy shooting schedule.",
    content: `<p>Kumkum Bhagya star Shabir Ahluwalia has always been known for his fit physique. In a recent interview, he shared his fitness journey and tips for fellow actors.</p><h3>Daily Routine</h3><p>Shabir follows a strict workout regimen that includes weight training, cardio, and yoga. He believes in maintaining a balanced approach to fitness.</p><h3>Diet Tips</h3><p>The actor also shared his diet plan, emphasizing the importance of whole foods and proper hydration for maintaining energy during long shooting hours.</p>`,
    tags: ["shabir-ahluwalia", "kumkum-bhagya", "fitness"],
  },
  {
    title: "The Kapil Sharma Show To Return With New Season",
    category: "television",
    excerpt: "Comedy king Kapil Sharma is all set to bring back his popular talk show with a brand new season.",
    content: `<p>After a brief hiatus, Kapil Sharma is returning with a new season of his popular comedy talk show. The show promises fresh segments and celebrity guests.</p><h3>New Format</h3><p>The new season will feature an updated set design and new comedy segments. Kapil has been working on new characters and material for the show.</p><h3>Celebrity Guests</h3><p>The show will feature major film promotions and celebrity interviews, with several A-list stars already confirmed for the premiere episodes.</p>`,
    tags: ["kapil-sharma", "comedy", "television"],
  },
  {
    title: "Naagin 7 Confirmed By Ekta Kapoor With New Lead",
    category: "television",
    excerpt: "Ekta Kapoor has confirmed Naagin 7 with a new lead actress taking over the supernatural franchise.",
    content: `<p>Ekta Kapoor has officially confirmed Naagin 7, the latest installment of her popular supernatural franchise. The show will feature a new lead actress in the titular role.</p><h3>Fresh Face</h3><p>The casting for the new Naagin is currently underway, with several popular actresses in consideration for the role.</p><h3>New Storyline</h3><p>The new season promises a fresh take on the Naagin mythology, with modern twists and contemporary themes woven into the supernatural narrative.</p>`,
    tags: ["naagin", "ekta-kapoor", "television"],
  },
  {
    title: "Kumkum Bhagya And Kundali Bhagya To Have Crossover Episode",
    category: "television",
    excerpt: "Fans are in for a treat as Kumkum Bhagya and Kundali Bhagya will have a special crossover episode.",
    content: `<p>In a exciting development for fans of the Bhagya universe, Kumkum Bhagya and Kundali Bhagya are set for a special crossover episode that will bring characters from both shows together.</p><h3>A Fan Favorite Move</h3><p>Crossover episodes have always been popular with audiences, and this one promises to be no different. The episodes will feature dramatic storylines that connect both shows.</p><h3>Production Scale</h3><p>The crossover episodes will be shot on a larger scale with bigger sets and more elaborate production values than regular episodes.</p>`,
    tags: ["kumkum-bhagya", "kundali-bhagya", "crossover"],
  },

  // === SOUTH CINEMA (7 posts) ===
  {
    title: "Allu Arjun's Pushpa 3 Officially Announced",
    category: "south-cinema",
    excerpt: "Allu Arjun and Sukumar have officially announced Pushpa 3 after the massive success of Pushpa 2.",
    content: `<p>After the blockbuster success of Pushpa 2: The Rule, director Sukumar and Allu Arjun have officially announced Pushpa 3. The announcement has set social media ablaze.</p><h3>The Story Continues</h3><p>The third installment will continue the saga of Pushpa Raj, with the story expected to go into even more dramatic territory. The script has been in development for months.</p><h3>Production Timeline</h3><p>The film is expected to go on floors in late 2025, with a targeted release in 2027. The production scale is expected to be even bigger than its predecessors.</p>`,
    tags: ["allu-arjun", "pushpa-3", "south-cinema"],
  },
  {
    title: "Prabhas And Nag Ashwin's Kalki Sequel Begins Pre-Production",
    category: "south-cinema",
    excerpt: "The sequel to Kalki 2898 AD has officially entered pre-production with Prabhas returning as the lead.",
    content: `<p>Following the worldwide success of Kalki 2898 AD, director Nag Ashwin has officially started pre-production on the sequel. Prabhas will return in his iconic role.</p><h3>Bigger Universe</h3><p>The sequel will expand the Kalki universe, introducing new characters and exploring deeper mythological connections. The production design team is working on groundbreaking visual concepts.</p><h3>Star Cast</h3><p>Alongside Prabhas, the sequel is expected to feature an even more impressive ensemble cast, with reports of several international stars being approached.</p>`,
    tags: ["prabhas", "kalki-2898-ad", "south-cinema"],
  },
  {
    title: "Jr NTR And Prashanth Neel's New Film Goes On Floors",
    category: "south-cinema",
    excerpt: "Jr NTR's upcoming film with KGF director Prashanth Neel has officially gone on floors in Hyderabad.",
    content: `<p>Jr NTR's highly anticipated collaboration with KGF director Prashanth Neel has officially gone on floors. The film, tentatively titled NTR32, is being shot in and around Hyderabad.</p><h3>Action-Packed Thriller</h3><p>The film is said to be a high-octane action thriller with international appeal. Prashanth Neel's signature style of filmmaking is expected to elevate the action sequences.</p><h3>Technical Team</h3><p>The film boasts an impressive technical team, including top technicians from the South Indian film industry. The music is being composed by Ravi Basrur.</p>`,
    tags: ["jr-ntr", "prashanth-neel", "south-cinema"],
  },
  {
    title: "Mahesh Babu's Hollywood Debut With Russo Brothers",
    category: "south-cinema",
    excerpt: "Mahesh Babu is all set to make his Hollywood debut in a film directed by the Russo Brothers.",
    content: `<p>Mahesh Babu is set to make history as he prepares for his Hollywood debut in a film helmed by the Russo Brothers, known for their work on the Marvel Cinematic Universe.</p><h3>A Global Platform</h3><p>This marks a significant milestone for South Indian cinema, as Mahesh Babu becomes one of the first Telugu actors to headline a Hollywood production.</p><h3>Preparation Mode</h3><p>The actor has been undergoing intense training and preparation for his role, which is said to be an action-packed character requiring physical agility.</p>`,
    tags: ["mahesh-babu", "hollywood", "south-cinema"],
  },
  {
    title: "Vijay's Final Film Thalapathy69 Gets Massive Opening",
    category: "south-cinema",
    excerpt: "Vijay's farewell film has shattered box office records with its massive opening day collection.",
    content: `<p>Vijay's final film, Thalapathy69, has taken the box office by storm with a record-breaking opening day. The film has crossed the Rs 100 crore mark on its first day alone.</p><h3>Record Collections</h3><p>The film has shattered multiple records, including the highest opening day collection for a Tamil film. The numbers are expected to grow over the weekend.</p><h3>Fan Celebrations</h3><p>Fans across the world have been celebrating the release with fan clubs organizing special events and screenings. The emotional farewell aspect has added to the film's appeal.</p>`,
    tags: ["thalapathy-vijay", "thalapathy69", "south-cinema"],
  },
  {
    title: "Suriya And KV Anand's Action Thriller Gets Release Date",
    category: "south-cinema",
    excerpt: "Suriya's upcoming action thriller with director KV Anand has officially been given a release date.",
    content: `<p>Suriya's much-anticipated action thriller with director KV Anand has been given an official release date. The film is set to release during the Diwali season this year.</p><h3>Action Packed</h3><p>The film promises to be a high-octane action thriller with Suriya in a never-before-seen avatar. The director is known for his technically brilliant films.</p><h3>Marketing Push</h3><p>The makers have planned an extensive marketing campaign leading up to the release, with multiple teasers and behind-the-scenes content planned.</p>`,
    tags: ["suriya", "south-cinema", "action"],
  },
  {
    title: "Yash's Toxic Gets Grand Trailer Launch Event",
    category: "south-cinema",
    excerpt: "KGF star Yash's upcoming film Toxic had a grand trailer launch event in Bangalore.",
    content: `<p>Yash's highly anticipated film Toxic had a spectacular trailer launch event in Bangalore, drawing thousands of fans. The trailer revealed a dark and intense storyline.</p><h3>A Dark World</h3><p>The trailer showcases Yash in a completely different avatar, playing a character that appears to be involved in the underworld. The film has a gritty, realistic tone.</p><h3>Production Values</h3><p>The production values evident in the trailer are top-notch, with stunning cinematography and production design. The film is clearly a big-budget production.</p>`,
    tags: ["yash", "toxic", "south-cinema"],
  },

  // === HOLLYWOOD (7 posts) ===
  {
    title: "Avengers: Secret Wars Trailer Breaks Internet Records",
    category: "hollywood",
    excerpt: "The trailer for Avengers: Secret Wars has broken all previous viewing records within hours of its release.",
    content: `<p>The Marvel Cinematic Universe has done it again. The trailer for Avengers: Secret Wars has broken all previous viewing records, amassing over 200 million views within the first 24 hours.</p><h3>A Monumental Event</h3><p>The trailer reveals an epic multiverse storyline that brings together characters from across all Marvel films. Fans are calling it the most ambitious superhero film ever made.</p><h3>Cast Reunion</h3><p>The trailer confirms the return of several beloved characters, making this a true celebration of the Marvel Cinematic Universe.</p>`,
    tags: ["avengers", "marvel", "hollywood"],
  },
  {
    title: "Christopher Nolan's Next Film Announced With Universal",
    category: "hollywood",
    excerpt: "Christopher Nolan has signed a deal with Universal Pictures for his next original film.",
    content: `<p>After the massive success of Oppenheimer, Christopher Nolan has signed a new deal with Universal Pictures for his next original film. Details about the project are being kept under wraps.</p><h3>Original Story</h3><p>True to his form, Nolan's next project is said to be an original story, continuing his tradition of innovative and thought-provoking cinema.</p><h3>Production Scale</h3><p>The film is expected to be another large-scale production, with Universal reportedly giving Nolan complete creative freedom and a substantial budget.</p>`,
    tags: ["christopher-nolan", "universal", "hollywood"],
  },
  {
    title: "Dune: Part Three Gets Official Green Light",
    category: "hollywood",
    excerpt: "Denis Villeneuve's Dune saga will continue with a third installment officially confirmed by Warner Bros.",
    content: `<p>Warner Bros. has officially confirmed Dune: Part Three, continuing Denis Villeneuve's acclaimed adaptation of Frank Herbert's science fiction epic. The third film will adapt Dune Messiah.</p><h3>Completing The Trilogy</h3><p>Villeneuve has expressed his desire to complete the story with a trilogy. The third film will bring Paul Atreides' journey to its dramatic conclusion.</p><h3>Production Timeline</h3><p>The film is expected to go into production in 2025, with a targeted release in 2027. The creative team from the previous films is expected to return.</p>`,
    tags: ["dune", "denis-villeneuve", "hollywood"],
  },
  {
    title: "Tom Cruise Confirms Mission: Impossible 8 Final Stunt",
    category: "hollywood",
    excerpt: "Tom Cruise has revealed details about the final stunt in Mission: Impossible 8, promising it will be his most ambitious yet.",
    content: `<p>Tom Cruise has promised that the final stunt in Mission: Impossible 8 will be his most ambitious and dangerous stunt to date. The stunt reportedly involves a real helicopter sequence.</p><h3>Pushing Boundaries</h3><p>Cruise continues to push the boundaries of action cinema, performing his own stunts at the age of 62. The sequence has been in planning for over a year.</p><h3>Safety Measures</h3><p>Despite the dangerous nature of the stunt, extensive safety measures have been put in place. The production team has worked with top safety experts to ensure everyone's wellbeing.</p>`,
    tags: ["tom-cruise", "mission-impossible", "hollywood"],
  },
  {
    title: "Zendaya And Tom Holland Film Joint Production Deal",
    category: "hollywood",
    excerpt: "Power couple Zendaya and Tom Holland have signed a joint production deal with A24.",
    content: `<p>Hollywood power couple Zendaya and Tom Holland have signed a joint production deal with indie studio A24. The couple will produce and potentially star in several projects together.</p><h3>Creative Partnership</h3><p>The deal marks a new chapter for both actors as they expand into producing. The couple has been developing several projects together over the past year.</p><h3>A24 Collaboration</h3><p>A24, known for its critically acclaimed films, seems like a perfect fit for the couple's creative ambitions. They're reportedly already developing their first project.</p>`,
    tags: ["zendaya", "tom-holland", "a24"],
  },
  {
    title: "Barbie Sequel Officially Announced By Margot Robbie",
    category: "hollywood",
    excerpt: "Margot Robbie has confirmed that a sequel to the blockbuster Barbie film is officially in development.",
    content: `<p>The pink phenomenon continues as Margot Robbie has officially confirmed that a sequel to Barbie is in development. The original film was one of the highest-grossing films of all time.</p><h3>Building On Success</h3><p>After grossing over $1.4 billion worldwide, the Barbie sequel is one of the most anticipated projects in Hollywood. The creative team is reportedly returning for the sequel.</p><h3>Story Direction</h3><p>Details about the story are being kept under wraps, but Robbie has hinted that the sequel will explore new themes while maintaining the spirit of the original.</p>`,
    tags: ["barbie", "margot-robbie", "sequel"],
  },
  {
    title: "James Cameron Reveals Avatar 4 Filming Progress",
    category: "hollywood",
    excerpt: "James Cameron has shared updates on the filming progress of Avatar 4, revealing that production is well underway.",
    content: `<p>James Cameron has provided exciting updates on Avatar 4, revealing that filming is progressing well. The director shared behind-the-scenes footage from the New Zealand sets.</p><h3>Technological Advances</h3><p>The fourth Avatar film will feature new underwater filming technology that Cameron has developed specifically for this project. The visual effects are expected to be groundbreaking.</p><h3>Story Evolution</h3><p>Cameron has revealed that Avatar 4 will take the story in unexpected directions, exploring new aspects of Pandora and its inhabitants.</p>`,
    tags: ["james-cameron", "avatar-4", "hollywood"],
  },

  // === KOREAN (7 posts) ===
  {
    title: "Squid Game Season 3 Production Begins In Seoul",
    category: "korean",
    excerpt: "Netflix has confirmed that Squid Game Season 3 has begun production in Seoul, South Korea.",
    content: `<p>Netflix has announced that production for Squid Game Season 3 has officially begun in Seoul. Director Hwang Dong-hyuk returns to helm the final season of the global phenomenon.</p><h3>Final Season</h3><p>This will be the final installment of the Squid Game saga. Director Hwang has promised a satisfying conclusion to the story of Seong Gi-hun's rebellion against the games.</p><h3>New Cast Members</h3><p>Several new cast members have been announced, including some major Hollywood stars joining the Korean ensemble. The global appeal of the show continues to attract top talent.</p>`,
    tags: ["squid-game", "netflix", "korean"],
  },
  {
    title: "BTS Members Begin Military Discharge Process",
    category: "korean",
    excerpt: "The first members of BTS are set to complete their military service and be discharged from the Korean army.",
    content: `<p>The wait is almost over for BTS fans as the first members of the group are set to complete their mandatory military service. The members will begin their discharge process this month.</p><h3>A Reunion To Remember</h3><p>All seven members are expected to complete their service by mid-2025, with plans for a full group comeback already in the works. HYBE has confirmed that preparations are underway.</p><h3>Fan Celebrations</h3><p>ARMY around the world are planning celebrations for the discharge dates. Fan events and projects have been organized in multiple countries.</p>`,
    tags: ["bts", "military-service", "k-pop"],
  },
  {
    title: "New K-Drama 'Queen of Tears' Breaks Streaming Records",
    category: "korean",
    excerpt: "The K-drama 'Queen of Tears' has broken multiple streaming records on Netflix and local platforms.",
    content: `<p>Queen of Tears, starring Kim Soo-hyun and Kim Ji-won, has become a global sensation, breaking streaming records on Netflix and South Korean platforms. The drama has captured hearts worldwide.</p><h3>Global Popularity</h3><p>The drama's emotional storyline and stellar performances have resonated with audiences across different cultures. It has topped Netflix's global charts for multiple weeks.</p><h3>Impact On Tourism</h3><p>The drama has also boosted tourism to filming locations in South Korea, with fans visiting spots featured in the show.</p>`,
    tags: ["queen-of-tears", "k-drama", "netflix"],
  },
  {
    title: "BLACKPINK's Jennie Launches New Fashion Label",
    category: "korean",
    excerpt: "BLACKPINK member Jennie has officially launched her own fashion label, expanding her influence beyond music.",
    content: `<p>BLACKPINK's Jennie has officially launched her own fashion label, marking her expansion from K-pop idol to fashion entrepreneur. The label has already received attention from fashion critics.</p><h3>A Fashion Vision</h3><p>Jennie's label reflects her personal style, combining Korean fashion aesthetics with global trends. The debut collection has been praised for its unique design philosophy.</p><h3>Industry Impact</h3><p>This move follows a growing trend of K-pop stars launching their own fashion ventures, building on their global influence and personal brand.</p>`,
    tags: ["jennie", "blackpink", "fashion"],
  },
  {
    title: "K-Drama 'Squid Game' Wins International Emmy Award",
    category: "korean",
    excerpt: "Squid Game has won the prestigious International Emmy Award for Best Drama Series.",
    content: `<p>Squid Game has added another accolade to its collection by winning the International Emmy Award for Best Drama Series. The show has been recognized for its unique storytelling and social commentary.</p><h3>Historical Achievement</h3><p>This marks a significant achievement for Korean entertainment, as Squid Game continues to break barriers in the global entertainment industry.</p><h3>Legacy Of The Show</h3><p>The show's success has opened doors for more Korean content to reach global audiences, paving the way for future productions.</p>`,
    tags: ["squid-game", "emmy-award", "korean"],
  },
  {
    title: "New Survival Show 'Boys Planet 2' Announced",
    category: "korean",
    excerpt: "Mnet has announced Boys Planet 2, the sequel to the popular survival show that debuted new K-pop groups.",
    content: `<p>Mnet has officially announced Boys Planet 2, the highly anticipated sequel to the survival show that created global K-pop sensations. Applications are now open for aspiring trainees worldwide.</p><h3>Global Reach</h3><p>Like its predecessor, Boys Planet 2 will feature trainees from around the world, continuing the show's mission of creating truly global K-pop groups.</p><h3>Updated Format</h3><p>The new season promises an updated format with new challenges and voting mechanisms. The show aims to discover the next generation of K-pop stars.</p>`,
    tags: ["boys-planet", "survival-show", "k-pop"],
  },
  {
    title: "K-Drama Actor Lee Min-ho Signs Hollywood Agency",
    category: "korean",
    excerpt: "Popular K-drama actor Lee Min-ho has signed with a major Hollywood agency, signaling plans for international projects.",
    content: `<p>Lee Min-ho, one of South Korea's most recognizable actors, has signed with a major Hollywood agency. This move signals his intention to expand into international projects.</p><h3>Global Appeal</h3><p>Lee Min-ho's popularity extends far beyond Korea, with massive followings across Asia and increasingly in Western markets. His Hollywood signing is a natural progression.</p><h3>Future Projects</h3><p>The actor is reportedly in talks for several international projects, including a potential role in a major Hollywood franchise. Details are still under wraps.</p>`,
    tags: ["lee-min-ho", "hollywood", "k-drama"],
  },

  // === FASHION (7 posts) ===
  {
    title: "Bollywood Actresses Set Trends At Cannes Film Festival",
    category: "fashion",
    excerpt: "Indian actresses made heads turn at the Cannes Film Festival with their stunning fashion choices.",
    content: `<p>The Cannes Film Festival saw some stunning fashion moments from Indian actresses. From haute couture gowns to traditional Indian designs with a modern twist, Bollywood stars dominated the red carpet.</p><h3>Standout Looks</h3><p>Several Indian actresses received international fashion coverage for their red carpet appearances. The fusion of Indian and Western fashion was particularly praised.</p><h3>Designer Collaborations</h3><p>Multiple Indian designers collaborated with international fashion houses for these looks, showcasing the growing influence of Indian fashion on the global stage.</p>`,
    tags: ["cannes", "bollywood-fashion", "red-carpet"],
  },
  {
    title: "Anamika Khanna's New Collection Celebrates Indian Craftsmanship",
    category: "fashion",
    excerpt: "Designer Anamika Khanna unveiled her latest collection that showcases the richness of Indian handloom and craftsmanship.",
    content: `<p>Anamika Khanna's latest collection is a celebration of Indian craftsmanship, featuring handloom fabrics, traditional embroidery techniques, and modern silhouettes. The collection debuted at a major fashion week.</p><h3>Heritage Meets Modern</h3><p>The collection seamlessly blends traditional Indian textile arts with contemporary fashion sensibilities. Each piece tells a story of India's rich craft heritage.</p><h3>Sustainability Focus</h3><p>The collection also emphasizes sustainable fashion practices, using organic fabrics and supporting local artisan communities across India.</p>`,
    tags: ["anamika-khanna", "indian-fashion", "handloom"],
  },
  {
    title: "Sabyasachi Launches Affordable Fashion Line",
    category: "fashion",
    excerpt: "Celebrity designer Sabyasachi has launched an affordable fashion line to make luxury accessible to more people.",
    content: `<p>Sabyasachi Mukherjee, known for his luxurious bridal and couture collections, has launched a more affordable fashion line. The new line aims to make his signature aesthetic accessible to a wider audience.</p><h3>Price Range</h3><p>The new line features pieces at significantly lower price points than his couture collections, while maintaining the designer's signature aesthetic and quality standards.</p><h3>Market Expansion</h3><p>This move is expected to expand Sabyasachi's market reach significantly, tapping into the growing demand for designer fashion at more accessible prices.</p>`,
    tags: ["sabyasachi", "indian-fashion", "affordable-luxury"],
  },
  {
    title: "Deepika Padukone Named Global Brand Ambassador For Luxury Fashion House",
    category: "fashion",
    excerpt: "Deepika Padukone has been named the global brand ambassador for a major international luxury fashion house.",
    content: `<p>Deepika Padukone has been named the global brand ambassador for a prestigious international luxury fashion house. This appointment recognizes her status as a global style icon.</p><h3>A Global Icon</h3><p>Deepika's influence extends across fashion, film, and entertainment, making her a perfect fit for the luxury brand. She will appear in global campaigns and fashion shows.</p><h3>Fashion Legacy</h3><p>This appointment adds to Deepika's impressive portfolio of fashion partnerships, cementing her position as one of the most influential fashion figures from India.</p>`,
    tags: ["deepika-padukone", "luxury-fashion", "brand-ambassador"],
  },
  {
    title: "Mumbai Fashion Week Sees Record Attendance",
    category: "fashion",
    excerpt: "Mumbai Fashion Week has recorded its highest ever attendance, with international buyers and fashion enthusiasts flocking to the event.",
    content: `<p>Mumbai Fashion Week has concluded with record-breaking attendance figures, cementing its position as one of Asia's premier fashion events. International buyers and fashion media were present in large numbers.</p><h3>Emerging Designers</h3><p>The fashion week featured several emerging designers who received international attention. New talent continues to be a major draw for the event.</p><h3>Digital Impact</h3><p>Social media coverage of the event reached millions globally, with several collections going viral on Instagram and TikTok.</p>`,
    tags: ["mumbai-fashion-week", "indian-fashion", "fashion"],
  },
  {
    title: "Alia Bhatt's Sustainable Fashion Brand Launches Online Store",
    category: "fashion",
    excerpt: "Alia Bhatt's sustainable fashion brand has launched its official online store, making eco-friendly fashion accessible globally.",
    content: `<p>Alia Bhatt's sustainable fashion brand has officially launched its online store, offering eco-friendly clothing and accessories to customers worldwide. The brand focuses on sustainable materials and ethical manufacturing.</p><h3>Eco-Friendly Mission</h3><p>The brand uses organic cotton, recycled materials, and other sustainable fabrics. The production process is designed to minimize environmental impact.</p><h3>Global Reach</h3><p>With the online launch, the brand is now accessible to customers in multiple countries, expanding the reach of sustainable Indian fashion.</p>`,
    tags: ["alia-bhatt", "sustainable-fashion", "online-store"],
  },
  {
    title: "Indian Textile Industry Sees Boom In Export Orders",
    category: "fashion",
    excerpt: "India's textile industry has reported a significant increase in export orders, driven by global demand for Indian fabrics.",
    content: `<p>India's textile industry is experiencing a boom in export orders, with global fashion brands increasingly sourcing Indian fabrics and textiles. The industry has reported double-digit growth in exports.</p><h3>Quality And Craftsmanship</h3><p>Indian textiles are known worldwide for their quality and craftsmanship. The demand has been particularly strong for handloom and artisanal fabrics.</p><h3>Economic Impact</h3><p>The growth in textile exports is contributing significantly to the Indian economy, creating jobs in rural areas where traditional textile crafts are practiced.</p>`,
    tags: ["textile-industry", "indian-fashion", "exports"],
  },

  // === LIFESTYLE (7 posts) ===
  {
    title: "Yoga Trends 2026: What's New In The Wellness World",
    category: "lifestyle",
    excerpt: "From aerial yoga to sound healing, the latest yoga trends are transforming the wellness landscape in 2026.",
    content: `<p>The wellness world is evolving rapidly in 2026, with new yoga trends emerging that combine traditional practices with modern wellness approaches. Here's what's trending in the yoga world.</p><h3>Aerial Yoga</h3><p>Aerial yoga continues to gain popularity, offering a unique blend of traditional yoga poses with aerial arts. Studios across India are reporting increased enrollment in aerial yoga classes.</p><h3>Sound Healing Integration</h3><p>Many yoga practitioners are now incorporating sound healing elements into their practice, using singing bowls and gongs to enhance the meditative experience.</p>`,
    tags: ["yoga", "wellness", "lifestyle"],
  },
  {
    title: "Plant-Based Diet Boom In Indian Metropolitan Cities",
    category: "lifestyle",
    excerpt: "Plant-based diets are seeing a massive surge in popularity across Indian metropolitan cities.",
    content: `<p>Indian metropolitan cities are witnessing a significant increase in plant-based diet adoption. From dedicated vegan restaurants to plant-based menu options in mainstream restaurants, the trend is reshaping the food landscape.</p><h3>Health Consciousness</h3><p>Driven by increasing health awareness, many Indians are switching to plant-based diets. Nutritionists report growing demand for plant-based meal planning consultations.</p><h3>Restaurant Response</h3><p>Major restaurant chains and hotels are introducing comprehensive plant-based menus to cater to this growing demand. Several new vegan restaurants have opened in major cities.</p>`,
    tags: ["plant-based", "vegan", "lifestyle"],
  },
  {
    title: "Mental Health Awareness: Bollywood Celebrities Speak Up",
    category: "lifestyle",
    excerpt: "Several Bollywood celebrities have opened up about their mental health journeys, helping to reduce stigma.",
    content: `<p>In a positive development, several Bollywood celebrities have publicly shared their mental health journeys, helping to reduce stigma around mental health issues in Indian society.</p><h3>Breaking The Silence</h3><p>Actors like Deepika Padukone, who has been vocal about her battle with depression, have inspired others in the industry to speak up about their own experiences.</p><h3>Impact On Society</h3><p>These conversations are having a real impact on society, with mental health professionals reporting increased awareness and willingness to seek help among the general public.</p>`,
    tags: ["mental-health", "bollywood", "awareness"],
  },
  {
    title: "Work-Life Balance: Indian Professionals Redefining Success",
    category: "lifestyle",
    excerpt: "Indian professionals are redefining what success means, with work-life balance becoming a priority.",
    content: `<p>Indian professionals, particularly in the IT and startup sectors, are increasingly prioritizing work-life balance over traditional measures of success. This shift is reshaping workplace culture across the country.</p><h3>New Priorities</h3><p>Young professionals are placing greater value on flexible working hours, remote work options, and mental health support from employers.</p><h3>Corporate Response</h3><p>Many companies are responding to this shift by introducing wellness programs, flexible work policies, and improved work-life balance initiatives to attract and retain talent.</p>`,
    tags: ["work-life-balance", "career", "lifestyle"],
  },
  {
    title: "Sustainable Living: Easy Ways To Go Green In 2026",
    category: "lifestyle",
    excerpt: "Practical tips for incorporating sustainable living practices into your daily routine this year.",
    content: `<p>Sustainable living is becoming increasingly accessible in 2026, with more options and resources available for those looking to reduce their environmental footprint. Here are practical tips for going green.</p><h3>Daily Habits</h3><p>Simple changes like using reusable bags, reducing plastic consumption, and choosing local produce can make a significant difference. Small changes in daily habits add up over time.</p><h3>Home Sustainability</h3><p>From solar panels to water harvesting, there are numerous ways to make your home more sustainable. Many of these investments also lead to long-term cost savings.</p>`,
    tags: ["sustainability", "green-living", "lifestyle"],
  },
  {
    title: "Fitness Trends: Home Workouts That Actually Work",
    category: "lifestyle",
    excerpt: "The best home workout routines that deliver results without expensive gym memberships.",
    content: `<p>Home workouts continue to gain popularity as people look for convenient and effective ways to stay fit. Here are some of the best home workout routines that deliver real results.</p><h3>Bodyweight Training</h3><p>Bodyweight exercises remain one of the most effective home workout options. No equipment is needed, and the exercises can be adapted for all fitness levels.</p><h3>Digital Fitness</h3><p>Fitness apps and online classes have made it easier than ever to follow structured workout routines at home. Many platforms offer free trials and affordable subscription options.</p>`,
    tags: ["fitness", "home-workout", "lifestyle"],
  },
  {
    title: "Travel Destinations: Hidden Gems In India For 2026",
    category: "lifestyle",
    excerpt: "Discover some of India's most beautiful hidden travel destinations that are perfect for your next vacation.",
    content: `<p>India is home to countless beautiful destinations that remain relatively unknown to mainstream tourists. Here are some hidden gems worth exploring in 2026.</p><h3>Northeast India</h3><p>The northeastern states of India offer stunning landscapes, rich cultural heritage, and unique experiences. From living root bridges to pristine lakes, the region has much to offer.</p><h3>Coastal Retreats</h3><p>Beyond the popular beach destinations, India's coastline hides several unexplored gems. These quieter alternatives offer a more authentic coastal experience.</p>`,
    tags: ["travel", "india", "hidden-gems"],
  },
];

async function seedPosts() {
  console.log("Starting to seed 50 posts...");

  const values = POSTS.map((post) => ({
    title: post.title,
    slug: post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags,
    isPublished: true,
    isAiGenerated: true,
    publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    viewCount: Math.floor(Math.random() * 5000) + 100,
  }));

  try {
    await db.insert(articles).values(values);
    console.log(`Successfully inserted ${values.length} posts!`);

    const counts = CATEGORIES.map((cat) => ({
      category: cat,
      count: values.filter((v) => v.category === cat).length,
    }));
    console.log("\nPosts per category:");
    counts.forEach((c) => console.log(`  ${c.category}: ${c.count}`));
  } catch (error) {
    console.error("Error seeding posts:", error);
  }
}

seedPosts();
