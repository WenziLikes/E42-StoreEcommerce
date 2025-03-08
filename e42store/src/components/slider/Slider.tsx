import React from "react"
import "./Slider.scss"
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react"
// Import Swiper styles
// Styles must use direct files imports
import "swiper/scss" // core Swiper
import "swiper/scss/navigation" // Navigation module
import "swiper/scss/pagination" // Pagination module
import {Autoplay, HashNavigation, Navigation, Pagination} from "swiper/modules"
import {Link} from "react-router-dom"
import {MdOutlineArrowRightAlt} from "react-icons/md"
import {RxDoubleArrowDown} from "react-icons/rx"
import {ScrollToTarget} from "../index"
import {ISlideType} from "../../product.type"

const initialState: ISlideType[] = [
    {
        id: 1,
        image: "https://i.ibb.co/WyRKfwh/for-laptop1nobg.png",
        title: "UGREEN Laptop Stand for Desk Aluminum",
        heading: "Ergonomic Laptop Riser up to 17.3 Inch Laptop",
        desc: "Up to 30% off on all onsale proucts.",
        subHeading: "Adjustable Laptop Stand Compatible with MacBook Air Pro, Chromebook, Lenovo Ideapad 3 and More"
    },
    {
        id: 2,
        image: "https://i.ibb.co/Y0W5xrw/711-Zi-DFy-JL.png",
        title: "Audio-Technica",
        heading: "Wireless, Wired",
        desc: "Turntable, USB cable, detachable RCA output cable (dual RCA male to dual RCA male), " +
            "AC adapter, 45 RPM adapter, counterweight, felt mat, and removable hinged dust cover",
        subHeading: "AT-LP120XBT-USB Wireless Direct-Drive Turntable, Black"
    },
    {
        id: 3,
        image: "https://i.ibb.co/dJ5681t/milkshake.png",
        title: "Milk Shake",
        heading: "Color Maintainer Conditioner, 10.1 fl. Oz",
        desc: "for 2021/2023 M1/M2/M3 Apple MacBook Pro 14 inch and MacBook Pro 16 inch, 2022 M2 MacBook Air 13 inch, 2023 M2 MacBook Air 15 inch (US-Layout)",
        subHeading: "Conditions the hair, maintaining its optimum moisture balance and preserving color integrity."
    },
    {
        id: 4,
        image: "https://i.ibb.co/Fb2XwvK/81-Di-HHFbo-L.png",
        title: "SHARDOR Coffee Grinder Electric",
        heading: "Herb Grinder, Coffee Bean Spices and Seeds with 2 Removable Stainless Steel Bowls",
        desc: "You crave a fresh cup of coffee to start your day, but you don't want to disturb your family's peaceful slumber. That's where this amazing coffee grinder comes in. Not only can it grind your coffee beans to perfection, but it can also grind wet ingredients like garlic and ginger with its cross blades.",
        subHeading: "Imagine waking up early in the morning, the sun has yet to rise and the world is still asleep."
    },
    {
        id: 5,
        image: "https://i.ibb.co/TmKN671/keyboard1.png",
        title: "MacOS Shortcut Guide Keyboard",
        heading: "Keyboard Cover for 2021/2023 M1/M2/M3 Apple MacBook Pro 14 inch and MacBook Pro 16 inch",
        desc: "for 2021/2023 M1/M2/M3 Apple MacBook Pro 14 inch and MacBook Pro 16 inch, 2022 M2 MacBook Air 13 inch, 2023 M2 MacBook Air 15 inch (US-Layout)",
        subHeading: "Vivid screen printed design with a guide to over 60 essential shortcuts for the Apple Mac Operating System (MacOS). Printed directly on the ultra-thin 0.3mm silicone keyboard protector."
    },
    {
        id: 6,
        image: "https://i.ibb.co/fvjmzLD/Magic-Eraser-231221-105832.png",
        title: "AeroGarden Bounty Elite",
        heading: "Indoor Garden with LED Grow Light, WiFi and Alexa Compatible",
        desc: "THE NEW TOP OF THE LINE BOUNTY ELITE",
        subHeading: "Perfect for a variety of BIG harvests (herbs, salads, tomatoes, peppers & more)."
    },

]

const Slider = () => {
    return (
        <div className="slider">
            <div className="bg-slider"></div>

            <Swiper className={"swiper-container"}
                    grabCursor={true}
                    spaceBetween={10}
                    slidesPerView={"auto"}
                    loop={true}
                    speed={1000}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                // hashNavigation={{
                //     watchState: true,
                // }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation, HashNavigation, Autoplay]}
            >
                {initialState && initialState.map((slide) => (
                    <SwiperSlide className="swiper-slide" key={slide.id}>
                        <img
                            src={`${slide.image}`}
                            className="slide-bgimg" alt={slide.heading}/>
                        <div className="content">
                            <div className="content-left">
                                <h2 className="title">{slide.title}</h2>
                                <span className="caption">{slide.heading}</span>
                                <ScrollToTarget scrollOffset={160} targetId={"products"}>
                                    <span className="watch-now">watch now</span>
                                    <RxDoubleArrowDown size={22} className="icon"/>
                                </ScrollToTarget>
                            </div>
                            <div className="content-right">
                                <h4 className="title">{slide.heading}</h4>
                                <p className="sub-title">Here's more info</p>
                                <span className="caption">{slide.subHeading}</span>
                                <Link to="/login" rel="noreferrer noopener">
                                    Buy now
                                    <MdOutlineArrowRightAlt size={32} className="icon"/>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Slider