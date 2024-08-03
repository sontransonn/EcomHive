import React from 'react'
import { useSelector } from 'react-redux'
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
    const { categories } = useSelector(state => state.category)

    return (
        <div className='w-[85%] mx-auto relative'>
            <Carousel
                autoPlay={true}
                autoPlaySpeed={2000}
                infinite={true}
                arrows={true}
                customLeftArrow={<></>}
                customRightArrow={<></>}
                responsive={responsive}
                transitionDuration={500}
            >
                {
                    categories.map((category, index) => (
                        <Link
                            className='h-[185px] border block'
                            key={index}
                            to='#'
                        >
                            <div className='w-full h-full relative p-3'>
                                <img
                                    src={category.image}
                                    alt="image"
                                    className='w-full h-full'
                                />
                                <div className='absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                                    <span className='py-[2px] px-6 bg-[#3330305d] text-white'
                                    >
                                        {category.name}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default Categories