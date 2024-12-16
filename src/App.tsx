import { useState } from "react";

type TimeType = {
  hours?: string;
  minutes?: string;
  seconds?: string;
};

type ResultType = {
  adjusted?: { minutes: number; seconds: number };
  lap?: { minutes: number; seconds: number };
};

function App() {
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<TimeType>({});
  const [percentage, setPercentage] = useState<string>("");
  const [lap, setLap] = useState<number | null>(null);
  const [result, setResult] = useState<ResultType | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTime((prevState) => ({ ...prevState, [name]: value }));
  };

  const calculate = () => {
    const totalSeconds =
      parseInt(time.hours?.toString() || "0") * 3600 +
      parseInt(time.minutes?.toString() || "0") * 60 +
      parseInt(time.seconds?.toString() || "0");

    const adjustedSeconds = totalSeconds / (Number(percentage) / 100);
    const adjustedMinutes = Math.floor(adjustedSeconds / 60);
    const adjustedRemainderSeconds = Math.round(adjustedSeconds % 60);

    const laps = lap ? Number(distance) / lap : null;
    const lapMinutes = laps ? Math.floor(totalSeconds / laps / 60) : 0;
    const lapSeconds = laps ? Math.round((totalSeconds / laps) % 60) : 0;

    setResult({
      adjusted: { minutes: adjustedMinutes, seconds: adjustedRemainderSeconds },
      lap: laps ? { minutes: lapMinutes, seconds: lapSeconds } : undefined,
    });
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Distance"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <input
        type="number"
        name="hours"
        placeholder="Hours"
        value={time.hours || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="minutes"
        placeholder="Minutes"
        value={time.minutes || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="seconds"
        placeholder="Seconds"
        value={time.seconds || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Percentage"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value)}
      />
      <select
        value={lap || ""}
        onChange={(e) => setLap(e.target.value ? +e.target.value : null)}
      >
        <option value="">Select Lap</option>
        <option value="400">400m</option>
        <option value="1000">1km</option>
      </select>
      <button onClick={calculate}>Calculate</button>
      {result?.adjusted && (
        <div>
          Общее время с учетом процента: {result.adjusted.minutes} минут{" "}
          {result.adjusted.seconds} секунд
        </div>
      )}
      {result?.lap && (
        <div>
          Темп на круг: {result.lap.minutes} минут {result.lap.seconds} секунд
        </div>
      )}
    </div>
  );
}

export default App;
