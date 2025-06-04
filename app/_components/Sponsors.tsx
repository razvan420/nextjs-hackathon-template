import Image from "next/image"
import { SponsorType } from '../_template_data/Sponsor'

export default function Sponsors({ data }: { data: SponsorType[] }) {
    // Show only the first sponsor, or return early if no sponsors
    if (!data || data.length === 0) {
        return (
            <div id="sponsors" className='page component'>
                <p className='title'>Sponsors</p>
                <div className='row w-full'>
                    <p>No sponsors available</p>
                </div>
            </div>
        )
    }

    // Get only the first sponsor
    const firstSponsor = data[0];

    return (
        <div id="sponsors" className='page component'>
            <p className='title'>Sponsors</p>
            <div className='row w-full'>
                <div className='row justify-start m-10'>
                    <Image
                        src={firstSponsor.img}
                        alt="sponsor img"
                        width={200}
                        height={160}
                        className="w-[35vh] object-cover"
                        placeholder="blur"
                        blurDataURL={firstSponsor.img}
                    />
                </div>
            </div>
        </div>
    )
}