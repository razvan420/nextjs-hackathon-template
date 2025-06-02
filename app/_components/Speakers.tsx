import Image from "next/image"
import { SpeakerType } from '../_template_data/Speakers'


export default function Speakers({ data }: { data: SpeakerType[] }) {
   return (
       <div id="speakers" className='page component'>
           <p className='title'>Where did that flag go?</p>
           <div className='row items-start w-full'>
               {data.map((obj, i) => (
                   <div key={i} className='col h-full w-[30%] max-md:w-[90%] m-3 bg-gray-200 p-6'>
                       <p className="mb-3 text-[#3f9eda] text-xl font-bold">{obj.name}</p>
                       <p className="text-gray-700">{obj.position}</p>
                   </div>
               ))}
           </div>
       </div>
   )
}