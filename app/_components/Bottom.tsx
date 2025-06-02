import Image from "next/image"
import { SocialType } from "../_template_data/Social"

export default function Bottom({ Logo, SocialList }: { Logo: string, SocialList: SocialType[] }) {
    const currentYear = new Date().getFullYear()
    
    return (
        <div className='col w-full bg-[#1d242b]'>
            <div className='row justify-between px-4 py-4 w-full'>
                <div>
                    <Image
                        src={Logo}
                        alt="bottom navbar logo"
                        width={200}
                        height={160}
                        className="w-12 h-12 m-6"
                        placeholder="blur"
                        blurDataURL={Logo}
                    />
                </div>
                <div className='row items-start h-full py-6 max-md:col text-white'>
                    {SocialList.map((social, i) => (
                        <a key={i} className="m-6" href={social.link}>{social.social}</a>
                    ))}
                </div>
            </div>
            
            {/* Copyright Section */}
            <div className='w-full border-t border-gray-600 px-4 py-3'>
                <p className='text-center text-gray-400 text-sm'>
                    © {currentYear} <a href="mailto:contact@secforit.ro" className='text-white font-semibold hover:text-blue-300 transition-colors duration-200'>Lisman Adrian-Razvan</a> @ <a href="https://secforit.ro" target="_blank" rel="noopener noreferrer" className='text-white font-semibold hover:text-blue-300 transition-colors duration-200'>SECFORIT</a> - All rights reserved. Crafted with ☕ and 🧠
                </p>
            </div>
        </div>
    )
}