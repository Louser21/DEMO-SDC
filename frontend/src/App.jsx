import { useState,useEffect, useRef } from 'react';
import { Star } from "lucide-react";
import AnimatedList from './components/AnimatedList';
import SpotlightCard from './components/SpotlightCard';
import Orb from './components/Orb';
import Hyperspeed from './components/Hyperspeed';
import TextType from './components/TextType';
import Squares from './components/Squares';
import { Button } from "./components/ui/button";
import "./App.css";
import Silk from './components/Silk';
import GradientText from './components/GradientText';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:4000/api';

function raand(opacity = 0.15) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b},${opacity})`;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function Que({ q, rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <SpotlightCard spotlightColor={raand()}>
      <div className="w-full break-words text-sm sm:text-base md:text-lg text-white mb-2 sm:mb-3 md:mb-4 text-center sm:text-left font-class">
        {q}
      </div>

      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= (hover || rating);
          return (
            <Star
              key={star}
              size={24}
              className={`cursor-pointer transition-transform duration-200 
          ${filled ? "text-yellow-400 fill-yellow-400 drop-shadow-lg" : "text-gray-300"} 
          hover:scale-125`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            />
          );
        })}
      </div>

      {rating > 0 && (
        <div className="mt-2 text-sm sm:text-base text-gray-300 text-center sm:text-left font-class">
          You rated this <span className="text-yellow-400">{rating} / 5</span>
        </div>
      )}
    </SpotlightCard>
  );
}

function OverallAverage({ value }) {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <div
        className="absolute text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl text-center px-4 flex flex-col justify-center font-class"
        style={{ zIndex: 10, letterSpacing: '0.03em' }}
      >
        <img src="/SDC.png" alt="SDC logo" className="h-60 w-60 self-center mb-5 rounded-[50%]" />
        <TextType
          text={["Software Development Club", "Web Development", "Coding", "AI / ML", "Cyber Security", "Design & PR"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>

      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <Orb
          hoverIntensity={0}
          rotateOnHover={true}
          hue={78}
          forceHoverState={false}
        />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      <div
        className="absolute text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl text-center px-4 flex flex-col justify-center font-class"
        style={{ zIndex: 10, letterSpacing: '0.03em' }}
      >
        <img src="/SDC.png" alt="SDC logo" className="h-60 w-60 self-center mb-5 rounded-[50%]" />
        <TextType
          text={["Software Development Club", "Web Development", "Coding", "AI / ML", "Cyber Security", "Design & PR"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>

      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <Orb
          hoverIntensity={0}
          rotateOnHover={true}
          hue={78}
          forceHoverState={false}
        />
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="bg-black fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <Hyperspeed
        effectOptions={{
          onSpeedUp: () => { },
          onSlowDown: () => { },
          distortion: "turbulentDistortion",
          length: 600,
          roadWidth: 10,
          islandWidth: 2,
          lanesPerRoad: 4,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [400 * 0.03, 400 * 0.2],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0xffffff,
            brokenLines: 0xffffff,
            leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
            rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
            sticks: 0x03b3c3,
          },
        }}
      />
      <div className="absolute text-white text-base sm:text-xl md:text-2xl lg:text-4xl font-class">
        <TextType
          text={["Loading..", "Rate wisely ☝️"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>
    </div>
  );
}

function App() {
  const items = [
    "How clear was the explanation of the Coding domain?",
    "Did the Web Development session give you a good understanding of its scope?",
    "Was the role of BDAAC in SDC explained in an understandable way?",
    "How effectively did the PR team present their work and opportunities?",
    "Did the Design session help you see its importance in tech projects?",
    "How engaging was the Cybersecurity introduction?",
    "Did the AI/ML session spark your curiosity about the domain?",
    "Which domain’s presentation excited you the most overall?",
    "What improvements would you suggest for any of the domain sessions?",
    "Would you like follow-up workshops/resources for specific domains?",
  ];

  let userId = getCookie('user_rating_id');
  let userName = getCookie('user_name');
  const [nameLoaded, setNameLoaded] = useState(!!userName);

  useEffect(() => {
    async function fetchNameAndSetCookie() {
      if (!userName) {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        const name = data.results[0].name.first + ' ' + data.results[0].name.last;
        setCookie('user_name', name, 365 * 2);
        userName = name;
        setNameLoaded(true);
      }
    }
    fetchNameAndSetCookie();
  }, []);

  if (!userId) {
    userId = generateUUID();
    setCookie('user_rating_id', userId, 365 * 2);
  }

  const [hasRated, setHasRated] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [overallAverage, setOverallAverage] = useState(null);
  const overallAverageRef = useRef(null);

  useEffect(() => {
    const checkAlreadyRated = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/check-rated?user_rating_id=${userId}`);
        const data = await res.json();
        if (data.hasRated) {
          setHasRated(true);
          setSubmitMessage("You have already rated.");
        }
      } catch (err) {}
    };
    checkAlreadyRated();
  }, [userId]);

  const [ratings, setRatings] = useState(Array(items.length).fill(0));

  const handleRatingChange = (index, value) => {
    setRatings(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const items2 = items.map((q, i) => <Que key={i} q={q} rating={ratings[i]} setRating={value => handleRatingChange(i, value)} />);

  const handleSubmit = async () => {
    if (!nameLoaded) return;
    const payload = {
      name: userName,
      ratings: ratings,
      average: ratings.reduce((a, b) => a + b, 0) / ratings.length,
      user_rating_id: userId
    };
    try {
      const res = await fetch(`${API_BASE_URL}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.status === 403) {
        setHasRated(true);
        setSubmitMessage(data.message || "You have already rated.");
        if (data.SDCREVIEWVARIABLE !== undefined) {
          setOverallAverage(data.SDCREVIEWVARIABLE);
          setTimeout(() => {
            if (overallAverageRef.current) {
              overallAverageRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 1000);
        } else {
          const avgRes = await fetch("http://localhost:4000/overall-average");
          const avgData = await avgRes.json();
          setOverallAverage(avgData.overallAverage);
          setTimeout(() => {
            if (overallAverageRef.current) {
              overallAverageRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 1000);
        }
      } else if (res.ok) {
        setHasRated(true);
        setSubmitMessage(data.message || "Thank you for your feedback!");
        if (data.SDCREVIEWVARIABLE !== undefined) {
          setOverallAverage(data.SDCREVIEWVARIABLE);
          setTimeout(() => {
            if (overallAverageRef.current) {
              overallAverageRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 1000);
        }
      } else {
        setSubmitMessage("Error submitting review");
      }
    } catch (err) {
      setSubmitMessage("Error submitting review");
    }
  };

  return (
    <>
      {/* <Loader /> */}
      <Hero />
      <h1 className="text-center bg-black text-white text-2xl sm:text-3xl md:text-4xl px-4 pt-6 sm:pt-8 md:pt-10 font-class">
        Feedback Form
      </h1>
      <div className="min-h-screen bg-black pt-8 sm:pt-12 md:pt-20">
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto space-y-4">
          {overallAverage !== null && <div ref={overallAverageRef}><OverallAverage value={overallAverage} /></div>}
          <AnimatedList showGradients={false} displayScrollbar={false} items={items2} />
          <Button variant="ghost" className="text-white mb-10 bg-gray-600" onClick={handleSubmit} disabled={hasRated || !nameLoaded}>Submit</Button>
          {submitMessage && (
            <div className="text-center text-lg text-yellow-400 font-semibold mt-4">{submitMessage}</div>
          )}
        </div>
      </div>
    </>
  );
}

function Rating({ rating }) {
  return <div className="font-class"></div>;
}

export default App;
