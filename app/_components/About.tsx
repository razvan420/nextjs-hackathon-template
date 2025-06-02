import Image from "next/image"
import { AboutType } from "../_template_data/About"

export default function About({ data, AboutImage }: { data: AboutType, AboutImage: string }) {
    return (
        <div id="about" className='page component'>
            <div className='row'>
                <div className='col flex-1 max-md:flex-none items-center justify-center w-[90%]'>
                    <Image
                        src={AboutImage}
                        alt="About image"
                        width={800}        // Increased from 200
                        height={640}       // Increased from 160
                        className="w-[40vw] max-md:w-full max-md:mb-10 border-gray-800 border-8"
                        placeholder="blur"
                        blurDataURL={AboutImage}
                        quality={100}      // Maximum quality
                        priority={true}    // Load immediately since it's above-the-fold
                        sizes="(max-width: 768px) 100vw, 40vw"  // Responsive sizing
                    />
                </div>
                <div className='col flex-1 max-md:flex-none max-md:mt-6 items-center justify-center'>
                    <div className="col w-[90%]">
                        <p className="title justify-start mb-20 text-gray-800">Let's TALK About<span className='text-[#37c598]'>DNS</span><br></br></p>
                        <p className="text-lg">{data.firstParagraph}</p>
                        <br />
                        <p className="text-lg">{data.secondParagraph}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}