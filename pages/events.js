import styles from '../styles/events.module.css'
import { Josefin_Sans, Montserrat } from 'next/font/google'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Card from '../components/EventItem/index.js'
import { useNavigate } from 'react-router-dom';
// import Modal from '../components/EventItem/Modal.js'
import EventItem from '../components/EventItem'
import eventsDetails from '../public/events/events_data.json' assert { type: 'json' };
import Modal from '../components/BigModal/index.js'

// Static array of 24 events from public/events folder
const staticEventsData = [
    { "Event Name": "Animecon", "poster": '/events/Animecon.png' },
    { "Event Name": "arTEEst", "poster": '/events/Arteest.png' },
    { "Event Name": "Bespoke", "poster": '/events/Bespoke.png' },
    { "Event Name": "Chronoshift", "poster": '/events/Chronoshift.png' },
    { "Event Name": "Comedy Crunch", "poster": '/events/Comedy Crunch.png' },
    { "Event Name": "Cook off", "poster": '/events/Cook off.png' },
    { "Event Name": "Darpan", "poster": '/events/Darpan.png' },
    { "Event Name": "Ekal", "poster": '/events/ekal.png' },
    { "Event Name": "Escape Room", "poster": '/events/Escape Room.png' },
    { "Event Name": "Heelturn(solo-duet and group)", "poster": '/events/Heel Turn.png' },
    { "Event Name": "Imagination Station", "poster": '/events/imagination.png' },
    { "Event Name": "IncorporARTion", "poster": '/events/incorpration.png' },
    { "Event Name": "Kalapravah", "poster": '/events/kalapravah.png' },
    { "Event Name": "Maidan-e-jung", "poster": '/events/Maidan -e- jung.png' },
    { "Event Name": "Mixology", "poster": '/events/Mixology.png' },
    { "Event Name": "Mr-Ms Anwesha", "poster": '/events/MRMS.png' },
    { "Event Name": "Parakh", "poster": '/events/parakh.png' },
    { "Event Name": "ProtoUI", "poster": '/events/proroUI.png' },
    { "Event Name": "Reelverse", "poster": '/events/reelverse.png' },
    { "Event Name": "Satanz Tantrum", "poster": '/events/Satanz Tantrum.png' },
    { "Event Name": "Silent Expo", "poster": '/events/silent expo.png' },
    { "Event Name": "Step Up", "poster": '/events/step up.png' },
    { "Event Name": "Syngphony", "poster": '/events/syngphony.png' },
    { "Event Name": "Verve", "poster": '/events/Verve.png' },
];

const workshopcardarr = [{
    "Event Name": "techgyan x Anwesha",
    "poster": '/events/workshopPoster.jpeg',
    "Event": "2 days of workshop",
}]

const SponsorsSlider = ({ images, animation_duration = -1 }) => {
    const width = 127.381; // IF YOU CHANGE THIS THEN CHANGE IT INSIDE autoScrollSponseAnimation ALSO
    const heigth = 127.381;
    const duration = animation_duration <= 0 ? Math.floor(10 * (images.length / 7)) : animation_duration;

    const gap = 16;
    return <div style={{
        position: "relative",
        backgroundColor: "inherit",
        // minWidth: width * (images.length + 1),
        minWidth: (width + gap) * images.length,
        height: heigth
    }}>
        {
            images.map((src, index) =>
                <div key={index} className={styles.autoScrollSponseAnimation} style={{
                    width: "100%",
                    position: "absolute",
                    left: "100%",
                    // zIndex: 8,
                    animationDelay: `${(duration / images.length) * index}s`,
                    animationDuration: `${duration}s`,
                    '--width': width
                }}>
                    <Image src={src} width={width} height={heigth} />
                </div>
            )
        }
    </div>
}

const Events = () => {
    const [fadeOut, setFadeOut] = useState(false)

    // Handling fade-out effect on scroll   
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setFadeOut(scrollPosition > window.innerHeight / 4)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleWorkshopNavigation = () => {
        window.location.href = "https://tech-gyan.in/workshop-iit-patna-checkout/";
    };


    let exceludedEvents = [
    ]

    const sponsorImages = [
        'https://drive.google.com/uc?export=view&id=1sk_dXvHZCLN5QGH8x5ae4vjunza7kdwo', // 'Allen Cooper'
        'https://drive.google.com/uc?export=view&id=1sO3UC-XMYPAggeQ_P3loZCSxjbXKiTzk', // 'Bihar Tourism'
        'https://drive.google.com/uc?export=view&id=1NzTZh6D-THmqConUzrZ2tvC3PaJU3Ets', // 'Biryani'
        'https://drive.google.com/uc?export=view&id=10JmGTjBV_wliW6EoE4ozwnErEHNWZlGe', // 'Boult'
        'https://drive.google.com/uc?export=view&id=1sD17yO4Zwm449d9ilTh9cPRoTeUd4tpy', // 'Bihar Rajya Pul Nirman Nigam'
        'https://drive.google.com/uc?export=view&id=1yCcmexPef2xI3lQXo7wJAzliDEyUIxh-', // 'Bihar State Aids Control Society'
        'https://drive.google.com/uc?export=view&id=1QZLHYPSJsMLQUKssih7HPqU5DwMGkcnc', // 'Bihar State Electronics Development Corporation'
        'https://drive.google.com/uc?export=view&id=1UBiVYAM7HGv-tjMiyTofA7_ZCWS959MG', // 'Bihar Council on Science and Technology'
        'https://drive.google.com/uc?export=view&id=1gg9J_on8QTdBs64u7TVwpwkc45ydw4Eq', // 'Department of Information Technology'
        'https://drive.google.com/uc?export=view&id=1FOtkwzHkA74tK7uMzHYaxSbz8W-N40EN', // 'Department of Industries'
        'https://drive.google.com/uc?export=view&id=1EKapSE6Q9xbDmycY0XecwCEHKjxUqZzO', // 'Dominos'
        'https://drive.google.com/uc?export=view&id=1_LI78ee0KbgufhKeFSNQJSK7DzqG6T6q', // 'Fueling'
        'https://drive.google.com/uc?export=view&id=1NXlcqgtvPwuaGzr0KxNWWaIGvNgUWDax', // 'Hydration'
        'https://drive.google.com/uc?export=view&id=1Ge6eJMxha0lNxzF8AXW-aT8fP11FXJHA', // 'Kala Akchar'
        'https://drive.google.com/uc?export=view&id=1lvnREbJ84WauvAhwBCrtO7P11HO-HUz9', // 'NHAI'
        'https://drive.google.com/uc?export=view&id=13oaVnvbhSXcAZTTajdcwXVJ-4YjGtRBu', // 'NTPC'
        'https://drive.google.com/uc?export=view&id=12n_N2f4FyomvBlLOELPnGhLjgPdzCfkb', // 'Red FM'
        'https://drive.google.com/uc?export=view&id=13M6yySVuABxMP7pus6Hy2HVbianRpSnA', // 'Road Chef'
        'https://drive.google.com/uc?export=view&id=1MLfxr5ipb_m3VUkNCiAB3sc00hxz5fi-', // 'State Bank of India'
        'https://drive.google.com/uc?export=view&id=1Vbu1tCEMNPzoeOqpydOcOSxHlPzVz3up', // 'Startup Bihar'
        'https://drive.google.com/uc?export=view&id=1AA3qGrGqqTbmfo2DAWmkAWXs8KWTDC07', // 'The Community Events'
        'https://drive.google.com/uc?export=view&id=1Ub5Ntbu30Kp-1dpYSeB0M_QtbjGsiVpI', // 'Times of India'
        'https://drive.google.com/uc?export=view&id=1mX_WeCIywRV838QPn8AywiEWTSXSzMbM', // 'Waffcha'
        'https://drive.google.com/uc?export=view&id=183hiDaFhULaFvHURLFMCWBPmT7RjMRWI', // 'Wat A Burger'
    ];


    // Create a mapping of event names to poster paths (case-insensitive)
    const posterMap = {};
    staticEventsData.forEach(event => {
        // Use lowercase keys for case-insensitive matching
        posterMap[event["Event Name"].toLowerCase()] = event["poster"];
    });

    // Filter eventsDetails to only include the 24 events that have posters
    // This removes duplicates and online-only events
    const validEventNames = new Set(staticEventsData.map(e => e["Event Name"].toLowerCase()));
    const uniqueEvents = [];
    const seenEvents = new Set();
    
    eventsDetails.forEach(event => {
        const eventNameLower = event["Event Name"].toLowerCase();
        // Only include if it's in our poster list and we haven't seen it yet
        if (validEventNames.has(eventNameLower) && !seenEvents.has(eventNameLower)) {
            seenEvents.add(eventNameLower);
            uniqueEvents.push(event);
        }
    });

    // Merge with poster information
    const eventsWithPosters = uniqueEvents.map(event => ({
        ...event,
        poster: posterMap[event["Event Name"].toLowerCase()] || '/events/poster.png'
    }));

    const [events, setEvents] = useState(eventsWithPosters);
    const [filteredEvents, setFilteredEvents] = useState(eventsWithPosters); // Manages the filtered events
    //console.log(eventsWithPosters.length);
    // No need for API fetch - using static data from public folder

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim() === '') {
            setIsSearching(false);
            setSearchResults([]);
        } else {
            setIsSearching(true);
            const results = eventsWithPosters.filter((event) =>
                event['Event Name'].toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        }
    };


    const openModal = (event) => {
        console.log('Modal opened for event:', event)
        setSelectedEvent(event)
        setIsModalOpen(true)
    }


    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedEvent(null)
    }
    return (
        <div className={styles.mainContainer}>
            <Head>
                <title>Events - Anwesha 2024</title>
                <meta name="description" content="Events-Anwesha 2024" />
                <link rel="icon" href="./logo_no_bg.svg" />
            </Head>

            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <div className={styles.titleText}>EXPLORE THE EVENTS</div>
                </div>
                <div className={`${styles.searchContainer}`}>
                    <div className={`${styles.searchbox}`}>
                        <input
                            className={styles.searchbar}
                            type="text"
                            placeholder="Search Events"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <img src="/events/search_icon.svg" alt="" />
                    </div>
                </div>

                {/* Featured Events Section - Below Search Bar on First Page */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    {isSearching && searchResults.length === 0 && (
                        <div style={{ color: 'white', fontSize: '24px', textAlign: 'center', width: '100%', marginBottom: '5px' , marginTop:'20px' }}>
                            No events found
                        </div>
                    )}
                    <div className={styles.featuredEventsSection}>
                        {isSearching && searchResults.length > 0 ? (
                            // Show search results
                            searchResults.slice(0, 3).map((item, idx) => (
                                <div key={idx} className={styles.featuredCard} style={{ filter: 'grayscale(100%)' }}>
                                    <Card
                                        onClick={() => openModal(item)}
                                        event={item}
                                        closeHandler={closeModal}
                                    />
                                </div>
                            ))
                        ) : (
                            // Default 3 featured cards (shown when not searching OR when no results)
                            <>
                                <div className={styles.featuredCard} style={{ filter: 'grayscale(100%)' }}>
                                    <Card
                                        onClick={() => openModal(eventsWithPosters[0])}
                                        event={eventsWithPosters[0]}
                                        closeHandler={closeModal}
                                    />
                                </div>
                                <div className={styles.featuredCard} style={{ filter: 'grayscale(100%)' }}>
                                    <Card
                                        onClick={() => openModal(eventsWithPosters[3])}
                                        event={eventsWithPosters[3]}
                                        closeHandler={closeModal}
                                    />
                                </div>
                                <div className={styles.featuredCard} style={{ filter: 'grayscale(100%)' }}>
                                    <Card
                                        onClick={() => openModal(eventsWithPosters[1])}
                                        event={eventsWithPosters[1]}
                                        closeHandler={closeModal}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className={styles.eventsPanel}>
                <div className={styles.eventsPanelTitle}>EVENTS</div>
                <div className={styles.cardContainer}>
                    {eventsWithPosters.map((item, idx) => (
                        <Card
                            onClick={() => openModal(item)}
                            key={idx}
                            event={item}
                            closeHandler={closeModal}
                        />
                    ))}
                </div>
            </div>
                {isModalOpen && (
                    <Modal
                        title={selectedEvent["Event Name"].split('#')[0]}
                        body={selectedEvent}
                        closeHandler={closeModal}
                    />
                )}
            </div>

            {/* Sponsors */}
            <section className={styles.sponsors}>
                <div className={styles.sponsors_title}>
                    <h2>Our Proud Sponsors</h2>
                    <h3>Strengthening the Vision Together</h3>
                </div>
                <div className={styles.sponsors_images_slider}>
                    <SponsorsSlider images={sponsorImages} />
                </div>
            </section>
        </div>
    )
}
export default Events
