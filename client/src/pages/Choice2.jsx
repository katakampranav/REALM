import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import axios from "axios";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Choice2 = () => {
  // Video player states
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 1;
  const videoRef = useRef(null);

  // Story states
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [storyType, setStoryType] = useState("default");
  const [selectedStory, setSelectedStory] = useState(null);
  const [customStoryFile, setCustomStoryFile] = useState(null);
  const [customStoryName, setCustomStoryName] = useState("");
  const [uploadedFace, setUploadedFace] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [uploadedFaceFile, setUploadedFaceFile] = useState(null);
  const [extractedStoryText, setExtractedStoryText] = useState("");

  // Add refs for animation elements
  const preferencesRef = useRef(null);
  const uploadRef = useRef(null);

  const defaultStories = [
    {
      id: "story1",
      title: "Harry Potter and the Whispering Portrait",
      description:
        "When a whispering portrait reveals a hidden clue, Harry, Ron, and Hermione uncover a forgotten library of ancient magic, leading them to a secret buried deep within Hogwarts.",
      content: `The Gryffindor common room was bathed in the warm, golden glow of the setting sun, its rays stretching lazily across the plush scarlet carpets and gilded frames of sleeping portraits. The crackling fire in the hearth cast flickering shadows over the mismatched armchairs, where students lounged in various states of relaxation.
        Harry Potter sat hunched over a parchment, his quill scratching furiously as he attempted to finish his Charms essay. His unruly black hair fell into his eyes, and he absently pushed it back, leaving a smudge of ink on his forehead. A half-eaten treacle tart sat forgotten beside him, its sticky sweetness tempting but ignored in favor of last-minute revisions.
        Nearby, Hermione Granger was buried in Ancient Runes of the Celtic Druids, her brow furrowed in concentration. The massive tome nearly obscured her from view, its yellowed pages whispering secrets only she seemed to understand.
        Ron Weasley, meanwhile, was engaged in a losing battle with Crookshanks. The ginger cat lay sprawled on the rug, utterly uninterested as Ron waved his wand in exaggerated arcs.
        "Wingardium Leviosa!" Ron muttered for the fifth time. Crookshanks merely blinked at him before resuming his nap.
        Harry chuckled, glancing up from his work. "I don’t think he’s impressed."
        Ron sighed, flopping back into his chair. "Blimey, even the cat’s better at magic than me."
        It was a rare, peaceful evening in Hogwarts—which, of course, meant something strange was about to happen.
        A whisper, so faint it could have been the wind, slithered through the room.
        "Psst… over here, young wizard…"

        Harry’s quill stilled. He frowned, glancing around. Hermione hadn’t moved, still engrossed in her book, and Ron was now attempting to balance a Chocolate Frog card on Crookshanks’ head.

        The whisper came again, clearer this time. "The secret… it’s just beyond the frame…"
        Harry’s gaze snapped to the far wall, where the imposing portrait of Phineas Nigellus Black—former Headmaster of Hogwarts and notorious curmudgeon—hung in its gilded frame. The usually stoic wizard now had a sly glint in his painted eyes, and his lips twitched ever so slightly.
        "Did you hear that?" Harry whispered.
        Ron looked up, startled. "Hear what?"
        Harry pointed. "He just spoke to me."
        Hermione finally lowered her book, peering over the top. "Who did?"
        "The portrait. Phineas Nigellus."
        Hermione’s eyes widened. "That’s impossible. Hogwarts portraits only repeat their usual phrases unless—"
        "Beneath the tapestry… the winding way…" the portrait murmured, before abruptly freezing back into his usual stern expression.

        Ron gaped. "Blimey, I did hear that! What’s he playing at?"

        Hermione snapped her book shut, her curiosity fully ignited. "Phineas Nigellus Black was one of the least popular Headmasters in history—suspicious, cunning, and notoriously private. If he’s whispering secrets, there must be a reason."

        Harry stood, moving closer to the portrait. "What did you mean, ‘beneath the tapestry’?"

        The portrait remained stubbornly silent.

        Hermione’s mind was already racing. "There’s only one large tapestry in the common room—the hunting scene near the stairs."

        Ron’s eyes lit up. "A secret passage? Like the ones behind the One-Eyed Witch or the Room of Requirement?"
        Harry grinned. "Only one way to find out."
        The trio hurried to the ancient tapestry, its threads faded with age. It depicted a medieval hunting party, their hounds chasing a golden stag through a woven forest.
        Hermione ran her fingers along the edges, searching for hidden seams. "There must be a catch or a spell…"
        Harry, meanwhile, felt a faint, icy draft. He tugged at the corner of the tapestry—and to his surprise, the fabric shifted, revealing a narrow gap in the stone wall.
        "Blimey," Ron breathed.
        Behind the tapestry was a dark, winding staircase, spiraling downward into blackness. The air smelled of dust and old magic.

        Hermione bit her lip. "We should tell a teacher—"
        Ron snorted. "Yeah, right. And miss out on this?"
        Harry pulled out his wand. "Lumos." A soft glow illuminated the first few steps. "We’ll just take a quick look."
        With a shared glance of excitement (and Hermione’s reluctant sigh), the trio stepped into the unknown.
        The stairs twisted deeper than they expected, the air growing colder with each step. Finally, they emerged into a small, circular chamber—and gasped.
        Shelves upon shelves of ancient books lined the walls, their leather spines cracked with age. Dust motes danced in the wandlight, settling over forgotten tomes with titles like "The Forbidden Rites of Merlin’s Age" and "Theories of Time Magic, 12th Century."

        Hermione’s hands flew to her mouth. "Oh! This—this is incredible! These books aren’t in the Restricted Section. Some of these shouldn’t exist anymore!"

        Ron picked up a crumbling volume, squinting at the title. "How to Tame a Hungarian Horntail… for Beginners? Blimey, someone was optimistic."

        Harry grinned, running his fingers along the spines. "Dumbledore never mentioned this place."

        Hermione, already cradling a massive grimoire, looked near tears. "It’s a lost library. A secret archive of magic!"

        Ron nudged Harry. "Bet you five Galleons she’ll have read half of these by breakfast."

        As the trio explored, the portrait’s whisper echoed in Harry’s mind. "The secret… it’s just beyond the frame…"
        They had found more than a hidden passage. They had uncovered a piece of Hogwarts’ past—one that had been waiting for them all along.
        `,
      cover:
        "img/harrypotter.jpg",
      genre: "Fantasy",
      author: "J.K.Rowling",
    },
    {
      id: "story2",
      title: "The Avengers and the Curious Case of the Cosmic Critter ",
      description:
        "The Avengers discover a frightened energy-devouring alien and must help it without violence, proving compassion can save the day.",
      content: `The sun glittered off the sleek, modern walls of Avengers Tower in New York City. Inside, it was a typical busy day for the world's mightiest heroes. Iron Man (Tony Stark) was tinkering with a new invention, sparks flying from his workbench. Captain America (Steve Rogers) was methodically training in the gym, his shield glinting. Thor was enjoying a huge platter of Earthly breakfast, much to everyone's amusement. And Hulk (Bruce Banner) was quietly trying to solve a complex equation, though a tremor went through the floor with every focused frown.

        Suddenly, an alarm blared – not a villain alert, but a strange, fluctuating hum from the main power grid. Jarvis, Tony's AI, spoke with urgency. "Sir, we have an inexplicable energy drain. All major power sources across the city are experiencing intermittent failure. It's... unprecedented." Outside the tower, the bustling city began to falter. Traffic lights flickered and died, causing chaos. Skyscrapers went dark, their bright windows dimming like dying embers. People on the streets looked up, bewildered and worried, as their phones went dead and public transport ground to a halt. "This isn't a blackout," Captain America stated, his voice grim. "This is something draining the power, systematically."

        Tony quickly analyzed the energy signatures. "It's not a short circuit, or a natural phenomenon. This energy signature is... alien. And it's moving, absorbing power as it goes!" "Then we find what feeds on energy," Thor boomed, Mjolnir appearing in his hand. "And we make it answer for its theft!" Iron Man, suited up and flying, used his advanced scanners to pinpoint the anomaly's path. It was heading towards the city's main power station, a massive facility that supplied power to millions. If it reached there, the entire Eastern Seaboard could go dark. Hulk, with his incredible strength, leaped across rooftops, covering ground quickly. Captain America rode alongside in a specialized Avengers vehicle, ready to coordinate. The race was on to stop this mysterious energy thief.

        They arrived at the power station to find a bizarre sight. In the heart of the main generator complex, a shimmering, swirling vortex of pure energy pulsed. It hummed with an unnatural glow, drawing in power lines like hungry tentacles. Strange, metallic tendrils extended from the vortex, sucking the electricity directly from the generators. "It's a parasitic energy siphon!" Tony yelled over the crackle of draining power. "It's consuming the city's lifeblood!" But as they prepared for battle, a small, scared-looking creature with glowing eyes and soft, fur-like tendrils slowly emerged from the core of the vortex. It looked lost, not menacing, and whimpered softly as the energy pulsed around it.

        "Wait," Captain America called out, seeing the creature's fear. "It's not attacking, it's... scared. It just seems to be incredibly hungry for energy, and it found the biggest meal!" Thor, surprisingly gentle, lowered Mjolnir. "A lost hatchling, perhaps, seeking sustenance." Iron Man quickly re-calibrated a portable energy cell. "I can't stop it from feeding, but maybe I can give it something else to snack on that won't destroy the city!" He activated the cell, and its contained energy hummed invitingly. The creature, sensing the new energy source, gently detached from the main generators and cautiously approached the cell. It began to absorb the power, its glowing eyes calming. Once the creature was safely connected to the portable cell and no longer harming the city's power, the Avengers contacted SHIELD for a safe way to return the cosmic critter to its home. The city's lights flickered back on, and the hum of power returned, all thanks to the Avengers who knew that sometimes, even the biggest threats needed a gentle hand, not just a mighty punch.`,
      cover:
        "img/avengers.jpg",
      genre: "Science Fiction",
      author: "Stanley",
    },
    {
      id: "story3",
      title: "Chhota Bheem and the Sparkling Stone",
      description:
        "Bheem and friends discover a magical stone that's actually a lost forest creature, teaching them that kindness solves problems better than force.",
      content: `The golden sun hung high over Dholakpur, casting shimmering 
          reflections on the river as it flowed gently past the village. Chhota 
          Bheem, Chutki, and Raju laughed as they skipped smooth stones 
          across the water, watching them bounce before sinking with tiny 
          splashes. 
          "Bet I can make mine jump four times!" Raju challenged, picking up 
          another flat pebble. 
          Bheem grinned. "I’ll do five!" He wound up his arm, but before he 
          could throw, Raju suddenly gasped. "Look!" he cried, pointing 
          toward the riverbank. 
          Half-buried in the wet mud near a patch of reeds was a small, round 
          stone—except it wasn’t ordinary. It sparkled with dazzling colors, 
          shifting between blue, green, and gold as the sunlight touched it. 
          Chutki clapped her hands. "Wow! It’s like a rainbow!" 
          Bheem carefully picked it up, turning it over in his palm. The stone 
          felt warm, almost alive. "I’ve never seen anything like this before," 
          he murmured, his eyes wide with wonder. 
          Chutki gently took the stone from Bheem, cradling it in her hands. As 
          she did, the colors inside pulsed softly, casting a warm glow on their 
          faces. "It’s beautiful!" she whispered. 
          Raju leaned in closer. "Do you think it’s magic?" 
          Before Bheem could answer, a loud, gruff voice interrupted them. 
          "What’s that, little fools?" Kalia stomped over, followed by his usual 
          sidekicks, Dholu and Bholu. His eyes locked onto the sparkling stone 
          greedily. 
          "Give it here!" Kalia demanded, reaching out to snatch it. But the 
          moment his fingers touched the stone, it flashed brightly, sending a 
          tiny shock through his hand. 
          "YOWCH!" Kalia yelped, shaking his fingers. "It bit me!" 
          Dholu and Bholu backed away nervously. "Maybe it’s cursed!" Bholu 
          whispered. 
          Bheem frowned. "It didn’t hurt us. Maybe it doesn’t like you, Kalia." 
          Kalia scowled but kept his distance, rubbing his hand. "That thing is 
          trouble!" 
          By the next morning, the whole village had heard about the sparkling 
          stone. But something strange was happening—lamps flickered 
          without reason, the well pump sputtered and stopped, and even the 
          fires in the blacksmith’s forge burned weakly. 
          At Kalia’s sweet shop, his ovens wouldn’t heat properly. "This is all 
          because of that stone!" he declared, pointing at Bheem. "It’s stealing 
          our village’s energy!" 
          The villagers murmured in worry. "What if he’s right?" someone 
          asked. 
          Bheem shook his head. "The stone isn’t bad. But something is 
          definitely wrong." 
          Chutki bit her lip. "Maybe we should ask Jaggu. He knows a lot about 
          strange things!" 
          The three friends hurried to Jaggu the monkey, who was munching 
          on a banana near the banyan tree. Bheem held out the stone. 
          "Jaggu, do you know what this is?" 
          Jaggu’s eyes widened. He dropped his banana and chattered 
          excitedly, pointing first at the stone, then at a glowing firefly that 
          buzzed past. Next, he gestured wildly toward the forest, making 
          looping motions with his hands. 
          Chutki gasped. "I think I understand! He’s saying the stone is like a 
          firefly—it needs to go back to the forest!" 
          Jaggu nodded vigorously, clapping his hands. 
          Bheem’s face lit up. "Of course! It’s not stealing energy—it’s just lost! 
          It belongs in the forest!" 
          With the villagers watching curiously, Bheem, Chutki, and Raju 
          carried the stone deep into the forest. The trees grew taller, their 
          leaves filtering the sunlight into a soft green glow. 
          Bheem knelt beside an ancient, moss-covered rock and gently placed 
          the stone down. "This is your home," he said softly. 
          The stone pulsed brightly one last time, its colors swirling like a tiny 
          galaxy. Then, the light dimmed, blending into the forest’s natural 
          glow. 
          Back in the village, lamps flickered back to life, the well pump 
          whirred smoothly, and Kalia’s ovens roared with heat. The villagers 
          cheered in relief. 
          Kalia scratched his head. "Huh. Maybe the stone wasn’t so bad after 
          all." 
          Bheem smiled. "Sometimes, the best solution is just to help 
          something find its way home." 
          And with that, peace returned to Dholakpur—until the next 
          adventure!`,
      cover:
        "img/chhota bheem.jpg",
      genre: "Adventure",
      author: "Rajiv Chilaka",
    },
    {
      id: "story4",
      title: "Naruto and the Legend of the Whispering Woods",
      description:
        "When Team Seven investigates eerie whispers in a mystical forest, Naruto must tame a volatile chakra entity not with force, but by forging a bond of understanding—proving true power lies in harmony.",
      content: `The sun blazed over the Hidden Leaf Village, casting sharp shadows across the training grounds where Team Seven gathered. Naruto Uzumaki bounced on his heels, his orange jumpsuit a blur of restless energy. "An A-rank mission!" he crowed, punching the air. "Finally, something exciting!" Sakura Haruno adjusted her forehead protector with a sigh, while Sasuke Uchiha leaned against a tree, his dark eyes scanning the horizon with detached interest. Their sensei, Kakashi Hatake, materialized beside them in a swirl of leaves, his ever-present book tucked away for once. He unrolled a mission scroll with deliberate slowness. "Reports indicate abnormal chakra fluctuations deep in the Whispering Woods. Our job is to investigate—and neutralize any threats." Naruto's stomach growled loudly, cutting through the tension. "Can we wrap this up before lunch? Ichiraku's new miso ramen is calling my name!"

        The forest lived up to its name the moment they crossed the tree line. Ancient oaks towered overhead, their leaves whispering secrets to one another in a language just beyond comprehension. The air hummed with energy, thick and sweet like honey, making the hairs on Sakura's arms stand on end. A faint, crystalline chime echoed through the woods, seeming to come from everywhere and nowhere at once. Sasuke's Sharingan flickered to life, scanning for traps or genjutsu, but found only the eerie beauty of the forest itself. Kakashi held up a fist, signaling the team to halt. "This chakra signature... it's unlike anything I've felt before," he murmured, his visible eye narrowing. Even Naruto, usually so brash, found himself speaking in hushed tones as if the very trees were listening. The melodic sound wove through the undergrowth, pulling them deeper into the heart of the woods.

        They emerged into a clearing where time itself seemed to stand still. At its center stood a weathered stone shrine, moss creeping up its sides, and above it hovered a swirling orb of pure chakra. It pulsed like a living thing, its colors shifting from emerald green to sapphire blue, casting prismatic light across the mossy ground. The whispers of the forest coalesced into a wordless, haunting song that resonated in their bones. But as they watched, the orb began to expand violently, its light flaring like a miniature sun. The ground trembled, and the trees groaned as if in pain. Sakura's medical training kicked in instantly. "That much unstable chakra could tear the forest apart!" she shouted over the rising wind. Sasuke reacted first, his hands flying through familiar seals. "Fire Style: Fireball Jutsu!" The flames roared toward the orb—only to be absorbed, making the chaotic energy swell even larger. Kakashi's hand crackled with Raikiri, but he hesitated. "Wait! It's not attacking us—it's lost."

        Naruto's blue eyes widened with sudden understanding. Memories flashed through his mind—Kurama's rage, his own struggles to control the Nine-Tails' power. "It's like me when I was a kid," he realized aloud. "All that energy with nowhere to go!" Before anyone could stop him, he stepped forward, arms outstretched. Instead of attacking, he closed his eyes and reached out with his chakra, not to suppress, but to listen. The Kyuubi's power stirred within him, not as a weapon, but as a bridge. Slowly, painstakingly, his golden chakra began to weave into the orb's wild patterns, matching its rhythm like a dancer finding the beat. The orb's violent pulsing eased, its light softening as if exhaling in relief. Bit by bit, it shrank until it rested gently in Naruto's palm, no larger than a pebble yet humming with immense, now-stable power.

        Kakashi's visible eye crinkled in a rare, full smile. "Not bad, Naruto. That was Hokage-level thinking." Sasuke gave a grudging nod, while Sakura grinned proudly. The forest around them sighed, the whispers fading into contented silence. As they made their way back to the village, the strange orb safely sealed in a scroll, Naruto couldn't resist a cheeky grin. "Bet even ramen won't taste as good as that victory!" But as the setting sun painted the trees gold, Team Seven knew they'd encountered something far more profound than a mission—a reminder that true strength often lay in harmony, not force.`,
      cover:
        "img/naruto.jpg",
      genre: "Adventure",
      author: "Masashi Kishimoto",
    },
    {
      id: "story5",
      title: "Superman and the City's Falling Heart",
      description:
        "When an experimental power core threatens to destroy Metropolis Tower, Superman must race against time—not just to stop the disaster, but to prove that even a city of steel has a heart worth saving.",
      content: `The newsroom of the Daily Planet buzzed with its usual frantic energy, the rhythmic pounding of printing presses vibrating through the floor. Clark Kent adjusted his glasses as he typed, the glow of his computer screen reflecting in his lenses. Around him, reporters barked into phones and editors shouted across desks, all chasing the next big story. A radio crackled with breaking news—Metropolis Tower, the city's gleaming pinnacle of progress, was being fitted with an experimental power core today. Clark's super-hearing caught the nervous edge in the engineer's voice during the live interview.

      Then—BOOM.

      The windows rattled violently. Coffee cups jumped off desks. A collective gasp swept through the office as every head turned toward the skyline. Through the glass walls, a plume of smoke could be seen rising from the upper floors of Metropolis Tower. The building's crown tilted at a sickening angle, its supports groaning. Clark's chair scraped back as he stood, his mild-mannered demeanor slipping just long enough for his eyes to flash with Kryptonian intensity. "Be right back," he muttered to no one in particular. "Coffee emergency."

      Outside, chaos reigned. The streets were a sea of upturned faces, all staring in horror as the tower's spire teetered. The experimental core pulsed erratically, its energy lashing out like lightning. Pedestrians screamed as debris began to rain down. In the blink of an eye, a blur of red and blue shot into the sky—Superman.

      He rocketed toward the disaster, his cape a scarlet streak against the sky. News helicopters swarmed like startled birds, their cameras capturing every moment. The tower's upper floors were a mess of twisted metal and sparking wires. The core, now cracked and unstable, throbbed with deadly energy. Superman's mind raced—one wrong move, and the explosion could level blocks. But before he could act, a thunderous CRACK split the air. A massive slab of concrete sheared away from the building, plummeting toward the crowded plaza below.

      Superman didn't hesitate.

      He dove like a comet, wind screaming past him. The chunk of debris was the size of a bus, but he caught it mere stories above the ground, his arms trembling with the strain. Gritting his teeth, he guided it down, lowering it with impossible control into an empty construction site. Dust billowed upward as it landed harmlessly. But there was no time to rest—his super-hearing picked up a frantic heartbeat. A construction worker dangled from a broken beam, his grip slipping as the tower shuddered.

      In a flash, Superman was there. The man's eyes widened as strong hands closed around him. "I've got you," Superman said, his voice calm even as the world seemed to fall apart around them. In the next instant, they were on solid ground, the worker gasping in shock. Without missing a beat, Superman returned to the core. His heat vision flared, precise as a surgeon's scalpel, welding fractured supports. Then, with careful, measured force, he pressed his hands against the core's casing, containing the runaway energy. The violent glow dimmed, then stabilized.

      Silence. Then—cheers.

      The streets erupted in applause as the Man of Steel hovered for a moment, surveying his work. The worker he'd rescued waved shakily, mouthing thank you. Superman nodded, then vanished in a streak of color. Seconds later, Clark Kent reappeared in the Daily Planet newsroom, slightly disheveled. "You wouldn't believe the line at the coffee shop," he sighed, slipping back into his chair just as Lois Lane stormed over.

      "Smallville! Where have you—never mind. We've got a front-page story to write." She tossed a notepad onto his desk. "Superman saves Metropolis Tower. Again."

      Clark smiled faintly, adjusting his glasses. "Guess some things never change."`,
      cover:
        "img/superman.jpg",
      genre: "Superhero Action-Drama",
      author: "Jerry Siegel & Joe Shuster ",
    },
    {
      id: "story6",
      title: "The Chronicles of Bahubali: The Dragon's Crown",
      description:
        "A tale of prophecy, brotherhood, and destiny, where two princes—one of light, one of shadow—battle for the fate of a magical kingdom, culminating in a sacrifice that transcends death.",
      content: `In the mystical kingdom of Mahishmati, where floating islands danced around crystal spires, 
        Queen Sivagami stood before the Oracle of Storms. The ancient seer's eyes glowed with 
        ethereal light as she spoke of a prophecy written in starfire. "When the twin moons align and 
        the Dragon's Crown awakens, two princes shall be born with the power to either save or 
        destroy the realm." Lightning crackled through the temple as Sivagami felt the first stirrings 
        of life within her adopted daughter-in-law, Devasena. The Oracle's voice echoed with 
        otherworldly power: "One shall command the elements themselves, while the other shall 
        speak with the voices of the dead." Sivagami's hand trembled as she clutched the ancient 
        Dragon's Crown, a relic that pulsed with forbidden magic. The fate of Mahishmati now hung 
        in the balance between light and shadow. As the twin moons began their celestial dance, the 
        very air shimmered with anticipation of the coming storm. 
        Twenty-five years later, in a realm where waterfalls flowed upward and trees bore fruit of 
        pure light, two brothers discovered their extraordinary heritage. Bahubali, raised by the river 
        spirits, could summon torrential rains with his emotions and speak to the ancient earth itself. 
        His muscles rippled with the strength of mountain giants as he lifted boulders that would 
        crush ordinary men. Meanwhile, his brother Bhallaladeva, groomed in the shadow courts, had 
        mastered necromancy and could raise armies of spectral warriors from forgotten battlefields. 
        Their foster mother revealed the truth on their twenty-fifth birthday, as prophesied by the 
        twin moons' alignment. The Dragon's Crown, hidden for decades, began to sing with an 
        otherworldly melody that called to both princes. Each brother felt its power resonating in 
        their bones, awakening abilities that made the very fabric of reality bend to their will. The 
        peaceful kingdom trembled as two destinies prepared to collide in an epic struggle for the 
        crown that could reshape the world itself. 
        To prove their worthiness for the Dragon's Crown, both princes faced the Trials of the 
        Elemental Guardians in the Forbidden Peaks. Bahubali descended into the Cavern of Echoing 
        Flames, where he battled the Phoenix Lord in single combat, his sword blazing with righteous 
        fire. The trial tested not just his strength, but his compassion, as he chose to heal the wounded 
        phoenix rather than claim victory through destruction. Bhallaladeva entered the Necropolis of 
        Whispers, where he commanded legions of shadow-wraiths and proved his tactical brilliance 
        by solving the Riddle of Eternal Night. Each brother emerged transformed, their powers 
        magnified beyond mortal comprehension. The crown itself materialized before them, floating 
        between dimensions, its dragon-head ornament breathing real fire and ice simultaneously. 
        Ancient magic crackled in the air as the artifact demanded a final test: the brothers must duel 
        beneath the aurora-filled sky. The winner would claim dominion over life and death itself, 
        while the loser would fade into legend. 
        The final confrontation erupted across the floating battlefields above Mahishmati, where 
        gravity itself bent to the brothers' wills. Bahubali rode upon a storm-drake he had tamed with 
        his elemental powers, lightning crackling from his enchanted mace as he soared through 
        crystalline clouds. Bhallaladeva commanded a flying fortress of bone and shadow, his undead 
        legions darkening the sky like a plague of locusts. Their battle raged for seven days and 
        nights, splitting mountains and turning rivers to steam with the fury of their magical clash. 
        Bahubali summoned typhoons that could level cities, while Bhallaladeva raised the spirits of 
        dead dragons to fight alongside his spectral army. The very heavens wept tears of liquid 
        starlight as their weapons—one forged from divine thunder, the other from the darkness 
        between worlds—met in earth-shaking collision. In the climactic moment, as the Dragon's 
        Crown hovered between them, Bhallaladeva's jealousy consumed him, and he struck his 
        brother down with a cursed blade that could wound even gods. Bahubali fell like a fallen star, 
        his elemental powers scattering across the land as rain, wind, and growing things. 
        As Bahubali lay dying, the Dragon's Crown revealed its true nature—it was not merely a 
        symbol of power, but a living entity that judged the worthiness of rulers' hearts. The crown 
        rejected Bhallaladeva's claim, for his victory was born of treachery rather than honor, and 
        instead chose to bind itself to Bahubali's noble spirit. In his final moments, Bahubali used the 
        crown's magic to transform himself into an eternal guardian, his essence merging with the 
        very land of Mahishmati. His sacrifice created a protective barrier around the kingdom, 
        ensuring that no tyrant could ever truly conquer it while his spirit endured. Bhallaladeva 
        found himself cursed to rule a kingdom that would never truly accept him, as Bahubali's 
        elemental magic continued to aid the people from beyond death. The Dragon's Crown 
        vanished into legend, waiting for another worthy soul to claim its power in the kingdom's 
        darkest hour. Years later, when invaders threatened Mahishmati, the people would witness 
        their fallen prince's spirit rising from waterfalls and thunderclouds, his eternal love for his 
        homeland making him the greatest guardian any realm had ever known. Thus ended the age 
        of the Twin Princes, but began the eternal legend of Bahubali, the Elemental King who chose 
        love over power.`,
      cover:
        "img/bahubali.webp",
      genre: "Fantasy ",
      author: "S.S.Rajmouli",
    },
  ];

  // Video player handlers
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // File handlers
  const handleStoryUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (validTypes.includes(file.type)) {
        setCustomStoryFile(file);
        setCustomStoryName(file.name);
      } else {
        alert("Please upload a valid document file (PDF, DOC, DOCX, or TXT)");
      }
    }
  };

  const fetchDefaultStoryPDF = async (storyId) => {
    try {
      const story = defaultStories.find((s) => s.id === storyId);
      if (!story) {
        throw new Error("Story not found");
      }

      // For default stories, we'll use the content directly since we have it
      return {
        content: story.content,
        title: story.title,
      };
    } catch (error) {
      console.error("Error fetching default story:", error);
      throw error;
    }
  };

  const handleGetCharacters = async () => {
    setIsLoading(true);

    try {
      let storyData;

      if (storyType === "default" && selectedStory) {
        storyData = await fetchDefaultStoryPDF(selectedStory.id);
      } else if (storyType === "custom" && customStoryFile) {
        const formData = new FormData();
        formData.append("file", customStoryFile);

        const response = await axios.post(
          "http://localhost:5000/extract-characters",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          const { top_characters, extracted_text } = response.data;
          setCharacters(top_characters);
          setExtractedStoryText(extracted_text);

          // For custom stories, auto-select the first character
          if (top_characters.length > 0) {
            setSelectedCharacter(top_characters[0]);
          }
        }
        return;
      } else {
        alert("Please select a story first");
        setIsLoading(false);
        return;
      }

      // For default stories, extract characters from the content
      if (storyType === "default") {
        const response = await axios.post(
          "http://localhost:5000/extract-characters",
          {
            text: storyData.content,
            title: storyData.title
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const { top_characters, extracted_text } = response.data;
          setCharacters(top_characters);
          setExtractedStoryText(extracted_text);

          // For default stories, auto-select the first character
          if (top_characters.length > 0) {
            setSelectedCharacter(top_characters[0]);
          }
        }
      }
    } catch (error) {
      console.error("Failed to get characters:", error);
      alert("Failed to extract characters. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaceUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setUploadedFaceFile(file);
      setUploadedFace(URL.createObjectURL(file));
    }
  };

  const handleGenerateStory = async () => {
    try {
      setIsLoading(true);

      // Validate inputs
      if (!uploadedFaceFile) {
        alert("Please upload a face image");
        setIsLoading(false);
        return;
      }

      if (!selectedCharacter) {
        alert("Please select a character");
        setIsLoading(false);
        return;
      }

      if (!extractedStoryText) {
        alert("Story text is missing");
        setIsLoading(false);
        return;
      }

      // Prepare the form data
      const formData = new FormData();
      formData.append("child_photo", uploadedFaceFile);
      formData.append("protagonist", selectedCharacter);
      formData.append("story", extractedStoryText);

      // Make the API call
      const response = await axios.post(
        "http://localhost:5000/generate-personalized-story",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        navigate("/choice2-story", {
          state: {
            storybook: response.data.storybook,
            protagonist: selectedCharacter,
          },
        });
      } else {
        throw new Error(response.data.message || "Failed to generate story");
      }
    } catch (error) {
      console.error("Error generating story:", error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // GSAP animations
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "none",
      borderRadius: "0",
    });

    gsap.from(preferencesRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: preferencesRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(uploadRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: uploadRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".story-heading", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  const getVideoSrc = () => `videos/choice-2.mp4`;

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black">
      {/* Video Player Section */}
      <div className="fixed inset-0 h-screen w-screen">
        {loading && (
          <div className="flex-center fixed inset-0 z-[100] h-screen w-screen overflow-hidden bg-violet-50">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
          </div>
        )}

        <div
          id="video-frame"
          className="relative z-10 h-screen w-screen overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 z-10 bg-white/10 mix-blend-overlay"></div>
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/30 to-black/50"></div>

            <video
              ref={videoRef}
              src={getVideoSrc()}
              autoPlay
              loop
              muted
              playsInline
              className="contrast-110 absolute inset-0 size-full object-cover brightness-110"
              onLoadedData={handleVideoLoad}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 min-h-screen w-screen bg-gradient-to-b from-black/30 via-black/40 to-black/50 backdrop-blur-[1px]">
        <header className="flex h-16 items-center justify-between border-b border-white/10 px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            >
              <img src="/img/logo.png" alt="logo" className="w-16" />
            </button>
          </div>
        </header>

        <main className="flex-1 py-12">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="space-y-8">
              <div className="story-heading space-y-2 text-center">
                <h1 className="text-4xl font-bold tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] sm:text-5xl">
                  ✨ Craft Your Own Legendary Tale
                </h1>
                <p className="text-lg text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  Choose a story and customize characters with face swapping
                </p>
              </div>

              {/* Story Type Card */}
              <div
                ref={preferencesRef}
                className="rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/20"
              >
                <div className="mb-6">
                  <h2 className="mb-3 text-2xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                    Choose Story Type
                  </h2>
                  <p className="text-base text-gray-200">
                    Select a default story or upload your own
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="flex items-start space-x-4">
                    <input
                      type="radio"
                      id="default"
                      name="storyType"
                      value="default"
                      checked={storyType === "default"}
                      onChange={(e) => setStoryType(e.target.value)}
                      className="mt-1 size-4 border-white/20 text-violet-500 focus:ring-violet-500/50"
                    />
                    <div className="grid w-full gap-3">
                      <label
                        htmlFor="default"
                        className="font-medium text-white"
                      >
                        Choose from default stories
                      </label>
                      <div
                        className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${storyType !== "default" && "opacity-50"}`}
                      >
                        {defaultStories.map((story) => (
                          <div
                            key={story.id}
                            className={`group relative cursor-pointer transition-all duration-300 ${
                              selectedStory?.id === story.id
                                ? "ring-2 ring-violet-500"
                                : ""
                            }`}
                            onClick={() =>
                              storyType === "default" && setSelectedStory(story)
                            }
                          >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20">
                              <div className="absolute inset-0">
                                <img
                                  src={story.cover}
                                  alt={story.title}
                                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop";
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                              </div>

                              <div className="absolute inset-0 flex flex-col justify-end p-4">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="inline-block rounded-full bg-violet-500/20 px-2 py-1 text-xs font-medium text-violet-200">
                                      {story.genre}
                                    </span>
                                    {selectedStory?.id === story.id && (
                                      <div className="flex size-6 items-center justify-center rounded-full bg-violet-500">
                                        <svg
                                          className="size-4 text-white"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <h3 className="line-clamp-2 text-lg font-semibold text-white">
                                    {story.title}
                                  </h3>
                                  <p className="line-clamp-2 text-sm text-white/80">
                                    {story.description}
                                  </p>
                                  <p className="text-xs italic text-white/60">
                                    By {story.author}
                                  </p>
                                </div>
                              </div>

                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="space-y-2 text-center">
                                  <span className="block font-medium text-white">
                                    Select Story
                                  </span>
                                  <span className="block text-sm text-white/80">
                                    Click to choose this story
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <input
                      type="radio"
                      id="custom"
                      name="storyType"
                      value="custom"
                      checked={storyType === "custom"}
                      onChange={(e) => setStoryType(e.target.value)}
                      className="mt-1 size-4 border-white/20 text-violet-500 focus:ring-violet-500/50"
                    />
                    <div className="grid w-full gap-3">
                      <label
                        htmlFor="custom"
                        className="font-medium text-white"
                      >
                        Upload your own story
                      </label>
                      <p className="text-sm text-white/60">
                        Note: Please upload stories where the protagonist's face is clearly visible 
                        (not hidden by masks or other objects) for best face-swapping results.
                      </p>
                      <div
                        className={`space-y-4 ${storyType !== "custom" && "opacity-50"}`}
                      >
                        {customStoryFile ? (
                          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center space-x-3">
                              <svg
                                className="size-8 text-white/60"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                              <div>
                                <p className="font-medium text-white">
                                  {customStoryName}
                                </p>
                                <p className="text-sm text-white/60">
                                  {(customStoryFile.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setCustomStoryFile(null);
                                setCustomStoryName("");
                                setExtractedStoryText("");
                                setCharacters([]);
                                setSelectedCharacter(null);
                              }}
                              className="text-white/60 transition-colors hover:text-white"
                            >
                              <svg
                                className="size-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="story-upload"
                            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/20 p-8 transition-all duration-300 hover:border-white/30 hover:bg-white/5"
                          >
                            <svg
                              className="size-10 text-white/60"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <span className="mt-2 text-sm text-white/60">
                              Upload Story Document
                            </span>
                            <span className="mt-1 text-xs text-white/40">
                              Supports PDF, DOC, DOCX, TXT
                            </span>
                            <input
                              id="story-upload"
                              type="file"
                              accept=".pdf,.doc,.docx,.txt"
                              className="hidden"
                              onChange={handleStoryUpload}
                              disabled={storyType !== "custom"}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Characters Selection Card */}
              {(storyType === "custom" || storyType === "default") &&
                characters.length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/20">
                    <div className="mb-6">
                      <h2 className="mb-3 text-2xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                        Select a Character
                      </h2>
                      <p className="text-base text-gray-200">
                        Choose which character you would like to customize
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {characters.map((character, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer rounded-lg border p-4 transition-all duration-300 ${
                            selectedCharacter === character
                              ? "border-violet-500 bg-violet-500/20"
                              : "border-white/10 hover:border-white/20"
                          }`}
                          onClick={() => setSelectedCharacter(character)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white">
                              {character.charAt(0)}
                            </div>
                            <span className="font-medium text-white">
                              {character}
                            </span>
                          </div>
                          {selectedCharacter === character && (
                            <div className="mt-2 flex justify-end">
                              <svg
                                className="size-5 text-violet-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Guidelines Card */}
                {(storyType === "default" && selectedStory && selectedCharacter) ||
                (storyType === "custom" && customStoryFile && selectedCharacter) ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/20">
                    <div className="mb-4">
                      <h2 className="mb-2 text-xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                        Photo Upload Guidelines
                      </h2>
                      <p className="text-base text-gray-200">
                        For best results, please follow these guidelines:
                      </p>
                    </div>

                    <div className="grid gap-3 text-sm text-gray-300">
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                          ✓
                        </div>
                        <span>
                          Use a clear, high-quality photo (minimum 500x500 pixels)
                        </span>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                          ✓
                        </div>
                        <span>
                          Face should be clearly visible and facing the camera
                        </span>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                          ✓
                        </div>
                        <span>
                          Good lighting with minimal shadows on the face
                        </span>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                          ✓
                        </div>
                        <span>
                          Plain background works best (avoid busy backgrounds)
                        </span>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                          ✓
                        </div>
                        <span>No sunglasses or objects obscuring the face</span>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                          ✓
                        </div>
                        <span>
                          Neutral expression works best for most stories
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}

              {/* Face Upload Card */}
              {(storyType === "default" &&
                selectedStory &&
                characters.length > 0) ||
              (storyType === "custom" &&
                customStoryFile &&
                characters.length > 0) ? (
                <div
                  ref={uploadRef}
                  className="rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/20"
                >
                  <div className="mb-6">
                    <h2 className="mb-3 text-2xl font-semibold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                      Upload Face for Character
                    </h2>
                    <p className="text-base text-gray-200">
                      Upload a face image to swap with story characters
                    </p>
                  </div>
                  <div className="grid gap-6">
                    <div className="flex items-center justify-center">
                      {uploadedFace ? (
                        <div className="relative size-40 overflow-hidden rounded-full border border-white/20">
                          <img
                            src={uploadedFace}
                            alt="Uploaded face"
                            className="size-full object-cover"
                          />
                          <button
                            onClick={() => {
                              setUploadedFace(null);
                              setUploadedFaceFile(null);
                            }}
                            className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white/80 hover:text-white"
                          >
                            <svg
                              className="size-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="face-upload"
                          className="flex size-40 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-white/20 transition-all duration-300 hover:border-white/30 hover:bg-white/5"
                        >
                          <svg
                            className="size-8 text-white/60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <span className="mt-2 text-sm text-white/60">
                            Upload Face
                          </span>
                          <input
                            id="face-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFaceUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex flex-col space-y-4">
                {/* Show extract characters button when:
                    - Default story is selected but no characters yet
                    - OR custom story is uploaded but no characters yet */}
                {((storyType === "default" &&
                  selectedStory &&
                  characters.length === 0) ||
                  (storyType === "custom" &&
                    customStoryFile &&
                    characters.length === 0)) && (
                  <Button
                    id="extract-characters"
                    title={
                      isLoading
                        ? "Extracting Characters..."
                        : "Extract Characters"
                    }
                    containerClass="w-full bg-blue-600/90 hover:bg-blue-500 text-lg py-4 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 backdrop-blur-sm"
                    onClick={handleGetCharacters}
                    disabled={isLoading}
                  />
                )}

                {uploadedFace && (
                  <Button
                    id="generate-story"
                    title={isLoading ? "Generating Story..." : "Generate Story"}
                    containerClass="w-full bg-violet-600/90 hover:bg-violet-500 text-lg py-4 rounded-lg shadow-lg hover:shadow-violet-500/30 transition-all duration-300 backdrop-blur-sm"
                    onClick={handleGenerateStory}
                    disabled={isLoading}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Choice2;
