import Face from '../_assets/speakers/jurica-koletic-7YVZYZeITc8-unsplash.jpg'


export type SpeakerType = {
    name: string,
    position: string,
    img: string
}


export const SpeakerList: SpeakerType[] = [
    {
        name: "mailto",
        position: "I think I lost a flag somewhere around here...maybe you can mail someone that could help?",
        img: Face.src
    },

]