import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import AnimatedList from "./components/AnimatedList";
import SpotlightCard from "./components/SpotlightCard";
import LightRays from "./components/LightRays";
import Hyperspeed from "./components/Hyperspeed";
import TextType from "./components/TextType";
import ScrollFloat from "./components/ScrollFloat";
import { Button } from "./components/ui/button";
import "./App.css";

function raand(opacity = 0.15) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b},${opacity})`;
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function Que({ q, rating, setRating, hasRated }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="relative">
      <SpotlightCard spotlightColor={raand()}>
        <div className="p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50">
          <div className="w-full text-lg sm:text-xl md:text-2xl text-white mb-6 text-center font-class">
            {q}
          </div>

          <div className="flex justify-center gap-3 mb-4">
            {hasRated
              ? [...Array(rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))
              : [1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= (hover || rating);
                  return (
                    <Star
                      key={star}
                      size={32}
                      className={
                        filled
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }
                      onMouseEnter={() => !hasRated && setHover(star)}
                      onMouseLeave={() => !hasRated && setHover(0)}
                      onClick={() => !hasRated && setRating(star)}
                    />
                  );
                })}
          </div>

          {rating > 0 && (
            <div className="text-center">
              <div className="inline-flex flex-col gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-400/30 items-center">
                <span className="text-gray-200 whitespace-nowrap">
                  You rated this
                </span>
                <span className="text-yellow-400 font-bold whitespace-nowrap">
                  {rating} / 5
                </span>
              </div>
            </div>
          )}
        </div>
      </SpotlightCard>
    </div>
  );
}

function OverallAverage({ value }) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-20">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 p-12 rounded-3xl border border-gray-600/50 backdrop-blur-sm shadow-2xl">
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              {value.toFixed(2)}
            </div>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={40}
                  className={`${
                    i < Math.round(value)
                      ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]"
                      : "text-gray-500"
                  }`}
                />
              ))}
            </div>
            <div className="text-3xl text-white font-class">
              Overall Average Rating
            </div>
            <div className="text-gray-400 text-lg mt-2 font-class">
              Based on all feedback received
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-6 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-400 mb-2">
              Excellent
            </div>
            <div className="text-gray-300">
              Thank you for the amazing feedback!
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-2xl border border-green-500/30 backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-400 mb-2">
              Appreciated
            </div>
            <div className="text-gray-300">Your input helps us improve</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
            <div className="text-2xl font-bold text-purple-400 mb-2">
              Community
            </div>
            <div className="text-gray-300">
              Building together, growing together
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/5 via-transparent to-blue-900/10"></div>

      <div
        className="absolute text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl text-center px-4 flex flex-col justify-center font-class"
        style={{ zIndex: 10, letterSpacing: "0.03em" }}
      >
        <img
          src="/SDC.png"
          alt="SDC logo"
          className="mt-28 h-60 w-60 self-center rounded-full border-4 border-slate-700/50 transition-all duration-300"
        />

        <div className="bg-black/40 mt-10 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-lg">
          <TextType
            text={[
              "Software Development Club",
              "Web Development",
              "Coding",
              "AI / ML",
              "Cyber Security",
              "Design & PR",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
          <p className="text-gray-400 text-lg sm:text-xl mt-4">
            Innovate. Collaborate. Elevate.
          </p>
        </div>
      </div>

      {/* Accent orb */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl animate-pulse -top-20 -left-20"></div>

      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#3B82F6"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
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
          onSpeedUp: () => {},
          onSlowDown: () => {},
          distortion: "turbulentDistortion",
          length: 600,
          roadWidth: 4, // Reduced to fit a narrow screen
          islandWidth: 1.5, // Reduced for a narrower road
          lanesPerRoad: 2, // Reduced for a cleaner look on a narrow road
          fov: 85, // Slightly reduced for a better perspective
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.05, 0.2], // Scaled down to match the new dimensions
          lightStickHeight: [0.8, 1.2], // Scaled down
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [400 * 0.03, 400 * 0.2],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.2, 0.4], // Scaled down to match the new dimensions
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
      <div className="absolute text-white text-base sm:text-xl md:text-2xl lg:text-4xl font-class bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
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
    "How would you rate your overall satisfaction with the session?",
    "How excited are you to attend our upcoming sessions?",
  ];

  let userId = getCookie("user_rating_id");
  let userName = getCookie("user_name");
  const [nameLoaded, setNameLoaded] = useState(!!userName);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchNameAndSetCookie() {
      if (!userName) {
        const res = await fetch("https://randomuser.me/api/");
        const data = await res.json();
        const name =
          data.results[0].name.first + " " + data.results[0].name.last;
        setCookie("user_name", name, 365 * 2);
        userName = name;
        setNameLoaded(true);
      }
    }
    fetchNameAndSetCookie();
  }, []);

  if (!userId) {
    userId = generateUUID();
    setCookie("user_rating_id", userId, 365 * 2);
  }

  const [hasRated, setHasRated] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [overallAverage, setOverallAverage] = useState(null);
  const overallAverageRef = useRef(null);
  const [ratings, setRatings] = useState(Array(items.length).fill(0));

  useEffect(() => {
    const checkAlreadyRated = async () => {
      try {
        const res = await fetch(`/api/check-rated?user_rating_id=${userId}`);
        const data = await res.json();
        console.log("check-rated response:", data);

        if (data.hasRated) {
          setHasRated(true);
          setSubmitMessage("You have already rated.");

          if (Array.isArray(data.que)) {
            setRatings(data.que);
          }

          if (typeof data.ratings === "number") {
            setOverallAverage(data.ratings);
          }
        }
      } catch (err) {
        console.log("Error fetching rating:", err);
      }
    };

    checkAlreadyRated();
  }, [userId]);

  const handleRatingChange = (index, value) => {
    setRatings((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const items2 = items.map((q, i) => (
    <Que
      key={i}
      q={q}
      rating={ratings[i]}
      setRating={(value) => handleRatingChange(i, value)}
      hasRated={hasRated}
      userId={userId}
    />
  ));

  const handleSubmit = async () => {
    if (!nameLoaded) return;
    const payload = {
      name: userName,
      ratings: ratings,
      average: ratings.reduce((a, b) => a + b, 0) / ratings.length,
      user_rating_id: userId,
    };
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.status === 403) {
        setHasRated(true);
        setSubmitMessage(data.message || "You have already rated.");
        if (data.SDCREVIEWVARIABLE !== undefined) {
          setOverallAverage(data.SDCREVIEWVARIABLE);
        } else {
          const avgRes = await fetch("/api/overall-average");
          const avgData = await avgRes.json();
          setOverallAverage(avgData.overallAverage);
        }
      } else if (res.ok) {
        setHasRated(true);
        setSubmitMessage(data.message || "Thank you for your feedback!");
        if (data.SDCREVIEWVARIABLE !== undefined) {
          setOverallAverage(data.SDCREVIEWVARIABLE);
        }
      } else {
        setSubmitMessage("Error submitting review");
      }
      setTimeout(() => {
        if (overallAverageRef.current) {
          overallAverageRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    } catch (err) {
      setSubmitMessage("Error submitting review");
    }
  };

  const allRated = ratings.every((rating) => rating > 0);

  return (
    <>
      {/* {showLoader && <Loader />} */}
      <Hero />

      <div className="bg-black">
        <div className="text-center pt-16 pb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-2 rounded-lg blur opacity-20"></div>
            <h1 className="relative text-white text-xl sm:text-5xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text font-class px-8 py-4">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
              >
                Feedback Form
              </ScrollFloat>
            </h1>
          </div>
          {/* 👇 Display user's name */}
          {userName && (
            <p className="text-blue-400 text-lg mt-2 font-class">
              Welcome, <span className="font-semibold">{userName}</span> ✨
            </p>
          )}
          <p className="text-gray-400 text-lg mt-4 font-class">
            Your opinion matters to us
          </p>
        </div>

        <div className="min-h-screen pt-8 pb-20">
          <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 w-full max-w-4xl mx-auto space-y-8">
            {overallAverage !== null && (
              <div ref={overallAverageRef}>
                <OverallAverage value={overallAverage} />
              </div>
            )}

            <div className="w-full">
              <AnimatedList
                showGradients={false}
                displayScrollbar={false}
                items={items2}
              />
            </div>

            <div className="flex flex-col items-center space-y-4">
              <Button
                variant="ghost"
                className={`
    px-16 py-5 text-xl font-semibold transition-all duration-300 rounded-2xl border-2
    ${
      hasRated || !nameLoaded
        ? "bg-gray-700/50 border-gray-600/50 text-gray-400 cursor-not-allowed"
        : allRated
        ? "bg-gradient-to-r from-blue-600 to-sky-600 border-blue-500/50 text-white hover:from-blue-500 hover:to-sky-500 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
        : "bg-gradient-to-r from-blue-600 to-sky-600 border-blue-500/50 text-white hover:from-blue-500 hover:to-sky-500 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
    }
  `}
                onClick={handleSubmit}
                disabled={hasRated || !nameLoaded}
              >
                {hasRated
                  ? "Already Submitted"
                  : allRated
                  ? "Submit Feedback ✨"
                  : "Submit Feedback"}
              </Button>

              {!allRated && !hasRated && (
                <p className="text-gray-500 text-sm font-class">
                  Please rate all questions before submitting
                </p>
              )}
            </div>

            {submitMessage && (
              <div className="text-center mt-8">
                <div
                  className={`
                  inline-flex items-center px-6 py-3 rounded-2xl font-semibold text-lg
                  ${
                    submitMessage.includes("Error")
                      ? "bg-gradient-to-r from-red-900/80 to-red-800/40 border border-red-500/50 text-red-200"
                      : "bg-gradient-to-r from-green-900/80 to-emerald-800/40 border border-green-500/50 text-green-200"
                  }
                  backdrop-blur-sm shadow-xl
                `}
                >
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      submitMessage.includes("Error")
                        ? "bg-red-400"
                        : "bg-green-400"
                    } animate-pulse`}
                  ></div>
                  {submitMessage}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
