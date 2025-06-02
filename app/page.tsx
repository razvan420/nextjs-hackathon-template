import Intro from './_components/Intro'
import About from './_components/About'
import Speakers from './_components/Speakers'
import FAQ from './_components/FAQ'
import Sponsors from './_components/Sponsors'
import Schedule from './_components/Schedule'

import { ScheduleList } from './_template_data/Schedule'
import { SpeakerList } from './_template_data/Speakers'
import { FAQList } from './_template_data/FAQ'
import { AboutParagraph } from './_template_data/About'

import AboutImage from "./_assets/about/IMG_5014.png"


export default function Home() {
  return (
    <div className='page h-full'>
      <div className='w-[90%]'>
        <Intro />
        <About data={AboutParagraph} AboutImage={AboutImage.src} />
        <Schedule data={ScheduleList} />
        <Speakers data={SpeakerList} />
        <FAQ data={FAQList} />
      </div>
    </div>
  )
}