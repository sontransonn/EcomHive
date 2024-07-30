import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel'

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 6
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    mdtablet: {
        breakpoint: { max: 991, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 3
    },
    smmobile: {
        breakpoint: { max: 640, min: 0 },
        items: 2
    },
    xsmobile: {
        breakpoint: { max: 440, min: 0 },
        items: 1
    }
}

const Categories = () => {
    return (
        <div className='w-[87%] mx-auto relative'>
            <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                responsive={responsive}
                transitionDuration={500}
            >
                {[1, 2, 3, 4, 5, 6, 7].map((img, i) => (
                    <Link
                        className='h-[185px] border block'
                        key={i} to='#'
                    >
                        <div className='w-full h-full relative p-3'>
                            <img
                                src={`http://localhost:5173/images/banners/${img}.jpg`}
                                alt=""
                            />
                            <div className='absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                                <span className='py-[2px] px-6 bg-[#3330305d] text-white'
                                >
                                    Shop
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </div>
    )
}

export default Categories