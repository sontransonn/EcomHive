import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel'

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
}

const Banner = () => {

    const banners = {

    }

    return (
        <div className='w-full md-lg:mt-6'>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='w-full flex flex-wrap md-lg:gap-8'>
                    <div className='w-full'>
                        <div className='my-8'>
                            <Carousel
                                autoPlay={true}
                                infinite={true}
                                arrows={true}
                                showDots={true}
                                responsive={responsive}
                            >
                                {/* {
                                    banners.length > 0 && banners.map((b, i) => <Link className='lg-md:h-[440px] h-auto w-full block' key={i} to={`/product/details/${b.link}`}>
                                        <img src={b.banner} alt="" />
                                    </Link>)
                                } */}
                                {[1, 2, 3, 4, 5, 6, 7].map((img, i) => (
                                    <Link
                                        className='lg-md:h-[440px] h-auto w-full block'
                                        key={i}
                                    // to={`/product/details/${b.link}`}
                                    >
                                        <img
                                            src={`http://localhost:5173/images/banners/${img}.jpg`}
                                            alt=""
                                        />
                                    </Link>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner