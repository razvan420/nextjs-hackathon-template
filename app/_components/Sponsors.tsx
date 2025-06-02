import Image from "next/image"
import { SponsorType } from '../_template_data/Sponsor'


export default function Sponsors({ data }: { data: SponsorType[] }) {
    return (
        <div id="sponsors" className='page component'>
            <p className='title'>AI Espionage</p>
            <div className='row w-full justify-center'>
                <div className='row justify-center m-10'>
                    <Image
                        src={data[0]?.img || '/default-sponsor.jpg'}
                        alt="sponsor img"
                        width={400}
                        height={320}
                        className="w-[35vh] object-cover"
                        placeholder="empty"
                        quality={100}
                        priority={true}  // Load immediately since it's the only image
                        sizes="35vh"
                    />
                </div>
            </div>
        </div>
    )
}