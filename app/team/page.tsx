import Image from "next/image"
import Link from "next/link"
import { TeamList } from "../_template_data/Team"


export default function Team() {
   return (
       <div className='page h-full pt-8 mb-[12vh]'>
           {/* Back to CTF button */}
           <div className="w-[90%] mb-8">
               <Link 
                   href="/#about" 
                   className="inline-flex items-center text-gray-600 hover:text-gray-800 text-lg font-medium transition-colors"
               >
                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                   Back to CTF
               </Link>
           </div>

           <h1 className='title'>WHO AM I?</h1>
           <div className="flex flex-row w-full items-start justify-center h-full">
               {TeamList.map((person, i) => (
                   <div key={i} className="w-1/3 max-md:w-[80%]">
                       <Image 
                           src={person.image}
                           alt="pfp"
                           width={500}
                           height={500}
                           className="w-full"
                           placeholder="blur"
                           blurDataURL={person.image}
                           quality={100}
                           priority={true}
                       />                    
                       <div className="w-full break-all">
                           <p className="my-4 text-2xl">{person.name} / <span className='text-[#207ceb]'>{person.role}</span></p>
                           <p className="mb-1 bg-blue-300 p-4">{person.website}</p>
                       </div>
                   </div>
               ))}
           </div>
       </div>
   )
}