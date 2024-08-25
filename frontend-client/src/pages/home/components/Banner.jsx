import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel'

import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

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

const CustomDot = ({ onClick, active }) => {
    return (
        <li
            onClick={() => onClick()}
            className={`${active ? "active bg-blue-500" : "inactive bg-gray-500"} 
            w-[40px] h-[5px] inline-block mb-3 mx-1 cursor-pointer `}
        />
    );
};

const CustomLeftArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className='absolute left-5 top-1/2 translate-y-[-50%] text-white cursor-pointer'
        >
            <MdArrowBackIos size={50} />
        </button>
    );
};

const CustomRightArrow = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className='absolute right-5 top-1/2 translate-y-[-50%] text-white cursor-pointer'
        >
            <MdArrowForwardIos size={50} />
        </button>
    );
};

const Banner = () => {
    return (
        <div className='w-full md-lg:mt-6 mt-8'>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='w-full flex flex-wrap md-lg:gap-8'>
                    <div className='w-full'>
                        <Carousel
                            autoPlay={true}
                            autoPlaySpeed={5000}
                            infinite={true}
                            customLeftArrow={<CustomLeftArrow />}
                            customRightArrow={<CustomRightArrow />}
                            showDots={true}
                            responsive={responsive}
                            customDot={<CustomDot />}
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
                                >
                                    <img
                                        src={`http://localhost:3000/images/banners/${img}.jpg`}
                                        alt=""
                                        className='w-full'
                                    />
                                </Link>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner