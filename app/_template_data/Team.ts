import Pfp from '../_assets/team/pfp.png'


export type TeamType = {
    image: string
    name: string,
    role: string,
    website: string,
}


export const TeamList: TeamType[] = [
    {
        image: Pfp.src,
        name: "Razvan",
        role: " I ❤️ to breaking things",
        website: "Hi! I'm Razvan - As a Vulnerability Analyst at Stefanini, I specialize in identifying vulnerabilities to help strengthen organizations' defenses. I crafted this challenge for you to put your skills to the test. GL & HF!",
    }
]