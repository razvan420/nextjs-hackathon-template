import Pfp from '../_assets/team/pfp.jpeg'


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
        role: "Analyst / Engineer",
        website: "I love to breaking things...",
    }
]